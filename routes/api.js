const express = require('express');
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
            res.status(200).send(registeredUser)
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
                    res.status(200).send(user)
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