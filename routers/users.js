const db = require('../sql');
const router = require('express').Router();
const { userSchema } = require('../models/user');
const jwt = require('jsonwebtoken');
const { validate } = require('../joiMiddleware');


router.get('/', (req, res) => {
    // e.g. GET /users/
    res.send(users);
});

router.post('/register', validate(userSchema), (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const token = jwt.sign({}, process.env.JWT_SECRET);
    res.send({ token });
});



router.get('/search', (req, res) => {
    // e.g. GET /users/search?name=s
    const { name } = req.query;

    const filteredUsers = users.filter(user => user.name.includes(name));
    res.send(filteredUsers)
})

router.get('/:id', (req, res) => {
    // e.g. GET /users/7
    const { id } = req.params;
    const user = users.find(user => user.id === id);
    res.send(user);
});

router.post('/', (req, res) => {
    // e.g. POST /users with body {"name": "gidi"}
    const { name } = req.body;
    const user = {
        name,
        id: Date.now().toString(),
    };
    users.push(user);
    res.send(user);
});

module.exports = router;