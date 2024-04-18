const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: Number, require: true },
    userName: { type: String, require: true },
    orderId: { type: Number, require: true },
    productId: { type: Number, require: true },
    productValue: { type: Number, require: true },
    orderDate: { type: String, require: true }
})

const Order = mongoose.model('Order', orderSchema);



module.exports = Order;