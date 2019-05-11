import {createStore, applyMiddleware, combineReducers} from 'redux';
import orderReducer from 'reducers/orderReducers';
import authReducer from './reducers/authReducers';
import thunk from 'redux-thunk'

export default createStore(
    combineReducers({
        order: orderReducer,
        auth: authReducer
    }), applyMiddleware(thunk)
);