module.exports = {
  mongodb: {
    name: 'mongodb',
    connector: 'mongodb',
    url: process.env.MONGODB_URI
  },
  mailgun: {
    name: 'mailgun',
    connector: 'loopback-connector-mailgun',
    apikey: process.env.MAILGUN_API_KEY,
    domain: 'redpocket.io'
  },
  amazonS3: {
    name: 'amazonS3',
    connector: 'loopback-component-storage',
    provider: 'amazon',
    key: process.env.AWS_S3_KEY,
    keyId: process.env.AWS_S3_KEYID
  }
};
