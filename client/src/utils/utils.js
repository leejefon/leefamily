import browserHistory from 'react-router/lib/browserHistory';

export function forwardTo(location) {
  browserHistory.push(location);
}
