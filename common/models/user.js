/**
 * User Model
 *
 * @author: Jeff Lee
 * @createdAt: 2016/09/24
 */

var Promise = require('bluebird');
var moment = require('moment');
var request = Promise.promisify(require('request'));
var jwt = Promise.promisifyAll(require('jsonwebtoken'));
var sendmail = require('../emails/sendmail');
var app = require('../../server/server');

module.exports = (User) => {
  User.generateResetPasswordToken = (email, cb) => {
    User.findOne({
      where: { email }
    }).then((user) => {
      if (user) {
        const token = jwt.sign({ expires: moment().add(2, 'days').valueOf() }, process.env.APP_SECRET);
        user.updateAttribute('password_reset_token', token).then(() => {
          sendmail('resetPassword', { token: token, toEmail: email }).then(() => {
            cb(null, 'success');
          });
        });
      } else {
        cb('email not found');
      }
    });
  };

  User.resetPassword = (password_reset_token, password, cb) => {
    Promise.all([
      jwt.verifyAsync(password_reset_token, process.env.APP_SECRET),
      User.findOne({ where: { password_reset_token } })
    ]).spread((token, user) => {
      if (token.expires < moment().valueOf()) {
        cb('token expired');
        return;
      }

      if (!user) {
        cb('invalid token');
        return;
      }

      user.updateAttributes({ password, password_reset_token: null }, cb);
    }).catch((e) => {
      cb(e);
    });
  };

  User.confirmEmail = (email_confirm_token, cb) => {
    Promise.all([
      jwt.verifyAsync(email_confirm_token, process.env.APP_SECRET),
      User.findOne({ where: { email_confirm_token } })
    ]).spread((token, user) => {
      if (token.expires < moment().valueOf()) {
        cb('token expired');
        return;
      }

      if (!user) {
        cb('invalid token');
        return;
      }

      user.updateAttributes({ email_confirm_token: null }, cb);
    }).catch((e) => {
      cb(e);
    });
  };

  User.resendConfirmationEmail = (req, cb) => {
    User.findOne({
      where: { id: req.accessToken.userId }
    }).then((user) => {
      const token = jwt.sign({ expires: moment().add(2, 'days').valueOf() }, process.env.APP_SECRET);
      user.updateAttribute('email_confirm_token', token).then(() => {
        sendmail('confirmEmail', { token: token, toEmail: user.email }).then(() => {
          cb(null, 'success');
        });
      });
    });
  };

  User.checkToken = (type, token, cb) => {
    const where = {};
    if (type === 'reset_password') {
      where.password_reset_token = token;
    } else {
      where.email_confirm_token = token;
    }

    User.findOne({ where }).then((user) => {
      cb(null, !!user);
    });
  };

  User.remoteMethod('generateResetPasswordToken', {
    http: { path: '/reset_password', verb: 'post' },
    accepts: { arg: 'email', type: 'string' },
    returns: { arg: 'status', type: 'string' }
  });

  User.remoteMethod('resetPassword', {
    http: { path: '/reset_password/:password_reset_token', verb: 'post' },
    accepts: [
      { arg: 'password_reset_token', type: 'string' },
      { arg: 'password', type: 'string' }
    ],
    returns: { arg: 'status', type: 'object' }
  });

  User.remoteMethod('confirmEmail', {
    http: { path: '/confirm_email', verb: 'get' },
    accepts: { arg: 'token', type: 'string' },
    returns: { arg: 'status', type: 'string' }
  });

  User.remoteMethod('resendConfirmationEmail', {
    http: { path: '/resend_confirmation_email', verb: 'post' },
    accepts: { arg: 'req', type: 'object', http: { source: 'req' } },
    returns: { arg: 'status', type: 'string' }
  });

  User.remoteMethod('checkToken', {
    http: { path: '/check_token', verb: 'post' },
    accepts: [
      { arg: 'type', type: 'string' },
      { arg: 'token', type: 'string' }
    ],
    returns: { arg: 'exists', type: 'boolean' }
  });

  User.beforeRemote('login', (ctx, user, next) => {
    const { email, password, facebookToken } = ctx.args.credentials;

    if (facebookToken) {
      Promise.all([
        User.findOne({ where: { email: email }}),
        request({
          method: 'GET',
          url: 'https://graph.facebook.com/me',
          qs: {
            access_token: facebookToken,
            fields: 'id,name,email,picture'
          },
          json: true
        })
      ]).spread((user, fbResponse) => {
        const fbUser = fbResponse.body;
        if (!user) {
          User.create({
            name: fbUser.name,
            email: fbUser.email,
            password: fbUser.id + process.env.APP_SALT,
            avatar: fbUser.picture.data.url
          }).then(() => {
            ctx.args.credentials.password = fbUser.id + process.env.APP_SALT;
            next();
          });
        } else if (user && !user.facebookId) {
          user.updateAttributes({
            facebookId: fbUser.id,
            password: fbUser.id + process.env.APP_SALT
          }).then(() => {
            ctx.args.credentials.password = fbUser.id + process.env.APP_SALT;
            next();
          });
        } else if (user.facebookId === fbUser.id) {
          ctx.args.credentials.password = user.facebookId + process.env.APP_SALT;
          next();
        } else {
          next();
        }
      });
    } else {
      next();
    }
  });

  User.beforeRemote('create', (ctx, user, next) => {
    const { facebookToken } = ctx.args.data;
    if (facebookToken) {
      request({
        method: 'GET',
        url: 'https://graph.facebook.com/me',
        qs: {
          access_token: facebookToken,
          fields: 'id,name,email,picture'
        },
        json: true
      }).then((response) => {
        ctx.args.data = {
          name: response.body.name,
          email: response.body.email,
          facebookId: response.body.id,
          avatar: response.body.picture.data.url,
          password: response.body.id + process.env.APP_SALT
        };
        next();
      });
    } else {
      next();
    }
  });

  User.afterRemote('create', (ctx, user, next) => {
    const token = jwt.sign({ expires: moment().add(2, 'days').valueOf() }, process.env.APP_SECRET);

    user.updateAttributes({
      email_confirm_token: token,
      password_reset_token: null
    }).then(() => {
      sendmail('confirmEmail', { token: token, toEmail: user.email }).then((response) => {
        next();
      });
    });
  });

  User.beforeRemote('prototype.updateAttributes', (ctx, user, next) => {
    const { currentPassword, newPassword } = ctx.args.data;

    if (currentPassword && newPassword) {
      ctx.instance.hasPassword(currentPassword, (err, isMatch) => {
        let error = null;
        if (isMatch) {
          ctx.args.data.password = newPassword;
        } else {
          error = new Error();
          error.status = 401;
          error.message = 'Password doesn\'t match';
          error.code = 'AUTHORIZATION_REQUIRED';
        }

        delete ctx.args.data.currentPassword;
        delete ctx.args.data.newPassword;
        next(error);
      });
    } else {
      // NOTE: Just in case either one of them is set
      delete ctx.args.data.currentPassword;
      delete ctx.args.data.newPassword;
      next();
    }
  });

  User.observe('loaded', (ctx, next) => {
    var totalContributed = calculateTotalContributed(ctx);

    Promise
      .all([totalContributed])
      .then(() => next());
  });

  function calculateTotalContributed(ctx) {
    if (!app.models) return;

    return new Promise((resolve, reject) => {
      var Transaction = app.models.Transaction;
      Transaction
        .find({ where: { userId: ctx.data.id } })
        .then(transactions => transactions.reduce((prev, curr) => {
          return {
            amount: prev.amount + curr.amount,
            count: prev.count + 1
          };
        }, {
          amount: 0,
          count: 0
        }))
        .then(totalContributed => {
          ctx.data.totalContributedAmount = totalContributed.amount;
          ctx.data.totalContributedCount = totalContributed.count;
          resolve();
        });
    });
  }
};
