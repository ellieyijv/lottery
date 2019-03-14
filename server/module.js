
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/lottery'
mongoose.connect(DB_URL)
// mongoose.connection.on('connected', function(){
//     console.log('mongo connect success')
// })


const models ={
     order:{
        itemID:{type: String, require:true},
        itemName:{type:String, require:true},
        itemQty:{type:Number, require:true},
        itemPrice:{type:Number, require:true},
        totalAmount:{type:Number, require:true},
        userInfo:{type:Object, require:true}
    },

    powerball:{
        title:{type: String, require:true},
        subTitle: {type: String, require:true},
        price:{type:Number, require:true},
        drawNo:{type:Number, require:true},
        drawDate:{type:Date, require:true}
    }
    
}


for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}



module.exports={
    getModel:function (name) {
        return mongoose.model(name)
    }
}


