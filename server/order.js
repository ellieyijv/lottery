const express = require('express')
const Router = express.Router()
const model = require('./module')
const Order = model.getModel('Order')

//set up the table
// ShoppingCart.create({
//     itemID: '2',
//     itemName: '8 entries',
//     itemQty: 3,
//     itemPrice: 9.2
// }, function(err, doc){
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })
// ShoppingCart.remove({}, function(err, res){
//     if(err){
//         console.log(err )
//     }
// })


// ShoppingCart.updateOne({itemID:20},{'$set': {itemPrice: 10}}, function(err, res){
//     if(err){
//         console.log (err)
//     }
// })

Router.get('/list', function (req, res) {
  
    // ShoppingCart.remove({}, function (err,doc) {

    // })
    Order.find({  }, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })
})

Router.post('/add', function(req, res){
    console.log(req.body.data)
    const { userInfo, item, totalAmount } = req.body
    const orderDate = new Date()
    const orderNumber = new Date().getTime()
    Order.findOne({ orderNumber }, function (err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: 'duplicated order' })
        }
        const orderModel = new Order({item, totalAmount, userInfo, orderNumber, orderDate })
        orderModel.save(function (err, doc) {
            if (err) {
                return res.json({ code: 1, msg: 'something wrong with the server' })
            }
            const { orderNumber, orderDate } = doc
            
            return res.json({ code: 0, data: { orderNumber, orderDate } })
        })
    })
})

module.exports = Router