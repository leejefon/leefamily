/*
 * User States
 *
 * @author: Jeff Lee
 * @createdAt: 2016/11/08
 */

// import React from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';

export const initialState = Immutable.fromJS({
  listProjects: [],
  listOrganizations: [],
  listTransactions: [],
  listStripeAccounts: [],
  transactionCompleted: false
});

// export const userStatePropTypes = ImmutablePropTypes.mapContains({
//   listProjects: ImmutablePropTypes.list,
//   listOrganizations: ImmutablePropTypes.list,
//   listTransactions: ImmutablePropTypes.list,
//   listStripeAccounts: ImmutablePropTypes.list,
//   transactionCompleted: React.PropTypes.bool
// });
