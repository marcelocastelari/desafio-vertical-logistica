const pino = require('pino');
const logger = pino();

const regex = /(\d{10})\s+(.*?)\s*(\d{10})\s*(\d{10})\s*(.*?)(?:\s*(\d{8}))?$/g;

const validateFile = async (file) => {
    if (!file) {
        logger.info(`[orderService][validateFile] No file was uploaded.`);
        throw new Error("No file was uploaded.")
    }

    if (file.mimetype !== 'text/plain') {
        logger.info(`[orderService][validateFile] File ${file.originalname} is not a text file.`);
        throw new Error("File is not a text file.");
    }

    return true;
}

const readFile = (file) => {
    const data = file.buffer.toString('utf-8');

    if (!data) {
        logger.info(`[orderService][readFile] File ${file.originalname} is empty.`);
        return new Error("File is empty.");
    }

    const rows = data ? data.split('\n') : [];
    return rows;
}

const parseRow = (row) => {
    return [...row.matchAll(regex)]
        .map(match => match.slice(1))
}

module.exports =
{
    validateFile,
    readFile,
    parseRow
}