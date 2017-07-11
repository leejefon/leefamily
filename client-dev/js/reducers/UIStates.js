/*
 * UI States
 *
 * @author: Jeff Lee
 * @createdAt: 2016/09/07
 */

// import React from 'react';
import cookie from 'react-cookie';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';

const initialStateEmpty = Immutable.fromJS({
  currentlySending: false,
  showLoginModal: false,
  showRegisterModal: false,
  showAddProjectModal: false,
  showAddOrganizationModal: false,
  showDeleteProjectModal: false,
  showDeleteOrganizationModal: false,
  projectToDelete: '',
  organizationToDelete: '',
  showCheckoutModal: false,
  checkoutComplete: false,

  currentUser: {
    id: '',
    email: '',
    emailVerified: false,
    name: '',
    avatar: '',
    bio: '',
    city: '',
    url: '',
    created: '',
    totalContributedAmount: 0,
    totalContributedCount: 0
  },
  currentViewingObject: {
    type: '',
    key: ''
  },
  flashMessage: {
    type: '',
    message: ''
  },
  comingSoonSignUpSuccess: false,
  suggestionBoxSuccess: false
});

// export const uiStatePropTypes = ImmutablePropTypes.mapContains({
//   currentlySending: React.PropTypes.bool,
//   showLoginModal: React.PropTypes.bool,
//   showRegisterModal: React.PropTypes.bool,
//   showAddProjectModal: React.PropTypes.bool,
//   showAddOrganizationModal: React.PropTypes.bool,
//   showDeleteProjectModal: React.PropTypes.bool,
//   showDeleteOrganizationModal: React.PropTypes.bool,
//   projectToDelete: React.PropTypes.string,
//   organizationToDelete: React.PropTypes.string,
//
//   currentUser: ImmutablePropTypes.mapContains({
//     id: React.PropTypes.string,
//     email: React.PropTypes.string,
//     emailVerified: React.PropTypes.bool,
//     name: React.PropTypes.string,
//     avatar: React.PropTypes.string,
//     bio: React.PropTypes.string,
//     city: React.PropTypes.string,
//     url: React.PropTypes.string,
//     created: React.PropTypes.date,
//     totalContributedAmount: React.PropTypes.number,
//     totalContributedCount: React.PropTypes.number
//   }),
//   flashMessage: ImmutablePropTypes.mapContains({
//     type: React.PropTypes.string,
//     message: React.PropTypes.string
//   }),
//   comingSoonSignUpSuccess: React.PropTypes.bool,
//   suggestionBoxSuccess: React.PropTypes.bool
// });

function restoreState() {
  if (process.env.NODE_ENV !== 'test') {
    return initialStateEmpty.merge({
      currentUser: {
        id: cookie.load('uid') || ''
      }
    });
  }
  return initialStateEmpty;
}

export const initialState = restoreState();
