import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { callActions } from 'dial-core';
import { RecentCallsScreen } from './RecentCallsScreen';

function mapStateToProps(state) {
  const { calls } = state;
  return {
    recentCalls: calls.recent.recentCalls
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...callActions
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentCallsScreen);
