import {applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/login';
import PackagesReducer from './reducers/packages';
import {legacy_createStore as createStore} from 'redux';
import GeneralReducer from './general';
import LabReducer from './reducers/lab';
LabReducer
const rootReducer = combineReducers({loginReducer,PackagesReducer,GeneralReducer,LabReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));