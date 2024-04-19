const pino = require('pino');
const logger = pino();
const { saveOrder, getOrders, getOrdersById, getOrdersByDataRange } = require('../repositories/orderRepository');
const Order = require('../models/orderModel');
const { validateFile, readFile, parseRow } = require('../utils/fileUtils');
const { getUUID } = require('../utils/uuidUtils');
const { formatData } = require('../utils/dateUtils');
const { groupOrdersByUser, formatTotals } = require('../utils/orderUtils');

const createOrder = async (orders) => {
    for(const order of orders) {
        const uuid = getUUID();
        const newOrder = new Order({
            uuid: uuid,
            userId: order[0],
            userName: order[1],
            orderId: order[2],
            productId: order[3],
            productValue: order[4],
            orderDate: formatData(order[5], 'YYYY-MM-DD')
        });

        await saveOrder(newOrder);
        logger.info(`[orderService][createOrder] Order created: ${newOrder.orderId}`);

    }

}

module.exports = {
    async processFile(file) {

        await validateFile(file);

        logger.info(`[orderService][processFile] File uploaded: ${file.originalname}, processing...`);
        const rows = await readFile(file);

        if(!rows) {
            throw new Error(`File ${file.originalname} is empty`);
        }

        const fields = rows.flatMap(row => {
            const parsedData = parseRow(row);
            if (!parsedData) {
                throw new Error(`Error on data parsing: Invalid data format`);
            }
            return parsedData;
        });


        await createOrder(fields);

        return(`File uploaded succesfully: ${file.originalname}`);
    },

    async listOrders() {
        const rawOrders = await getOrders();
        if (!rawOrders.length) {
            return [];
        }

        let groupOrders = await groupOrdersByUser(rawOrders)
        formatTotals(groupOrders);

        return Object.values(groupOrders);
    },

    async findOrderById(id) {
        const rawOrders = await getOrdersById(id);
        if (!rawOrders.length) {
            return [];
        }
        let groupOrders = await groupOrdersByUser(rawOrders)
        formatTotals(groupOrders);

        return Object.values(groupOrders);
    },

    async findOrdersByDataRange(startDate, endDate) {
        const rawOrders = await getOrdersByDataRange(startDate, endDate);
        if (!rawOrders.length) {
            return [];
        }
        let groupOrders = await groupOrdersByUser(rawOrders)
        formatTotals(groupOrders);

        return Object.values(groupOrders);
    }
}