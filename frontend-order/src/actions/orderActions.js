import axios from "../axios-store";
export function removeDrink(drink) {
  return {
    type: "REMOVE_DRINK",
    payload: drink
  };
}

export function increaseQuantity(drink) {
  return {
    type: "INCREASE_QUANTITY",
    payload: drink
  };
}

export function decreaseQuantity(drink) {
  return {
    type: "DECREASE_QUANTITY",
    payload: drink
  };
}
export function changeVAT(vat) {
  return {
    type: "CHANGE_VAT",
    payload: vat
  };
}
export function changeDiscount(event) {
  return {
    type: "CHANGE_DISCOUNT",
    payload: event.target.value
  };
}
export function addProduct(product) {
  return {
    type: "ADD_PRODUCT",
    payload: product
  };
}
export function getProducts() {
  return function(dispatch) {
    axios.get("/api/order/products").then(res=>{
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data,
      });
    })
  };
}
export function getProductTypes(){
  return function(dispatch){
    axios.get("/api/order/product-type").then(res=>{
      dispatch({
        type: "GET_PRODUCT_TYPE",
        payload: res.data,
      });
    })
  }
}

export function getTempOrders(username) {
  return function (dispatch) { 
    axios.post('/api/order/get-temp-order', {username: username}).then(res => {
      // console.log('res get temp orders', res.data);
      dispatch({
        type: 'GET_TEMP_ORDERS',
        payload: res.data
      })
    })
  }
}

export function createTempOrder(bill, username){
  return function(dispatch){
    // console.log('bill', bill)
    // console.log('username', username);
    axios.post('/api/order/new-temp-order', {...bill, username}).then(res=> {
      dispatch({
        type: 'NEW_TEMP_ORDER',
        payload: res.data
      })
    })
  }
}

export function createBill(bill){
  return function(dispatch){
    axios.post("/api/order/create-bill", bill).then(res=>{
      dispatch({
        type: "BILL_CREATED",
      });
    })
  }
}

export function checkInStock(product) {
  return function (dispatch) {
    axios.post('/api/order/update-status-instock', product).then(res => {
      dispatch({
        type: 'CHECK_INSTOCK',
        payload: res.data
      })
    })
  }
}