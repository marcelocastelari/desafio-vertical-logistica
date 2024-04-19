const groupOrdersByUser = async (rawOrders) => {
    return rawOrders.reduce((acc, order) => {
        const user_id = order.userId;
        const name = order.userName;
        const validOrders = order.orderId ? [order] : [];

        acc[user_id] = acc[user_id] || { user_id, name, orders: [] };
        acc[user_id].orders = acc[user_id].orders || [];

        for (const order of validOrders) {
            const order_id = order.orderId;
            acc[user_id].orders[order_id] = acc[user_id].orders[order_id] || {
                order_id: order_id,
                total: 0,
                date: order.orderDate,
                products: []
            };

            acc[user_id].orders[order_id].total += order.productValue;
            acc[user_id].orders[order_id].date = order.orderDate;
            acc[user_id].orders[order_id].products.push(...validOrders.map(order => ({
                product_id: order.productId,
                value: order.productValue,
            })));
        }

        return acc;
    }, {});
}

const formatTotals = (groupOrders) => {
    Object.values(groupOrders).forEach(user => {
        user.orders = user.orders.filter(order => order !== null);
        user.orders.forEach(order => {
            order.total = String(order.total.toFixed(2));
            order.products.forEach(product => product.value = String(product.value.toFixed(2)));
        });
    });
}


module.exports = { groupOrdersByUser, formatTotals };