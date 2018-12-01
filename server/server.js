const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const config = require('./config');

const user = require('./routes/user.js');
const expense = require('./routes/expense.js');

const port = process.env.PORT || config.serverport;

mongoose.connect(config.database, {useNewUrlParser: true}, (err) => {
    if (err) {
        console.log('Error connecting database, please check if MongoDB is running.');
    } else {
        console.log('Connected to database...');
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(require('body-parser').json({type: '*/*'}));
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/',(req, res) => {
    res.send(`Expense Manager  API is running at http://localhost:${port}/api`);
});

app.post('/register', user.signup);

const apiRoutes = express.Router();

app.use('/api', apiRoutes);

apiRoutes.post('/login', user.login);

apiRoutes.use(user.authenticate);


apiRoutes.get('/',  (req, res) => {
    res.status(201).json({message: 'Welcome to the authenticated routes!'});
});

apiRoutes.get('/user/:id', user.getuserDetails);

apiRoutes.put('/user/:id', user.updateUser);

apiRoutes.put('/password/:id', user.updatePassword);

apiRoutes.post('/expense/:id', expense.saveexpense);

apiRoutes.delete('/expense/:id', expense.delexpense);

apiRoutes.get('/expense/:id', expense.getexpense);

apiRoutes.post('/expense/total/:id', expense.expensetotal);

apiRoutes.post('/expense/report/:id', expense.expensereport);

app.listen(port, () => {
    console.log(`Expense Manager app is listening at http://localhost:${port}`)
});