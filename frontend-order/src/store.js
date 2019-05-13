import {createStore, applyMiddleware, combineReducers} from 'redux';
import orderReducer from 'reducers/orderReducers';
import authReducer from './reducers/authReducers';
import thunk from 'redux-thunk'
import kitchenReducer from './reducers/kitchenReducers';

export default createStore(
    combineReducers({
        kitchen: kitchenReducer,
        order: orderReducer,
        auth: authReducer
    }), applyMiddleware(thunk)
);

