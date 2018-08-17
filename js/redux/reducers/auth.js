const defaultState = {
  currentUserId: "",
  currentUserName: ""
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        currentUserId: action.currentUserId,
        currentUserName: action.currentUserName
      });
    case 'LOGOUT':
      return Object.assign({}, state, {
        currentUserId: "",
        currentUserName: ""
      });
    default:
      return state;
  }
}