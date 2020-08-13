const router = require('express').Router();
const { updateInventory } = require('../queries');

router.post('/', async (req, res) => {
    const { cardName, cardNumber, cvv, expDate } = req.body;
    
    res.send(req.body);
});

module.exports = router