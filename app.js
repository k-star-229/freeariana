const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');

const app = express();

// Middleware
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

// Route Middleware
app.use('/api/users', users);

// const db = 'mongodb://localhost:27017/userlist';

// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   })
//   .then(console.log('MongoDB connected'))
//   .catch(err => console.log(err)); // Maybe return res code 500



const url = `mongodb+srv://arianna:superHollywood@cluster0.lbdtqsd.mongodb.net/test`;
// const url = 'mongodb+srv://superhollywood:kpsecret0229@cluster0.kwk4fdy.mongodb.net/userList?retryWrites=true&w=majority'


const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  const host = server.address().address;
  // const port = server.address().port;
  console.log(`server runs on host ${host}, port ${PORT}`);
});
