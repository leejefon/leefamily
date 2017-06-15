/*
 * Utils
 *
 * @author: Jeff Lee
 * @createdAt: 2016/09/25
 */

import browserHistory from 'react-router/lib/browserHistory';
import _ from 'lodash/core';
import Project from './Project';
import Organization from './Organization';

export function anyElementsEmpty(elements) {
  return _.values(elements).filter(element => !element).length > 0;
}

export function generateKey(name, type, id) {
  const obj = type === 'project' ? Project : Organization;
  return obj.generateKey(id, name);
}

export function forwardTo(location) {
  browserHistory.push(location);
}
