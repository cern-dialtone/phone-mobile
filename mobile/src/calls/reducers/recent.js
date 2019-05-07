import * as recentActions from "../actions/recent";

const initialState = {
  lastRecentId: 0,
  recentCalls: []
};

const recent = (state = initialState, action) => {
  let recentCall, lastRecentId;
  switch (action.type) {
    case recentActions.ADD_RECENT_CALL:
      recentCall = action.recentCall;
      lastRecentId = ++state.lastRecentId;
      return {
        ...state,
        lastRecentId: lastRecentId,
        recentCalls: [
          {
            id: lastRecentId,
            name: recentCall.name,
            phoneNumber: recentCall.phoneNumber,
            startTime: recentCall.startTime,
            endTime: Date.now(),
            incoming: recentCall.incoming,
            missed: recentCall.missed
          },
          ...state.recentCalls
        ]
      };

    default:
      return state;
  }
};

export default recent;
