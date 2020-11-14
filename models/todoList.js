const {
    Schema
} = mongoose = require('mongoose');

const todoSchema = new Schema({
    text: String,
    hide:{
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model('todo', todoSchema, 'todos')