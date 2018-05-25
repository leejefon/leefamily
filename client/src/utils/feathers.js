/**
 * feathers
 *
 * @author: Jeff Lee
 * @createdAt: 2017/12/06
 */

import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';

const socket = io();
const client = feathers();

client.configure(socketio(socket));
client.configure(authentication({
  storage: window.localStorage
}));

client.getCurrentUser = () => client.passport.verifyJWT(localStorage['feathers-jwt'])
  .then(user => client.service('users').get(user.userId));

export default client;
