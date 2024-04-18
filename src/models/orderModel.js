const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
    uuid: { type: String, require: true, unique: true },
    userId: { type: Number },
    userName: { type: String },
    orderId: { type: Number },
    productId: { type: Number },
    productValue: { type: Number },
    orderDate: { type: String }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;