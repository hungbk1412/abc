const Product = require("../models/product");
const ProductType = require("../models/productType");
const TempOrder = require('../models/tempOrder');
const Bill = require('../models/bill');
const moment = require('moment-timezone');
const FinalBill = require('../models/finalBill');
const io = require('../socket');

exports.getProducts = (req, res, next) => {
    Product.find().populate('type').then(products => {
        res.status(201).json(products)
    }).catch(err => {
        err.statusCode = 500; 
        next(err);
    })
}
exports.getProductType = (req, res, next) => {
    ProductType.find().then(productTypes => {
        res.status(201).json(productTypes)
    }).catch(err => {
        err.statusCode = 500; 
        next(err);       
    })
}

exports.postStatusInStock = (req, res, next) => {
    const productId = req.body.productId;
    const inStock = !(req.body.inStock);
    Product.findByIdAndUpdate(productId, { $set: { inStock: inStock } },  (err, product) => {
        if (err) {
            console.log('Err when find product by ID');
            return res.status(500).json({message: 'Cant update in stock status'});
        }
        io.getIO().emit('order', {action: 'checkInStock'})
        return res.status(201).json({'_id': product['_id'], 'inStock': inStock});
    })
}

// Controller tu user cac ban
exports.postNewTempOrder = (req, res, next) => {
    // console.log('req.body :', req.body);
    const newTempOrder = new TempOrder(req.body);
    newTempOrder.save().catch(err => {
        console.log('Err when post new temp order');
    }).then(result => {
        // console.log('result when post new temp order:', result);
        io.getIO().emit('order', {action: 'newTempOrder'})
        res.status(201).json(result)
    }) 
}
// exports.editTempOrder = (req, res, next) => {
//     const tempOrderId = req.body.tempOrder['_id'];
//     const items = req.body.tempOrder.items;
//     TempOrder.update(
//         { _id: tempOrderId}, 
//         { $set: {items: items, done: false}})
// }
// exports.switchTable = (req, res, next) => {
//     const newTable = req.body.newTable;
//     const tempOrderId = req.body.tempOrderId
//     TempOrder.findByIdAndUpdate(tempOrderId, {$set: {table: newTable}})
// }
exports.tableGetTempOrder = (req, res, next) => {    
    // console.log('req.body :', req.body);
    const username = req.body.username;
    // console.log('username :', username);
    TempOrder.find({username: username}, null, {sort: {updatedAt: -1}}).then(result => {
        res.status(201).json(result)
    }).catch(err => {
        console.log('Err when get tem orders for table');
        
    })
}

// Controller tu user nhan vien bep
exports.barGetTempOrder = (req, res, next) => {
    TempOrder.find({done: false}, null, {sort: {updatedAt: -1}}).then(result => {
        res.status(201).json(result)
    }).catch(err => {
        console.log('Err when get temp orders for bar/kitchen');        
    }) 
}
// Not done
exports.checkItemDone = (req, res, next) => {
    const update = ({ items: req.body.items })    
    TempOrder.findByIdAndUpdate(req.body._id, update, (err, order) => {
        if (err) {
            console.log('Err when check item done');
            return res.status(500).json({message: 'Cant check item done'}); 
        }
        io.getIO().emit('order', {action: 'checkItemDone'})
        return res.status(201).json({order});
    })
}
// exports.doneOrder = (req, res, next) => {
//     const tempOrderId = req.body._id;
//     TempOrder.findByIdAndUpdate(tempOrderId, (err, order) => {
//         if (err) {
//             console.log('Err when check item done');
//             return res.status(500).json({message: 'Cant check order done'})
//         }
//     })
// }

exports.createBill = (req, res, next) => {
    const bill = new Bill(req.body);
    bill.date = moment(new Date()).tz('Asia/Bangkok').format('YYYY-MM-DD');
    bill.save().catch(err => {
        console.log('Err when create new bill');
        return res.status(500).json({message: 'Cant create new bill'})
    }).then(result => {
        io.getIO().emit('order', {action: 'createBill'})
        res.status(201).json(result);
    })
}

exports.deleteTempOrder = (req, res, next) => {    
    TempOrder.remove({_id: {$in: req.body}}).then().catch(err => {
        console.log('Err when delete temp order');
        return res.status(500).json({message: 'Cant delete temp order'})        
    })
}

exports.cashierGetBills = (req, res, next) => {
    Bill.find().then(bills => {
        res.status(201).json(bills)
    }).catch(err =>{
        console.log('Err when get bills for cashier');        
    })
}

exports.checkout = (req, res, next) => {
    console.log('req.body :', req.body);
    const finalBill = FinalBill(req.body);
    finalBill.date = moment(new Date()).tz('Asia/Bangkok').format('YYYY-MM-DD');
    Bill.findByIdAndDelete(req.body._id).then().catch(err => {
        console.log('Err when delete bill');        
    });
    finalBill.save().catch(err => {
        console.log('Err when create new bill');
        return res.status(500).json({message: 'Cant create new bill'})
    }).then(result => {
        res.status(201).json(result)
    })   
}