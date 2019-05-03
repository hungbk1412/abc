var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var ProductType = require("../models/productType");
var Bill = require("../models/bill");
/* GET home page. */


async function getProducts() {
    let res = await Product.find().populate('type').exec();
    return res;
}
async function getProductType(){
    let res = await ProductType.find().exec();
    return res;
}

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
    let bill = new Bill(req.body);    
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
