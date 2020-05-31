const db = require('./sql');

const addUser = (firstName, lastName, email, password) => {
    return db.execute("INSERT INTO `shop`.`users` (`firstName`, `lastName`, `email`, `password`) VALUES(?, ?, ?, ?)",
        [firstName, lastName, email, password])
}
const checkIfUserExists = (email) => {
    return db.execute("SELECT * FROM shop.users where email=?", [email]);
}

module.exports = { addUser, checkIfUserExists }