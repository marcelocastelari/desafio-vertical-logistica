const orderService = require('../services/orderService')

module.exports = {
    async uploadFile(req, res) {
        try {
            const response = await orderService.processFile(req.file)
            res.status(200).json(response)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    async getOrders(req, res) {
        try {
            const response = await orderService.listOrders()
            res.status(200).json(response)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    async getOrdersById(req, res) {
        try {
            const response = await orderService.findOrderById(req.params.id)
            res.status(200).json(response)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    async getOrdersByDataRange(req, res) {
        const startDate = req.query.startDate
        const endDate = req.query.endDate

        try {
            const response = await orderService.findOrdersByDataRange(startDate, endDate)
            res.status(200).json(response)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}