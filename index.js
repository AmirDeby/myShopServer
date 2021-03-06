const express = require('express');
const app = express();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const Joi = require('joi');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routers/users');
const productRouter = require('./routers/products');
const cartRouter = require('./routers/cart');
const creditCardRouter = require('./routers/creditCard');
const ordersRouter = require('./routers/orders');
const sendAEmail = require('./routers/email');

const port = process.env.PORT;
const SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());
app.use(expressJwt({ secret: SECRET }).unless({ path: ['/users/login', '/users', '/users/register','/user/email', '/products', '/email'] }));

// app.get('/test', async (req, res) => {
//     try {
//         await sendAEmail('goleramir@gmail.com');
//         res.send('email sent');
//     } catch (e) {
//         res.status(500).send('email not sent');
//     }

// })

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/creditcard', creditCardRouter);
app.use('/orders', ordersRouter);
app.use('*', (req, res) => {
    res.status(404).send('page not found');
});

app.listen(port, () => {
    console.log(`server is up: ${port}`);
});

