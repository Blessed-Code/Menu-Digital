const Controller = require('./controllers/controller')
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

// routings
app.get('/', Controller.index)

// end routings

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})