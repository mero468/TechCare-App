import {applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/login';
import {legacy_createStore as createStore} from 'redux';

const rootReducer = combineReducers({loginReducer})

export const Store = createStore(rootReducer, applyMiddleware(thunk));