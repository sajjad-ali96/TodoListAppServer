const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 2000
const api = require('./routes/api')
const app = express();
app.use(cors())

app.use(bodyParser.json())
app.use('/api', api)


app.get('/', (req, res) => {
    res.send('server is on...!!')
})

app.listen(PORT, () => {
    console.log('Server is running on localhost:' + PORT)
})