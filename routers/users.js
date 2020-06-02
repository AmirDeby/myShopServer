const router = require('express').Router();
const { userSchema } = require('../models/user');
const { loginSchema } = require('../models/login');
const jwt = require('jsonwebtoken');
const { validate } = require('../joiMiddleware');
const { addUser, checkIfUserExists, login } = require('../queries')

router.get('/', (req, res) => {
    // e.g. GET /users/
    res.send(users);
});

router.post('/login', validate(loginSchema), async (req, res) => {
    const { email, password } = req.body;
    const [result] = await login(email, password);
    const [user] = result
    if (!user) {
        res.status(404).send('user or password dont match');
        return;
    }
    const userId = user.id
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    res.json({ token,message: `Hello ${user.firstName}`});
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

module.exports = router;