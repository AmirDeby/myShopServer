const router = require('express').Router();

router.post('/', async (req, res) => {
    const { cardName, cardNumber, cvv, expDate } = req.body;

    res.send(req.body);
});

module.exports = router