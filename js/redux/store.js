/**
 * Created by harrisonmiller on 10/3/17.
 */
import { createStore } from 'redux';
import rootReducer from './reducers';

let store = createStore(rootReducer);

export default store;