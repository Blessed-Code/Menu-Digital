const AuthController = require('./controllers/authController')
const Controller = require('./controllers/controller')
const express = require('express')
const session = require('express-session')
const checkIsLoggedIn = require('./helpers/checkIsLogin')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: 'user-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}));

// routings
app.get('/', Controller.index)

app.get('/register', AuthController.showRegisterForm);
app.post('/register', AuthController.registerUser);

app.get('/login', AuthController.showLoginForm);
app.post('/login', AuthController.loginUser);

app.use(checkIsLoggedIn);

app.get('/logout', AuthController.logoutUser);
// app.get('/admin/:UserId', AdminController.showDashboard);

app.get('/order', Controller.pageOrders) 
app.get('/updateMember', Controller.updateMember)
app.post('/order', Controller.newOrder) //nge-create order

app.get('/order/:OrderId', Controller.pageMenu) //tampilan kedua
app.post('/order/:OrderId', Controller.createOrderMenu) // create order menu

app.post('/order/:OrderId/new', Controller.updateOrder)

app.post('/order/:OrderId/delete', Controller.cancelOrder)





// end routings

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})