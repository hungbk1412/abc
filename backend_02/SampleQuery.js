// Lay nhung ban ghi co trong thang 5
db.getCollection('finalbills').find({date: {$gte: '2019-05', $lt: '2019-06'}})