const router = require('express').Router();
const { userSchema } = require('../models/user');
const jwt = require('jsonwebtoken');
const { validate } = require('../joiMiddleware');
const { addUser, checkIfUserExists } = require('../queries')

router.get('/', (req, res) => {
    // e.g. GET /users/
    res.send(users);
});

router.post('/register', validate(userSchema), async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const [result] = await checkIfUserExists(email);
    const [userExist] = result;
    
    if (userExist) {
        res.status(400).send('user exist');
        return
    }
    const [response] = await addUser(firstName, lastName, email, password);
    const userId = response.insertId;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    res.send({ token, userId });
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