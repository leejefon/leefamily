const AWS = require('aws-sdk');
const BlobService = require('feathers-blob');
const S3BlobStore = require('s3-blob-store');

module.exports = function (app) {
  // const s3 = new AWS.S3({
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  // });

  const blobStore = S3BlobStore({
    client: new AWS.S3(),
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.S3_BUCKET
  });

  const blobService = BlobService({
    Model: blobStore
  });

  app.use('upload', blobService);

  const service = app.service('upload');
  service.hooks({
    before: {
      create(context) {
        context.params.s3 = {
          ACL: 'public-read'
        };
      }
    }
  });
};
