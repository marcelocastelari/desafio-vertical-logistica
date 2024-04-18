const Order = require('../models/order');

const createOrder = async (data) => {
    return await Order.updateOne(
        { 
            userId: data.userId, 
            orderId: data.orderId, 
            productId: data.productId 
        }, 
        data, 
        { upsert: true }
    );
}

module.exports = { createOrder };