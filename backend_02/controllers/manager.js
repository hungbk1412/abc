const Bill = require('../models/bill');
const Expense = require('../models/expense');
const User = require('../models/user')
const Product = require('../models/product');
const ProductType = require('../models/productType');
const moment = require('moment-timezone');

exports.postNewUser = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username}).then(userDoc => {
        if (userDoc) {
            return res.status(400).json({message: 'Username is already picked'})
        }
        return bcrypt.hash(password, 12).then(hashedPass => {
            const user = new User({...req.body, password: hashedPass})
            return user.save()
        }).then(result => {
            res.status(201).json({message: 'User Created!', userRole: result.role_id})
        })
    }).catch(err => {
        err.statusCode = 500; 
        next(err);       
    })
}

exports.postProductType = (req, res, next) => {
    const productType = new ProductType(req.body);
    productType.save().then((productType) => {
        res.status(201).json({message: 'New product type created!', productType: productType})
    }).catch(err => {
        res.status(500).json({message: 'Error when add new product type'});
    })
}

exports.postProduct = (req, res, next) => {
    const product = new Product(req.body);
    product.save().then((product) => {
        res.status(201).json({message: 'New product created!', product: product})
    }).catch(err => {
        res.status(500).json({message: 'Error when add new product'});
    })
}

exports.getAllBills = (req, res, next) => {
    Bill.find().then(bills => {
        res.status(201).json(bills);
    }).catch(err => {
        console.log('Err when get all bill');      
        res.status(501).json({message: 'Err when get all bills'})
    })
}

exports.getBillsByDate = (req, res, next) => {
    Bill.find({ date: moment(req.params).tz('Asia/Bangkok').format('YYYY-MM-DD') }).then(bills => {
        res.status(201).json(bills);
    }).catch(err => {
        console.log('Err when get bills by date');        
        res.status(501).json({message: 'Err when get bills by date'})
    })
}

exports.getBillsByMonth = (req, res, next) => {
    Bill.find({ date: moment(req.params).tz('Asia/Bangkok').format('YYYY-MM-DD') }).then(bills => {
        res.status(201).json(bills);
    }).catch(err => {
        console.log('Err when get bills by date');        
        res.status(501).json({message: 'Err when get bills by date'})
    })
}

exports.postExpense = (req, res, next) => {
    const expense = new Expense(req.body);
    expense.date = moment(req.body.date).tz('Asia/Bangkok').format('YYYY-MM-DD');
    expense.month = moment(req.body.date).tz('Asia/Bangkok').format('YYYY-MM');
    expense.save().catch(err => {
        console.log('Err when post new expense');
    }).then(result => {
        res.status(201).json(result);
    })
}

exports.getAllExpenses = (req, res, next) => {
    Expense.find().then(expenses => {
        res.status(201).json(expenses)
    }).catch(err => {
        console.log('Err when get all expenses');      
        res.status(501).json({message: 'Err when get all expenses'});
    })
}

exports.getExpensesByDate = (req, res, next) => {
    Expense.find({ date: moment(req.params).tz('Asia/Bangkok').format('YYYY-MM-DD') }).then(expenses => {
        res.status(201).json(expenses)
    }).catch(err => {
        console.log('Err when expenses by date');      
        res.status(501).json({message: 'Err when get expenses by date'});
    })
}

exports.getExpensesByMonth = (req, res, next) => {
    Expense.find({ month: moment(req.params).tz('Asia/Bangkok').format('YYYY-MM') }).then(expenses => {
        res.status(201).json(expenses)
    }).catch(err => {
        console.log('Err when expenses by month');      
        res.status(501).json({message: 'Err when get expenses by month'});
    })
}