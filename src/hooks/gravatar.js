const crypto = require('crypto');

const gravatarUrl = 'https://s.gravatar.com/avatar';
const query = 's=60'; // The size query. Our chat needs 60px images

module.exports = function () {
  return async context => {
    const { email } = context.data;

    // Gravatar uses MD5 hashes from an email address to get the image
    const hash = crypto.createHash('md5').update(email).digest('hex');
    context.data.avatar = `${gravatarUrl}/${hash}?${query}`;

    return context;
  };
};
