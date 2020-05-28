const express = require('express');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
const path = require('path');
const vendorIO = require('./socket.io/vendor');
const clientIO = require('./socket.io/user');
const app = express();


//Middleware
app.use(
  express.json({
    extended: false,
  })
);

//Set Headers
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

//File uploading
app.use(fileupload());

//Static folder
app.use(express.static(path.join(__dirname, 'public/uploads')));



//Defining Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/admins', require('./routes/api/admins'));
app.use('/api/vendors', require('./routes/api/vendors'));

app.get('/', (req, res) => res.send('API running'));
const PORT = process.env.PORT || 5000;


//Connecting Database
connectDB().then(()=>{
  //Listening to Server
  const server = app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

  //Connecting Socket.io to Server
  const io = require('./socket.io/socket').init(server);
  io.on('connection', socket => {
    app.set('socket', socket);
    console.log("Socket.io Connected");

    socket.on('vendor', sio => {
      vendorIO(socket, sio);
    })
    socket.on('client', sio => {
      clientIO(socket, sio);
    })
  })
})


