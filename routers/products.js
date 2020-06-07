const router = require('express').Router();
const { getProducts } = require('../queries');

router.get('/',async (req, res) => {
    const [products] = await getProducts();
    
    res.send(products);
});



router.get('/:id', () => {
    res.send('sending a specific product: soccerball');
});

module.exports = router;