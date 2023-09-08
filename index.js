const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const app = express()
const port = 8080
const db = require('./src/config/db')
const User = require('./src/app/models/user')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
dotenv.config()
app.use(morgan('combined'))
app.use(cors());

db.connect()

app.post('/create', async (req, res) => {
    try {
        const user = new User (req.body)
        await user.save()
        res.json({status : 200, message : 'success'})
    } catch (error) {
        res.json({status : 500, message : 'fail'})
    }
})

app.get('/get-users', async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.json({status : 500, message : 'fail'})
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})