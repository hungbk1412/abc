import {createStore, applyMiddleware, combineReducers} from 'redux';
import orderReducer from 'reducers/orderReducers';
import authReducer from './reducers/authReducers';
import thunk from 'redux-thunk'
import kitchenReducer from './reducers/kitchenReducers';
import checkoutReducer from './reducers/checkoutReducers'

export default createStore(
    combineReducers({
        kitchen: kitchenReducer,
        order: orderReducer,
        auth: authReducer,
        checkout : checkoutReducer
    }), applyMiddleware(thunk)
);

