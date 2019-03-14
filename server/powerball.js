const express = require('express')
const Router = express.Router()
const model = require('./module')
const Powerball = model.getModel('powerball')

// Powerball.create({
//     title:'regular',
//     subTitle: '12 game standard entry',
//     price: 14.5,
//     drawNo: 1192,
//     drawDate:'10/03/2019'
// })

Router.get('/list', function (req, res) {
  
    // Powerball.remove({}, function (err,doc) {

    // })
  
    Powerball.find({  }, function (err, doc) {
        console.log(doc)
        return res.json({ code: 0, data: doc })
    })
})


module.exports = Router