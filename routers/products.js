const router = require('express').Router();
const { getProducts, searchProduct, addProduct } = require('../queries');

router.get('/', async (req, res) => {
    const [products] = await getProducts();
    res.send(products);
});

router.post('/search', async (req, res) => {
    const { keyword } = req.body;
    const [product] = await searchProduct(keyword);
    res.send(product);
});

router.post('/add', async (req, res) => {
    const { inventory, name, description, image, originalPrice, salePrice, categoryId } = req.body;
    const [product] = await addProduct(inventory, name, description, image, originalPrice, salePrice, categoryId);
    console.log(product);
    res.send(product)
});


module.exports = router;