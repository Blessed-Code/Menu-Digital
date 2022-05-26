const AuthController = require('./controllers/authController')
const Controller = require('./controllers/controller')
const express = require('express')
const session = require('express-session')
const AdminController = require('./controllers/adminController')
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

app.get('/admin/', AdminController.showAllMenus);
app.get('/admin/addMenu', AdminController.formAddMenu);
app.post('/admin/addMenu', AdminController.addMenu);

app.get('/admin/:menuId/edit', AdminController.formEditMenu);
app.post('/admin/:menuId/edit', AdminController.formEditMenu);

app.get('/admin/:menuId/delete', AdminController.deleteMenu);


app.get('/order', Controller.pageOrders) 
app.get('/updateMember', Controller.updateMember)
app.post('/order', Controller.newOrder) //nge-create order

app.get('/order/:OrderId', Controller.pageMenu) //tampilan kedua
app.post('/order/:OrderId', Controller.createOrderMenu) // create order menu

app.get('/order/:OrderId/new', Controller.updateOrder)

app.get('/order/:OrderId/delete', Controller.cancelOrder)





// end routings

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})