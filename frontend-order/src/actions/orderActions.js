import axios from "axios";
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
    axios.get("http://localhost:5000/products").then(res=>{
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data,
      });
    })
  };
}
export function getProductTypes(){
  return function(dispatch){
    axios.get("http://localhost:5000/product-type").then(res=>{
      dispatch({
        type: "GET_PRODUCT_TYPE",
        payload: res.data,
      });
    })
  }
}

export function createBill(bill){
  return function(dispatch){
    axios.post("http://localhost:5000/create-bill", bill).then(res=>{
      dispatch({
        type: "BILL_CREATED",
      });
    })
  }
}
