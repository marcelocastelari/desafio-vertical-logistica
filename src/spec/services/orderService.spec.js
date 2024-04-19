jest.mock('../../main/repositories/orderRepository');
jest.mock('../../main/models/orderModel');
jest.mock('../../main/utils/fileUtils');
jest.mock('../../main/utils/uuidUtils');
jest.mock('../../main/utils/dateUtils');
jest.mock('../../main/utils/orderUtils');

const orderService = require('../../main/services/orderService');
const { validateFile, readFile, parseRow } = require('../../main/utils/fileUtils');
const orderRepository = require('../../main/repositories/orderRepository');
const { groupOrdersByUser } = require('../../main/utils/orderUtils');

test('processFile handles validation errors during file processing', async () => {
    const mockFile = { originalname: 'test.csv' };
    const mockedError = new Error('Validation error');
  
    validateFile.mockRejectedValueOnce(mockedError); 
  
    await expect(orderService.processFile(mockFile)).rejects.toThrow(mockedError);
});

test('listOrders handles errors during order retrieval', async () => {
    const mockedError = new Error('Cannot convert undefined or null to object');
  
    orderRepository.getOrders.mockRejectedValueOnce(mockedError);
  
    await expect(orderService.listOrders()).rejects.toThrow(mockedError);
});

test('processFile handles order creation success', async () => {
    const mockFile = { originalname: 'test.txt' };
    const mockedSuccess = 'File uploaded succesfully: test.txt'; 
  
    validateFile.mockResolvedValueOnce();
    readFile.mockResolvedValueOnce([['data1', 'data2', 'data3']]); 
    parseRow.mockResolvedValueOnce({});
  
    orderRepository.saveOrder.mockResolvedValueOnce(mockedSuccess);  
  
    await expect(orderService.processFile(mockFile)).resolves.toEqual(mockedSuccess);
});

test('processFile handles file processing errors', async () => {
    const mockFile = { originalname: 'test.txt' };
    const mockedError = new Error('File processing error');

    readFile.mockRejectedValueOnce(mockedError);

    await expect(orderService.processFile(mockFile)).rejects.toThrow(mockedError);
});

test('processFile handles order creation errors', async () => {
    const mockFile = { originalname: 'test.txt' };
    const mockedError = new Error("Cannot read properties of undefined (reading 'flatMap')");

    orderRepository.saveOrder.mockRejectedValueOnce(mockedError);

    await expect(orderService.processFile(mockFile)).rejects.toThrow(mockedError);
});

test('listOrders returns empty array when no orders found', async () => {
    orderRepository.getOrders.mockResolvedValueOnce([]); 
    groupOrdersByUser.mockResolvedValueOnce({});
  
    const result = await orderService.listOrders();
  
    expect(result).toEqual([]);
});
  



  
  
  