const Bill = require('../models/bill');
const Expense = require('../models/expense');
var moment = require('moment-timezone');

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
    expense.date = moment(req.params).tz('Asia/Bangkok').format('YYYY-MM-DD');
    expense.month = moment(req.params).tz('Asia/Bangkok').format('YYYY-MM');
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