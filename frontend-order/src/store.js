import {createStore, applyMiddleware, combineReducers} from 'redux';
import orderReducer from 'reducers/orderReducers';
import thunk from 'redux-thunk'

export default createStore(
    combineReducers({
        order: orderReducer,
    }), applyMiddleware(thunk)
);