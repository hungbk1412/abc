const Product = require("../models/product");
const ProductType = require("../models/productType");
const TempOrder = require('../models/tempOrder');

exports.getProducts = (req, res, next) => {
    Product.find().populate('type').then(products => {
        res.status(201).json(products)
    }).catch(err => {
        err.statusCode = 500; 
        next(err);       
    })
}

exports.getProductType = (req, res, next) => {
    ProductType.find().then(productTypess => {
        res.status(201).json(productTypess)
    }).catch(err => {
        err.statusCode = 500; 
        next(err);       
    })
}

exports.postStatusInStock = (req, res, next) => {
    const productId = req.body.productId
    const inStock = req.body.inStock
    Product.findByIdAndUpdate(productId, { $set: { inStock: inStock } },  (err, product) => {
        if (err) {
            console.log('Err when find product by ID');
            return res.status(500).json({message: 'Cant update in stock status'});
        }
        return;
    })
}

exports.postNewTempOrder = (req, res, next) => {
    const newTempOrder = new TempOrder(req.body);
    newTempOrder.save().catch(err => {
        console.log('Err when post new temp order');
    }).then(result => {
        res.status(201).json(result)
    })
}

exports.editTempOrder = (req, res, next) => {
    const tempOrderId = req.body.tempOrder['_id'];
    const items = req.body.tempOrder.items;
    TempOrder.update(
        { _id: tempOrderId}, 
        { $set: {items: items, statusId: 1}})
}

exports.switchTable = (req, res, next) => {
    const newTable = req.body.newTable;
    const tempOrderId = req.body.tempOrderId
    TempOrder.findByIdAndUpdate(tempOrderId, {$set: {table: newTable}})
}

exports.barGetTempOrder = (req, res, next) => {
    TempOrder.find({statusId: 1}, null, {sort: {updatedAt: 1}}).then(result => {
        res.status(201).json(result)
    }).catch(err => {
        console.log('Err when get temp order for bar/kitchen');        
    }) 
}

// Not done
exports.checkItemDone = (req, res, next) => {
    const tempOrderId = req.body.tempOrderId
    const itemId = req.body.itemId
    TempOrder.findByIdAndUpdate(tempOrderId, (err, order) => {
        if (err) {
            console.log('Err when check item done');
            return res.status(500).json({message: 'Cant check item done'}); 
        } 
    })
}

exports.createBill = (req, res, next) => {
    const bill = new Bill(req.body);
    bill.save().catch(err => {
        console.log('Err when create new bill');
    }).then(result => {
        res.status(201).json(result)
    })
}