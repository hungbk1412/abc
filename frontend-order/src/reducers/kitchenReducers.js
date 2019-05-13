/* eslint-disable default-case */
export default function kitchenReducer(state = {
    tempOrders: [],
    needToReRender: 0
}, action) {
    let tempOrders = state.tempOrders;
    let needToReRender = state.needToReRender
    switch (action.type) {
        case 'KITCHEN_GET_TEMP_ORDER':
        // console.log('here', action.payload);        
            tempOrders = action.payload;
            // console.log(tempOrders);            
            break;
        case 'CHECK_ITEM_DONE' :
            let orderIndex =  tempOrders.findIndex(order => {
                return order._id === action.payload._id;
            })
            tempOrders[orderIndex].items = action.payload.items;
            needToReRender += 1
            break;
    }
    return {
        ...state,
        tempOrders: tempOrders,
        needToReRender: needToReRender
    }
}