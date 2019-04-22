export default function orderReducer(state = {
    productType: [],
    products: {},
    bill: {
        items: [],
        totalPrice: 0,
    },
    cost: 0,
    vat: 0,
    discount: 0,
    total: 0,
}, action) {
    let productType = state.productType;
    let products = state.products;
    let bill = state.bill;
    let temp_vat = 0;
    let temp_discount = 0;

    switch (action.type) {
        case "REMOVE_DRINK":
            bill.items = state.bill.items.filter((elem) => {
                if (elem['name'] != action.payload['name']) {
                    return true;
                } else {
                    return false;
                }
            });
            break;
        case "INCREASE_QUANTITY": {
            let found = state.bill.items.findIndex((elem) => {
                return elem["name"] == action.payload["name"];
            });
            bill.items = state.bill.items.slice();
            bill.items[found].quantity++;
            break;
        }
        case "DECREASE_QUANTITY": {
            let found = state.bill.items.findIndex((elem) => {
                return elem["name"] == action.payload["name"];
            });
            bill.items = state.bill.items.slice();
            bill.items[found].quantity--;
            break;
        }
        case "CHANGE_VAT": {
            if (action.payload == 0.1) {
                temp_vat = 0.1;
            }
            if (action.payload == 0) {
                temp_vat = 0;
            }
            break;
        }
        case "CHANGE_DISCOUNT": {
            temp_discount = action.payload;
            break;
        }
        case "ADD_PRODUCT": {
            let found = state.bill.items.findIndex((elem) => {
                return elem["name"] == action.payload["name"];
            });
            if (found == -1) {
                bill.items = state.bill.items.slice();
                bill.items.push({
                    productId: action.payload._id,
                    name: action.payload.name,
                    quantity: 1,
                    note: "",
                    price: action.payload.price,
                });
            } else {
                bill.items = state.bill.items.slice();
                bill.items[found].quantity++;
            }
            break;
        }
        case "GET_PRODUCTS": {
            products = action.payload;
            break;
        }

        case "GET_PRODUCT_TYPE": {
            action.payload.map(elem =>{
                productType.push(elem);
            });
            console.log(productType);
        }
        case "BILL_CREATED": {
            bill.items = []
            bill.totalPrice = 0;
            break;
        }
    }
    bill.items.forEach((elem) => {
        elem.total = elem.price * elem.quantity;
    });
    let temp_cost = bill.items.reduce(function (total, elem) {
        total = total + elem.price * elem.quantity;
        return total;
    }, 0);
    bill.totalPrice = temp_cost + temp_cost * temp_vat - temp_discount * temp_cost * 0.01;
    return {
        ...state,
        productType: productType,
        products: products,
        bill: bill,
        cost: temp_cost,
        vat: temp_vat,
        discount: temp_discount,
    };
}