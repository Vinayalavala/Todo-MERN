const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    task:String,
    completed:{
        type:Boolean,
        default:false
    }
})

const Todo = mongoose.model('todo',todoSchema)

module.exports = Todo;