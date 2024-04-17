const uploadService = require('../services/uploadService')


module.exports = {
    async uploadFile(req, res) {
        try {
            const response = await uploadService.processFile(req.file)
            res.status(200).json(response)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}