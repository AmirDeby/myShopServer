const router = require('express').Router();
const { userSchema } = require('../models/user');
const { loginSchema } = require('../models/login');
const jwt = require('jsonwebtoken');
const { validate } = require('../joiMiddleware');
const { getUser, addUser, checkIfUserExists, login } = require('../queries')
const crypto = require('crypto');
const sendEmail = require('./email');

router.get('/me', async (req, res) => {
    const { userId } = req.user;
    const user = await getUser(userId);
    res.send(user);
});

router.post('/login', validate(loginSchema), async (req, res) => {
    const { email, password } = req.body;
    const [result] = await login(email, encryptPass(password));
    const [user] = result
    if (!user) {
        res.status(404).send('user or password dont match');
        return;
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.send({ token, user });
});

router.post('/register', validate(userSchema), async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const [result] = await checkIfUserExists(email);
    const [userExist] = result;
    if (userExist) {
        res.status(403).send('user exist');
        return
    }
    try {
        const [response] = await addUser(firstName, lastName, email, encryptPass(password));
        sendEmail(email);
        const userId = response.insertId;
        const user = await getUser(userId);
        const token = jwt.sign({ userId }, process.env.JWT_SECRET);

        res.send({ token, userId, user });
    }
    catch (e) {
        return res.status(500).send(e);
    }

});

const encryptPass = (password) => {
    return crypto.createHash('sha256', process.env.SECRET).update(password).digest('hex');
}

module.exports = router;