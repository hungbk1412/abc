var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var ProductType = require("../models/productType");
var Bill = require("../models/bill");
var moment = require('moment-timezone');
/* GET home page. */


async function getProducts() {
    let res = await Product.find().populate('type').exec();
    return res;
}
async function getProductType(){
    let res = await ProductType.find().exec();
    return res;
}

router.get('/bill-by-date', (req, res, next) => {
    Bill.find({ date: moment('2019-05-09').tz('Asia/Bangkok').format('YYYY-MM-DD') }).populate('items.productId', 'name price -_id').then(result => {
        res.send({result, date: moment('2019-05-09').tz('Asia/Bangkok').toISOString()});
    })
})

router.post('/product', (req, res, next) => {
    const product = new Product(req.body);
    product.save().then(() => {
        res.send('done');
    })
})

router.post('/product-type', (req, res, next) => {
    const product = new ProductType(req.body);
    product.save().then(() => {
        res.send('done');
    })
})

router.get("/products", function (req, res, next) {
    getProducts().then((result) => {
        res.send(result);
    });
});
router.get("/product-type", function (req,res,next){
    getProductType().then(result=>{
        res.send(result);
    })
})

router.post("/create-bill", (req, res, next) => {
    const bill = new Bill(req.body); 
    bill.date = moment(new Date()).tz('Asia/Bangkok').format('YYYY-MM-DD');
    bill.save().catch(err=>{
        console.log(err)
    }).then(() => {
        res.send("success");
    });    
})

router.post("/product-type", function(req, res, next) {
    let productType = new ProductType(req.body);
    console.log('req.body', req.body);
    productType.save().catch(err=>{
        console.log(err)
    }).then(() => {
        res.send("success");
    });
})
module.exports = router;
