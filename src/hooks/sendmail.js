/**
 * sendmail hook
 *
 * @author: Jeff Lee
 * @createdAt: 2018/05/24
 */

const Sendgrid = require('@sendgrid/mail');

module.exports = function () {
  return (context) => {
    const token = context.data.token;
    const email = context.data.email;

    const host = process.env.NODE_ENV === 'production' ?
      'https://www.leefamily.tw' : 'http://localhost:3030';

    Sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    Sendgrid.send({
      to: email,
      from: 'leejefon@gmail.com',
      subject: '[Leefamily] Reset Password',
      html: `
        Click <a href="${host}/resetPassword/${token}">here</a> to reset your password
      `,
    });

    return context;
  };
};
