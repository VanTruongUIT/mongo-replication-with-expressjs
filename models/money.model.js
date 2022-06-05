const {Schema, model} = require('mongoose');


const moneySchema = new Schema({
    userId: {type: Number, required: true}, 
    amount: {type: Number,Trequired: true}
}, {timestamps: true})


module.exports = model('user', moneySchema);

