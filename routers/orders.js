const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { getOrderDetailsForPdf, getOrderDetailssByOrderId, getOrdersByUser, deleteUserCart, addOrder, insertItemIntoOrder } = require('../queries');
const { exportOrderToPdf } = require('./pdf');

router.get('/me', async (req, res) => {
    const { userId } = req.user;
    const [orders] = await getOrdersByUser(userId);
    res.send(orders);
});

router.post('/', async (req, res) => {
    const { userId } = req.user;

    const [result] = await addOrder(userId);
    const orderId = result.insertId;

    await insertItemIntoOrder(orderId, userId);
    await deleteUserCart(userId);

    res.send(result);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const [result] = await getOrderDetailssByOrderId(id);
    res.send(result);
});

router.get('/:id/pdf', async (req, res) => {
    const { id } = req.params;
    try {
        const [orderDetails] = await getOrderDetailsForPdf(id);
        exportOrderToPdf(orderDetails, res);
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router