const {
    Schema
} = mongoose = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String
})
module.exports = mongoose.model('user', userSchema, 'users')