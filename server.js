const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');

const PORT = process.env.PORT || 2000;
const api = require('./routes/api')
const app = express();
app.use(cors())

const STATIC = path.resolve(__dirname, 'public', 'dist', 'TodoApp');
const INDEX = path.resolve(STATIC, 'index.html');

app.use(express.static(STATIC));

app.use(bodyParser.json())
app.use('/api', api)


app.get('*', (req, res) => {
    res.sendFile(INDEX);
});


app.listen(PORT, () => {
    console.log('Server is running on localhost:' + PORT)
})