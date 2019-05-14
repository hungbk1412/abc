/* eslint-disable default-case */
export default function orderReducer(state = {
    finalBills : [],
    needToReRender: 0,
}, action) {
    let finalBills = state.finalBills;
    let needToReRender = state.needToReRender;

    switch (action.type) {
        case "CHANGE_VAT": {
            let found = finalBills.findIndex(elem => {
                return elem._id == action.payload.id
            })
            finalBills[found].vat = action.payload.vat;
            let temp_cost = finalBills[found].items.reduce(function (total, elem) {
                total = total + elem.price * elem.quantity;
                return total;
            }, 0);
            let totalPrice = temp_cost+ temp_cost * finalBills[found].vat - finalBills[found].discount * temp_cost * 0.01;
            totalPrice = totalPrice / 1000
            finalBills[found].totalPrice = Math.ceil(totalPrice)*1000;
            needToReRender++;
            break;
        }
        case "CHANGE_DISCOUNT": {
            let found = finalBills.findIndex(elem => {
                return elem._id == action.payload.id
            })
            finalBills[found].discount = action.payload.discount;
            let temp_cost = finalBills[found].items.reduce(function (total, elem) {
                total = total + elem.price * elem.quantity;
                return total;
            }, 0);
            let totalPrice = temp_cost+ temp_cost * finalBills[found].vat - finalBills[found].discount * temp_cost * 0.01;
            totalPrice = totalPrice / 1000
            finalBills[found].totalPrice = Math.ceil(totalPrice)*1000;
            needToReRender++;
            break;
        }
        case "CASHIER_GET_BILLS": {
            finalBills = action.payload;
            finalBills.forEach(bill => {
                bill.vat = 0;
                bill.discount = 0;
            })
            break;
        }
        case 'CHECKOUT': {
            console.log('action.payload._id :', action.payload._id);
            let found = finalBills.findIndex(elem => {
                return elem._id === action.payload._id
            })
            finalBills.splice(found, 1);
            needToReRender++;
            break;
        }
    }
    return {
        ...state,
        finalBills: finalBills,
        needToReRender: needToReRender
    };
}