const Bill = require('../models/finalBill');
const Expense = require('../models/expense');
const User = require('../models/user')
const Product = require('../models/product');
const ProductType = require('../models/productType');
const TimeKeeping = require('../models/timeKeeping');
const Employee = require('../models/employee');
const bcrypt = require('bcryptjs');

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
            res.status(200).json({message: 'User Created!', userRole: result.role_id})
        })
    }).catch(err => {
        err.statusCode = 500; 
        next(err);       
    })
}
exports.editUser = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOneAndUpdate({username: username}, {$set: {'username': username, 'role_id': req.body.role_id, 'isActive': req.body.isActive}}).then(user => {
        if (user && password) {
            return bcrypt.hash(password, 12).then(hashedPass => {
                user.password = hashedPass;
                user.save();
                res.status(200).json('Done')
            })
        }
        res.status(200).json('Done')
    }).catch(err => res.status(500).json('Loi roi'))
}
exports.getUsers = (req, res, next) => {
    User.find().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.log('Err when get all bill');      
        res.status(500).json({message: 'Err when get all bills'})
    })
}

exports.postProductType = (req, res, next) => {
    const productType = new ProductType(req.body);
    productType.save().then((productType) => {
        res.status(200).json({message: 'New product type created!', productType: productType})
    }).catch(err => {
        res.status(500).json({message: 'Error when add new product type'});
    })
}
exports.postProduct = (req, res, next) => {
    const product = new Product(req.body);
    product.save().then((product) => {
        res.status(200).json({message: 'New product created!', product: product})
    }).catch(err => {
        res.status(500).json({message: 'Error when add new product'});
    })
}
exports.deleteProduct = (req, res, next) => {
    Product.findByIdAndDelete(req.body._id).then(
        res.status(200)
    ).catch(
        res.status(500)
    )
}
exports.deleteProductType = (req, res, next) => {
    Product.update({ type: req.body._id }, { $set: { type: "5cd77ea3f9ba3f0d406cfddf" } }).then(() => {
        ProductType.findByIdAndDelete(req.body._id).then(
            res.status(200)
        ).catch(
            res.status(500)
        )
    }).catch(
        res.status(500)
    )    
}
exports.editProduct = (req, res, next) => {
    let productUpdate = req.body;
    Product.findByIdAndUpdate(productUpdate._id,{ $set: {name: productUpdate.name, price: productUpdate.price} }).then(
        res.status(200)
    ).catch(
        res.status(500)
    )
}

exports.getBills = (req, res, next) => {
    let date = req.params.date;
    if (date === 'All') {
        Bill.find().then(bills => {
            res.status(200).json(bills);
        }).catch(err => {
            console.log('Err when get all bill');      
            res.status(500).json({message: 'Err when get all bills'})
        })
    } else {
        Bill.find({ date : moment(date).tz('Asia/Bangkok').format('YYYY-MM-DD') }).then(bills => {
            res.status(200).json(bills);
        }).catch(err => {
            console.log('Err when get bills by date');        
            res.status(500).json({message: 'Err when get bills by date'})
        })
    }    
}

// exports.getBillsByMonth = (req, res, next) => {
//     Bill.find({ date: moment(req.params).tz('Asia/Bangkok').format('YYYY-MM-DD') }).then(bills => {
//         res.status(200).json(bills);
//     }).catch(err => {
//         console.log('Err when get bills by date');        
//         res.status(500).json({message: 'Err when get bills by date'})
//     })
// }

exports.postExpense = (req, res, next) => {
    const expense = new Expense(req.body);
    expense.date = moment(req.body.date).tz('Asia/Bangkok').format('YYYY-MM-DD');
    expense.month = moment(req.body.date).tz('Asia/Bangkok').format('YYYY-MM');
    expense.save().catch(err => {
        console.log('Err when post new expense');
    }).then(result => {
        res.status(200).json(result);
    })
}

