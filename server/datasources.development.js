module.exports = {
  mysql: {
    name: 'mysql',
    connector: 'mysql',
    url: process.env.CLEARDB_DATABASE_URL
  },
  amazonS3: {
    name: 'amazonS3',
    connector: 'loopback-component-storage',
    provider: 'amazon',
    key: process.env.AWS_S3_KEY,
    keyId: process.env.AWS_S3_KEYID
  }
};
