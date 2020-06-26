const router = require('express').Router();
const { getProducts, searchProduct } = require('../queries');

router.get('/', async (req, res) => {
    const [products] = await getProducts();

    res.send(products);
});

router.post('/search', async (req, res) => {
    const { keyword } = req.body;
    const [product] = await searchProduct(keyword);
    res.send(product);
});


module.exports = router;