exports.getAllExpenses = (req, res, next) => {
    Expense.find().then(expenses => {
        res.status(200).json(expenses)
    }).catch(err => {
        console.log('Err when get all expenses');      
        res.status(500).json({message: 'Err when get all expenses'});
    })
}

exports.getExpensesByDate = (req, res, next) => {
    Expense.find({ date: moment(req.params).tz('Asia/Bangkok').format('YYYY-MM-DD') }).then(expenses => {
        res.status(200).json(expenses)
    }).catch(err => {
        console.log('Err when expenses by date');      
        res.status(500).json({message: 'Err when get expenses by date'});
    })
}

exports.getExpensesByMonth = (req, res, next) => {
    Expense.find({ month: moment(req.params).tz('Asia/Bangkok').format('YYYY-MM') }).then(expenses => {
        res.status(200).json(expenses)
    }).catch(err => {
        console.log('Err when expenses by month');      
        res.status(500).json({message: 'Err when get expenses by month'});
    })
}

exports.getProductsSold = (req, res, next) => {
    let productMap = {};
    Product.find().then(products => {
        let productsLength = products.length;
        for (let i = 0; i < productsLength; i++) {
            productMap[products[i].name] = 0;
        }
        if (req.params.date === 'All') {
            Bill.find().then(bills => {
                let billsLength = bills.length;
                for (let j = 0; j < billsLength; j++) {
                    for (let k = 0; k < bills[j].items.length; k++) {
                        if (!(bills[j].items[k].name in productMap)) {
                            productMap[bills[j].items[k].name] = 0;
                        }
                        productMap[bills[j].items[k].name] = productMap[bills[j].items[k].name] + bills[j].items[k].quantity
                    }
                }
                res.status(200).json(productMap)
            }).catch(error => {
                console.log('Loi khi get final bill: ', error);
                res.status(500)
            })
        } else {
            let date = moment(req.params.date).tz('Asia/Bangkok').format('YYYY-MM-DD');
            Bill.find({ date: date }).then(bills => {
                let billsLength = bills.length;
                for (let j = 0; j < billsLength; j++) {
                    for (let k = 0; k < bills[j].items.length; k++) {
                        if (!(bills[j].items[k].name in productMap)) {
                            productMap[bills[j].items[k].name] = 0;
                        }
                        productMap[bills[j].items[k].name] = productMap[bills[j].items[k].name] + bills[j].items[k].quantity
                    }
                }
                res.status(200).json(productMap)
            }).catch(error => {
                console.log('Loi khi get final bill: ', error);
                res.status(500)
            })
        }
    }).catch(err => {
        console.log('Loi khi get product: ', err);        
        res.status(500)
    })
}

exports.postEmployee = (req, res, next) => {
    const employee = new Employee(req.body);
    employee.save().then(
        res.status(200).json('done')
    ).catch(
        res.status(500)
    )
}
exports.editEmployee = (req, res, next) => {
    console.log('req.body', req.body)
    Employee.findByIdAndUpdate(req.body.key, { $set: req.body}).then(() => {
        res.status(200).json('done')
    }).catch(err => {
        res.status(500)
    })
}
exports.getEmployees = (req, res, next) => {
    Employee.find().then(employees => {
        res.status(200).json(employees)
    }).catch(err => {
        res.status(500)
    })
}
exports.deleteEmployee = (req, res, next) => {
    console.log('req.body', req.body)
    Employee.findByIdAndDelete(req.body._id).then(res.status(200).json('done')).catch(err => {
        res.status(500)
    })
}

exports.postTimeKeeping = (req, res, next) => {
    const timeKeeping = new TimeKeeping(req.body);
    timeKeeping.save().then(
        res.status(200)
    ).catch(
        res.status(500)
    )
}
exports.getTimeKeeping = (req, res, next) => {
    let query = {}
    if (req.body.date) {
        query = {date: req.body.date}
    } else if (req.body.employeeId) {
        query = {employee: employeeId}
    }
    TimeKeeping.find(query).then(timeKeepingTable => {
        res.status(200).json(timeKeepingTable);
    }).catch(err => {
        res.status(500);
    })
}