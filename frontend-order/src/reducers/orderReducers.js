/* eslint-disable default-case */
export default function orderReducer(state = {
    productType: [],
    products: {},
    tempOrders: {
        orders: [],
        totalPrice: 0
    },
    bill: {
        items: [],
        totalPrice: 0,
    },
    finalBills : [],
    cost: 0,
    // vat: 0,
    // discount: 0,
    total: 0,
    needToReRender: 0,
}, action) {
    let productType = state.productType;
    let products = state.products;
    let tempOrders = state.tempOrders;
    let bill = state.bill;
    let finalBills = state.finalBills;
    let needToReRender = state.needToReRender;
    // let temp_vat = 0;
    // let temp_discount = 0;    

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
        case "NOTE" : {
            let found = state.bill.items.findIndex((elem) => {
                return elem["name"] == action.payload.item["name"];
            });
            bill.items = state.bill.items.slice();
            bill.items[found].note = action.payload.note;
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
            break;
        }
        case 'GET_TEMP_ORDERS': {
            tempOrders.orders = action.payload;            
            // console.log('tempOrders.orders', tempOrders.orders);
            break;
        }
        case 'NEW_TEMP_ORDER': { 
            // console.log('action.payload :', action.payload);
            tempOrders.orders.push(action.payload);           
            bill.items = [];
            bill.totalPrice = 0;
            break;
        }
        case "BILL_CREATED": {
            tempOrders.orders = [];
            tempOrders.totalPrice = 0;
            bill.items = [];
            bill.totalPrice = 0;
            // console.log('finalBills :', finalBills);
            needToReRender++
            break;
        }
        case 'CHECK_INSTOCK': {
            let productLength = products.length;
            for (let i = 0; i < productLength; i++) {
                if (products[i]['_id'] === action.payload['_id']) {
                    products[i]['inStock'] = action.payload['inStock'];
                    break;
                }
            }
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

    tempOrders.orders.forEach(order => {
        order.items.forEach(item => {
            temp_cost = temp_cost + item.total
        })
    })
    
    bill.totalPrice = temp_cost
    return {
        ...state,
        productType: productType,
        products: products,
        bill: bill,
        finalBills: finalBills,
        needToReRender: needToReRender,
        cost: temp_cost,
        // vat: temp_vat,
        // discount: temp_discount,
        tempOrders: tempOrders
    };
}