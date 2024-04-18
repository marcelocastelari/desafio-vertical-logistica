const Order = require('../models/orderModel');

const createOrder = async (orderData) => {
    const newOrder = new Order(orderData);
    await newOrder.save();
    return newOrder;
};
  
module.exports = createOrder;