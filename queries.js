const db = require('./sql');

const addUser = (firstName, lastName, email, password) => {
    return db.execute("INSERT INTO `shop`.`users` (`firstName`, `lastName`, `email`, `password`) VALUES(?, ?, ?, ?)",
        [firstName, lastName, email, password])
}
const login = (email, password) => {
    return db.execute('SELECT * FROM shop.users WHERE email=? and password =?', [email, password])
}
const checkIfUserExists = (email) => {
    return db.execute("SELECT * FROM shop.users where email=?", [email]);
}
const getProducts = () => {
    return db.execute('SELECT * FROM shop.products');
}
const getCart = (userId) => {
    return db.execute('SELECT * FROM shop.products inner join shop.customercart on products.id = customercart.productId WHERE userId=?;', [userId]);
}
const deleteItemFromCart = (id, userId) => {
    return db.execute('DELETE FROM `shop`.`customercart` WHERE (`id` = ?) AND userId = ?', [id, userId]);
}
const addItemToCart = (produtId, userId, quantity) => {
    return db.execute('INSERT INTO `shop`.`customercart` (`productId`, `userId`, `quantity`) VALUES (?,?,?)', [produtId, userId, quantity])
}

module.exports = { addUser, checkIfUserExists, login, getProducts, getCart, deleteItemFromCart, addItemToCart };