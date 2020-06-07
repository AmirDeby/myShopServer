const router = require('express').Router();
const { getCart, deleteItemFromCart, addItemToCart } = require('../queries');

router.get('/', async (req, res) => {
    const { userId } = req.user;
    const [cart] = await getCart(userId);

    res.send(cart)
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    const [result] = await deleteItemFromCart(id, userId);
    if (!result.affectedRows) {
        res.status(403).send('something want wrong');
    }
    res.send('item has been remove')
});

router.post('/:produtId', async (req, res) => {
    const { produtId } = req.params;
    const { userId } = req.user;

    const [result] = await addItemToCart(produtId, userId, 1);
    if (!result.affectedRows) {
        res.status(400).send('cant add item');
    }
    res.send('item has been added to cart')
});


module.exports = router 