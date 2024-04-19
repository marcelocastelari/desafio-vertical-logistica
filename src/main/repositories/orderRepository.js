const Order = require('../models/orderModel');

const saveOrder = async (orderData) => {
    return Order.insertMany(orderData)
};

const getOrders = async () => {
    return Order.find({});
}

const getOrdersById = async (id) => {
    return Order.find({ orderId: id });
}

const getOrdersByDataRange = async (startDate, endDate) => {
    return Order.find({ orderDate: { $gte: startDate, $lte: endDate } });
}
  
module.exports = { saveOrder, getOrders, getOrdersById, getOrdersByDataRange };