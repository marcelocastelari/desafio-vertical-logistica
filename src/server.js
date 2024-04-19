const express = require('express');
const pino = require('pino');
const routes = require('./main/routes');
const { PORT } = require('./config')
const dbConnect = require('./main/config/db');

const server = express();
const logger = pino();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes);

server.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
    dbConnect();
});