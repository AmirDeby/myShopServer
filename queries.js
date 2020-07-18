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
const getCartItemId = async (userId, productId) => {
    const [result] = await db.execute('SELECT id,quantity FROM shop.customercart WHERE userId = ?  and productId = ?', [userId, productId]);
    if (result.length > 0) {
        return result[0];
    }
    return null;
}
const updateQuantity = (itemId, quantity) => {
    return db.execute('UPDATE shop.customercart SET quantity = ? WHERE id = ?', [quantity, itemId])
}
const searchProduct = (keyword) => {
    return db.execute('SELECT * FROM shop.products WHERE name like ?', [`%${keyword}%`])
}
const addOrder = (userId) => {
    return db.execute('INSERT INTO `shop`.`orders` (`userId`) VALUES (?)', [userId])
}

const insertItemIntoOrder = (orderId, userId) => {
    return db.execute(`INSERT INTO shop.orderitems (orderId,productId,quantity) SELECT ?,productId,quantity from shop.customercart where userId=?`, [orderId, userId])
}

const deleteUserCart = (userId) => {
    return db.execute('DELETE FROM `shop`.`customercart` where userId = ?;', [userId]);

}
const userCartById = (userId) => {
    return db.execute('SELECT * FROM shop.customercart WHERE userId = ?', [userId]);
}

const getOrdersByUser = (userId) => {
    return db.execute('SELECT * FROM shop.orders where userId=?', [userId]);
}
const getOrderDetailssByOrderId = (id) => {
    return db.execute('SELECT * FROM shop.products inner join shop.orderitems On products.id = orderitems.productId where orderId=?', [id])
}
const getOrderDetailsForPdf = (id) => {
    return db.execute('SELECT name,description,salePrice,orderId FROM shop.products inner join shop.orderitems On products.id = orderitems.productId where orderId=?', [id])
}

module.exports = { getOrderDetailsForPdf, getOrderDetailssByOrderId, getOrdersByUser, deleteUserCart, userCartById, addOrder, insertItemIntoOrder, searchProduct, addUser, checkIfUserExists, login, getProducts, getCart, deleteItemFromCart, addItemToCart, getCartItemId, updateQuantity };