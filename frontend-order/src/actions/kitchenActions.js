import axios from '../axios-store';

export function kitchenGetTempOrder() {
  return function(dispatch){
    axios.get('/api/order/kitchen').then(res=> {
      dispatch({
        type: 'KITCHEN_GET_TEMP_ORDER',
        payload: res.data
      })
    })
  }
}

export function checkItemDone(order) {
  return function(dispatch){
    // console.log('order', order)
    axios.post('/api/order/kitchen-check-item', order).then(res => {
      dispatch({
        type: 'CHECK_ITEM_DONE',
        payload: order
      })
    })
  }
}