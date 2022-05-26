const Controller = require('./controllers/controller')
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

// routings
app.get('/', Controller.index)

app.get('/:UserId/order', Controller.pageOrders) 
app.post('/:UserId/order', Controller.newOrder) //nge-create order

app.get('/:UserId/order/:OrderId', Controller.pageMenu) //tampilan kedua
app.post('/:UserId/order/:OrderId', Controller.createOrderMenu) // create order menu

app.post('/:UserId/order/:OrderId/new', Controller.updateOrder)

app.post('/:UserId/order/:OrderId/delete', Controller.cancelOrder)





// end routings

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})