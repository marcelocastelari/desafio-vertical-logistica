const orderService = require('../services/orderService')


module.exports = {
    async uploadFile(req, res) {
        try {
            const response = await orderService.processFile(req.file)
            res.status(200).json(response)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}