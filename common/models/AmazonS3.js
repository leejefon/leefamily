/**
 * AmazonS3 Model
 *
 * @author: Jeff Lee
 * @createdAt: 2016/10/11
 */

module.exports = (AmazonS3) => {
  AmazonS3.beforeRemote('upload', (ctx, aws, next) => {
    const userId = ctx.args.req.accessToken.userId;
    const root = ctx.args.req.query.root

    // TODO: check if userId or root exists

    // HACK: https://github.com/strongloop/loopback-component-storage/issues/63
    AmazonS3.app.dataSources.AmazonS3.connector.getFilename = (file, req, res) => {
      return root + '/' + userId + '/' + file.name;
    };

    next();
  });

  AmazonS3.afterRemote('upload', (ctx, aws, next) => {
    const userId = ctx.args.req.accessToken.userId;
    // TODO: update avatar or logo field
    next();
  });
};
