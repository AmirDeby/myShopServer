const router = require('express').Router();
const { addOrder, insertItemIntoOrder } = require('../queries');

router.post('/', async (req, res) => {
    const { productId, quantity } = req.body;
    const { userId } = req.user;
    const [result] = await addOrder(userId);
    const orderId = result.insertId;
    await insertItemIntoOrder(orderId, productId, quantity);

    res.send(result)
});


module.exports = router