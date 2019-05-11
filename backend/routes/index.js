const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Bill = require("../models/bill");
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

module.exports = router;
