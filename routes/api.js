const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

const mongoose = require('mongoose');
const user = require('../models/user');
const db = "mongodb+srv://Sajjad:test123@eventsdb.4rrvb.mongodb.net/eventsdb?retryWrites=true&w=majority";
const UserModel = require('../models/user');
const TodoModel = require('../models/todoList');

(async () => {
    try {
        const conn = await mongoose.connect(
            db, {
            useNewUrlParser: true
        });
        console.log('Connected to MongoDb');
        // const ins = await new UserModel({
        //     email: "sahsh9996@yahoo.com",
        //     password: "ANDADA"
        // }).save();
        // const ret = await UserModel.findOne({});
        // console.log(ret);
    } catch (err) {
        console.error('Error!' + err)
    }
})();

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('From Api route..!!')
})

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new UserModel(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey')   
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;

    UserModel.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.sendStatus(401).send('invalid email')
            } else
                if (user.password !== userData.password) {
                    res.status(401).send('invalid password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
        }
    })
})

router.post('/addTodo', (req, res) => {
    let todoData = req.body;
    TodoModel.create(todoData, (error, data) => {
        if (error) {
            res.sendStatus(500).send('todo not created')
            console.log(error)
        } else {
            res.status(200).send(data)
        }
    })
})

router.get('/getTodo', (req, res) => {
    let query = req.body || {};
    query.hide = false
    TodoModel.find(query, (error, data) => {
        if (error) {
            res.sendStatus(500).send('todo not found')
            console.log(error)
        } else {
            res.status(200).send(data)
        }
    })
})

router.post('/updateTodo', (req, res) => {
    let { id, text } = req.body;
    TodoModel.updateOne({ _id: id }, { text }, (error, data) => {
        if (error) {
            res.sendStatus(500).send('todo not found')
            console.log(error)
        } else {
            res.status(200).send({})
        }
    })
})

router.post('/deleteTodo',(req, res) => {
    let { id } = req.body;
    TodoModel.updateOne({ _id: id }, { hide: true }, (error, data) => {
        if (error) {
            res.sendStatus(500).send('todo not found')
            console.log(error)
        } else {
            res.status(200).send({})
        }
    })
})


module.exports = router