const express = require('express');
const app = express();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const Joi = require('joi');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routers/users');
const productRouter = require('./routers/products');

const port = process.env.PORT;
const JWT_SECRET = 'secret-token';

app.use(cors());
app.use(express.json());
app.use(expressJwt({ secret: JWT_SECRET }).unless({ path: ['/users/login', '/users','/users/register'] }));


app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('*', (req, res) => {
    res.status(404).send('page not found');
});

app.listen(port, () => {
    console.log(`server is up: ${port}`);
});

