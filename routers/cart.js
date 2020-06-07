const router = require('express').Router();
const { getCart, deleteItemFromCart, addItemToCart, getCartItemId, updateQuantity } = require('../queries');

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
        return res.status(500).send('something went wrong');
    }
    res.send('item has been removed')
});

router.post('/:productId', async (req, res) => {
    const { productId } = req.params;
    const { userId } = req.user;
    const { quantity } = req.body;

    const item = await getCartItemId(userId, productId);
    if (item) {
        const newQuantity = item.quantity + quantity;
        await updateQuantity(item.id, newQuantity);
    } else {
        const [result] = await addItemToCart(productId, userId, quantity);
        if (!result.affectedRows) {
            return res.status(500).send('cant add item');
        }
    }
    res.send('item has been added to cart');
});


module.exports = router 