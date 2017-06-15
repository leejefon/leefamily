/*
 * AmazonS3
 *
 * @author: Jeff Lee
 * @createdAt: 2016/10/11
 */

import cookie from 'react-cookie';
import Http from '../utils/Http';

module.exports = (() => {
  const bucket = process.env.NODE_ENV === 'production' ? 'redpocket' : 'redpocket-dev';

  return {
    uploadAvatar: (file) => {
      const data = new FormData();
      data.append('file', file);
      return Http
        .auth(cookie.load('token'))
        .post(`/amazon_s3/${bucket}/upload`, data, {
          root: 'user-upload-avatars'
        });
    },

    uploadLogo: (file, type = 'project') => {
      const data = new FormData();
      data.append('file', file);
      return Http
        .auth(cookie.load('token'))
        .post(`/amazon_s3/${bucket}/upload`, data, {
          root: `user-upload-${type}-logos`
        });
    },

    uploadSlides: (files, type = 'project') => {
      const uploadRequests = [];
      for (let i = 0; i < files.length; i += 1) {
        const data = new FormData();
        data.append('file', files[i]);
        uploadRequests.push(Http
          .auth(cookie.load('token'))
          .post(`/amazon_s3/${bucket}/upload`, data, {
            root: `user-upload-${type}-slides`
          })
        );
      }
      return Promise.all(uploadRequests);
    }
  };
})();
