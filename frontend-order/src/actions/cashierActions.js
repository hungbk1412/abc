import axios from '../axios-store';

export function cashierGetBills() {
    return function (dispatch) {
        axios.get('/api/order/cashier-get-bills').then(res => {
            dispatch({
                type: 'CASHIER_GET_BILLS',
                payload: res.data
            })
        })
    }
}

export function changeVAT(id, vat) {
    return {
        type: "CHANGE_VAT",
        payload: {id, vat}
    };
}

export function changeDiscount(event, id) {
    return {
        type: "CHANGE_DISCOUNT",
        payload: {discount: event.target.value, id: id}
    };
}

export function checkout(bill) {
    return function (dispatch) {
        console.log('bill :', bill);
        axios.post('/api/order/checkout', bill).then(res => {
            dispatch({
                type: 'CHECKOUT',
                payload: bill
            })
        })
    }
}