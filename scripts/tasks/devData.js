/**
 * Task - Dev Data Loader
 *
 * @author: Jeff Lee
 * @createdAt: 2017/03/13
 */

const Promise = require('bluebird');
const path = require('path');
const boot = require('loopback-boot');
const pDevData = require('../ext/devDataDownload');

module.exports = (app) => {
  boot(app, path.join(__dirname, '../../server'), (err) => {
    pDevData.then((data) => {
      app.dataSources.mongodb.automigrate(['user', 'project', 'organization'], (err) => {
        data.forEach((table) => {
          app.models[table.name].create(table.data, () => {
            console.log('Created collection: ' + table.name);
          });
        });
      });
    }).catch((e) => {
      console.error(e);
      process.exit(1);
    });
  });
};
