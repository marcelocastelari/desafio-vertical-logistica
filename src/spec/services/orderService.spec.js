const orderService = require('../../main/services/orderService');
const { validateFile, readFile, parseRow } = require('../../main/utils/fileUtils');
const orderRepository = require('../../main/repositories/orderRepository');
const { groupOrdersByUser, formatTotals } = require('../../main/utils/orderUtils');

jest.mock('../../main/repositories/orderRepository');
jest.mock('../../main/models/orderModel');
jest.mock('../../main/utils/fileUtils');
jest.mock('../../main/utils/uuidUtils');
jest.mock('../../main/utils/dateUtils');
jest.mock('../../main/utils/orderUtils');

describe('Order Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

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
        const mockedError = new Error("File test.txt is empty");
    
        orderRepository.saveOrder.mockRejectedValueOnce(mockedError);
    
        await expect(orderService.processFile(mockFile)).rejects.toThrow(mockedError);
    });
    
    test('listOrders returns empty array when no orders found', async () => {
        orderRepository.getOrders.mockResolvedValueOnce([]); 
        groupOrdersByUser.mockResolvedValueOnce({});
      
        const result = await orderService.listOrders();
      
        expect(result).toEqual([]);
    });
      
    test('findOrderById returns empty array when order not found', async () => {
        const mockOrderId = '123';
        orderRepository.getOrdersById.mockResolvedValueOnce([]);
      
        const result = await orderService.findOrderById(mockOrderId);
      
        expect(result).toEqual([]);
    });
      
    test('findOrdersByDataRange returns empty array when no orders found', async () => {
        const startDate = new Date('2024-04-01');
        const endDate = new Date('2024-04-20');
        orderRepository.getOrdersByDataRange.mockResolvedValueOnce([]);
      
        const result = await orderService.findOrdersByDataRange(startDate, endDate);
      
        expect(result).toEqual([]);
    });
    
    test('createOrder throws error when order saving fails with specific error', async () => {
        const mockFile = { originalname: 'test.txt' };
        const mockedError = new Error("File test.txt is empty");
    
        validateFile.mockResolvedValueOnce();
        readFile.mockResolvedValueOnce([['data1', 'data2', 'data3']]);
        parseRow.mockResolvedValueOnce({});
        orderRepository.saveOrder.mockRejectedValueOnce(mockedError);
    
        await expect(orderService.processFile(mockFile)).rejects.toThrow(mockedError);
    });
    
      
    test('processFile throws error when parsing all rows results in empty data', async () => {
        const mockFile = { originalname: 'test.txt' };
        const mockedError = new Error("Error on data parsing: Invalid data format");
    
        validateFile.mockResolvedValueOnce();
        readFile.mockResolvedValueOnce([['data1', 'data2', 'data3'], ['data4', 'data5', 'data6']]);
        parseRow.mockResolvedValueOnce({});
    
        await expect(orderService.processFile(mockFile)).rejects.toThrow(mockedError);
    });
    
    test('createOrder throws error when order saving fails', async () => {
        const mockOrders = [
            ['user123', 'John Doe', 'order123', 'product123', 50, '2024-04-19']
        ];
        const mockedError = new Error("File test.txt is empty");
    
        validateFile.mockResolvedValueOnce();
        readFile.mockResolvedValueOnce(mockOrders);
        parseRow.mockResolvedValueOnce({});
        orderRepository.saveOrder.mockRejectedValueOnce(mockedError);
    
        await expect(orderService.processFile({ originalname: 'test.txt' })).rejects.toThrow(mockedError);
    });
    
    test('createOrder throws error when parsing row returns invalid data', async () => {
        const mockFile = { originalname: 'test.txt' };
    
        validateFile.mockResolvedValueOnce();
        readFile.mockResolvedValueOnce([['invalid', 'data', 'format']]);
    
        await expect(orderService.processFile(mockFile)).rejects.toThrow();
    });

    test('listOrders returns empty array when no orders found', async () => {
        orderRepository.getOrders.mockResolvedValueOnce([]);
        groupOrdersByUser.mockResolvedValueOnce({});
    
        const result = await orderService.listOrders();
    
        expect(result).toEqual([]);
    });
    
    test('listOrders calls groupOrdersByUser and formatTotals', async () => {
        const mockRawOrders = [
            { userId: 'user1', orderId: 'order1', productValue: 100 },
            { userId: 'user2', orderId: 'order2', productValue: 150 },
        ];
        const mockGroupedOrders = { user1: { total: 100 }, user2: { total: 150 } };

        orderRepository.getOrders.mockResolvedValueOnce(mockRawOrders);
    
        groupOrdersByUser.mockResolvedValueOnce(mockGroupedOrders);
        formatTotals.mockResolvedValueOnce(mockGroupedOrders);
    
        await orderService.listOrders();
    
        expect(groupOrdersByUser).toHaveBeenCalledWith(mockRawOrders);
        expect(formatTotals).toHaveBeenCalledWith({});
    });
    
    test('findOrderById calls groupOrdersByUser and formatTotals', async () => {
        const mockOrderId = 123;
        const mockRawOrders = [
            { userId: 'user1', orderId: 123, productValue: 100 },
            { userId: 'user2', orderId: 123, productValue: 150 },
        ];
        const mockGroupedOrders = { user1: { total: 100 }, user2: { total: 150 } };

        orderRepository.getOrdersById.mockResolvedValueOnce(mockRawOrders);
    
        groupOrdersByUser.mockResolvedValueOnce(mockGroupedOrders);
        formatTotals.mockImplementationOnce();
    
        await orderService.findOrderById(mockOrderId);
    
        expect(groupOrdersByUser).toHaveBeenCalledWith(mockRawOrders);
        expect(formatTotals).toHaveBeenCalledWith({});
    });

    test('findOrdersByDataRange calls groupOrdersByUser and formatTotals', async () => {
        const mockStartDate = new Date('2024-04-01');
        const mockEndDate = new Date('2024-04-20');
        const mockRawOrders = [
            { userId: 'user1', orderId: 'order1', productValue: 100 },
            { userId: 'user2', orderId: 'order2', productValue: 150 },
        ];
        const mockGroupedOrders = { user1: { total: 100 }, user2: { total: 150 } };

        orderRepository.getOrdersByDataRange.mockResolvedValueOnce(mockRawOrders);

    
        groupOrdersByUser.mockResolvedValueOnce(mockGroupedOrders);
        formatTotals.mockImplementationOnce();
    
        await orderService.findOrdersByDataRange(mockStartDate, mockEndDate);
    
        expect(groupOrdersByUser).toHaveBeenCalledWith(mockRawOrders);
        expect(formatTotals).toHaveBeenCalledWith(mockGroupedOrders);
    });
})



