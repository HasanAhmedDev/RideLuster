const express = require('express');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
const path = require('path');

const app = express();

//Connecting Database
connectDB();

//Middleware
app.use(
  express.json({
    extended: false,
  })
);

//File uploading
app.use(fileupload());

//Static folder
app.use(express.static(path.join(__dirname, 'public/uploads')));

app.get('/', (req, res) => res.send('API running'));

//Defining Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/admins', require('./routes/api/admins'));
app.use('/api/vendors', require('./routes/api/vendors'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));