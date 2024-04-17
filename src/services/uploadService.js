const pino = require('pino');
const logger = pino();

const readFile = (file)  => {
    const data = file.buffer.toString('utf-8');

    if(!data) {
        logger.info(`[uploadService][readFile] File ${file.originalname} is empty.`);
        throw new Error("File is empty.");
    }

    const rows = data.split('\n');
    return rows;
}

module.exports = {
    processFile(file) {
        if(!file) {
            logger.info(`[uploadService][processFile] No file was uploaded.`);
            throw new Error("No file was uploaded.")
        }
    
        if(file.mimetype !== 'text/plain') {
            logger.info(`[uploadService][processFile] File ${file.originalname} is not a text file.`);
            throw new Error("File is not a text file.");
        }
    
        logger.info(`[uploadService][processFile] File uploaded: ${file.originalname}, processing...`);
        const data = readFile(file);
        return(`File uploaded ${file.originalname}`);
    }
}