export const login = (currentUserId, currentUserName) => {
  return {
    type: 'LOGIN',
    currentUserId,
    currentUserName
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};