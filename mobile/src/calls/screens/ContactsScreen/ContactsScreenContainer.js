import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_ENDPOINT } from 'react-native-dotenv';

import { callActions, contactsActionsFactory } from 'dial-core';
import ContactsScreen from './ContactsScreen';
import withOnGoingCallBanner from '../../../common/utils/calls';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...callActions,
      ...contactsActionsFactory(API_ENDPOINT)
    },
    dispatch
  );
}

export default connect(
  ({ contacts }) => ({ ...contacts }),
  mapDispatchToProps
)(withOnGoingCallBanner(ContactsScreen));
