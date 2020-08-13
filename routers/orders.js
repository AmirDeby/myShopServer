const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { getOrderDetailsForPdf, getOrderDetailssByOrderId, getOrdersByUser, deleteUserCart, getCart, addOrder, addItemsToOrder, updateInventory } = require('../queries');
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
    const [userCart] = await getCart(userId);

    for (let i = 0; i < userCart.length; i++) {
        const { quantity, productId } = userCart[i];
        await updateInventory(quantity, productId);
    }

    await addItemsToOrder(orderId, userId);
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