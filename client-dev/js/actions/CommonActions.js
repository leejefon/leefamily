/*
 * Common Actions
 *
 * @author: Jeff Lee
 * @createdAt: 2016/09/07
 */

import * as Events from './ActionConstants';

export function sendingRequest(sending) {
  return { type: Events.SENDING_REQUEST, sending };
}

export function setFlashMessage(flashMessage) {
  return { type: Events.SET_FLASH_MESSAGE, flashMessage };
}

export function resetFlashMessage() {
  const flashMessage = { type: null, message: null };
  return { type: Events.RESET_FLASH_MESSAGE, flashMessage };
}
