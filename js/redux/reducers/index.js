/**
 * Created by harrisonmiller on 10/3/17.
 */
import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
  auth
});

export default rootReducer;