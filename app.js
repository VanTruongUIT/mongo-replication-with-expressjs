const express = require('express')
const app = express()
const moneyRoute = require('./routers/money.router')


app.use(express.json())
app.use(moneyRoute)


module.exports = app;
