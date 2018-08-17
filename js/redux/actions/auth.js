/**
 * Created by harrisonmiller on 10/3/17.
 */
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