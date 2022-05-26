const AuthController = require('./controllers/authController')
const Controller = require('./controllers/controller')
const express = require('express')
const session = require('express-session')
const checkIsLoggedIn = require('./middlewares/checkIsLogin')
const checkIsAdmin = require('./middlewares/checkIsAdmin')
const checkIsCustomer = require('./middlewares/checkIsCustomer')
const AdminController = require('./controllers/adminController')
const app = express()
const port = process.env.PORT || 3000

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

app.get('/admin', checkIsAdmin, AdminController.showAllMenus);

app.get('/admin/addMenu', checkIsAdmin, AdminController.formAddMenu);
app.post('/admin/addMenu', checkIsAdmin, AdminController.addMenu);

app.get('/admin/:menuId/edit', checkIsAdmin, AdminController.formEditMenu);
app.post('/admin/:menuId/edit', checkIsAdmin, AdminController.updateMenu);

app.get('/admin/:menuId/delete', checkIsAdmin, AdminController.deleteMenu);


app.get('/order', checkIsCustomer, Controller.pageOrders) 
app.get('/updateMember', checkIsCustomer, Controller.updateMember)
app.post('/order', checkIsCustomer, Controller.newOrder) //nge-create order

app.get('/order/:OrderId', checkIsCustomer, Controller.pageMenu) //tampilan kedua
app.post('/order/:OrderId', checkIsCustomer, Controller.createOrderMenu) // create order menu

app.get('/order/:OrderId/new', checkIsCustomer, Controller.updateOrder)

app.get('/order/:OrderId/delete', checkIsCustomer, Controller.cancelOrder)





// end routings

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})