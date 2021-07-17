const express = require('express');
const errorHandler = require('./middlewares/errorHandler')
const {PORT} = require('./config/config');
const routes = require('./routes')

const app = express();
require('./config/mongoose')
require('./config/express')(app)

app.use(routes)

app.use(errorHandler)

// app.get('/', function (req, res) {
//     res.send('hello world')
//   })
app.listen(PORT, ()=> {
    console.log('Server is running on port ' + PORT)
})




//TODO : Express Config
//TODO : Add routes and controllers
//TODO : Add Error Handling
//TODO : Sample view and layout / test static files
//TODO : Add User Model
//TODO : User Registration
//TODO : Add Services
//TODO : Hashing the password - jsonwebtoken & bcrypt
//TODO : User login
//TODO : User Logout
//TODO : Authentication middleware
//TODO : Authorization Middleware
//TODO : BONUS