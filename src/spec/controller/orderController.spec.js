const orderController = require('../../main/controllers/orderController');

jest.mock('../../main/services/orderService');
const orderService = require('../../main/services/orderService');

test('upload file successfully processes a file and returns a response', async () => {
    const mockedFile = { originalName: 'test.txt', buffer: new Buffer('data') };
    const mockResponse = { message: 'File uploaded successfully' };

    orderService.processFile.mockResolvedValue(mockResponse);

    const req = { file: mockedFile };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await orderController.uploadFile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
});

test('upload file fails to process a file and returns an error', async () => {
    const mockedFile = { originalName: 'test.txt', buffer: new Buffer('data') };
    const mockError = new Error('Failed to process file');

    orderService.processFile.mockRejectedValue(mockError);

    const req = { file: mockedFile };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await orderController.uploadFile(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(mockError.message);
});

test('get orders successfully returns a list of orders', async () => {
    const mockResponse = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];

    orderService.listOrders.mockResolvedValue(mockResponse);

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await orderController.getOrders(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
});

test('get orders fails to return a list of orders', async () => {
    const mockError = new Error('Failed to get orders');

    orderService.listOrders.mockRejectedValue(mockError);

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await orderController.getOrders(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(mockError.message);
})

test('get orders by id successfully returns an order', async () => {
    const mockResponse = { id: 1, name: 'Order 1' };

    orderService.findOrderById.mockResolvedValue(mockResponse);

    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await orderController.getOrdersById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
});

test('get orders by id fails to return an order', async () => {
    const mockError = new Error('Failed to get order');

    orderService.findOrderById.mockRejectedValue(mockError);

    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await orderController.getOrdersById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(mockError.message);
})

test('get orders by data range successfully returns a list of orders', async () => {
    const mockResponse = [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }];

    orderService.findOrdersByDataRange.mockResolvedValue(mockResponse);

    const req = { query: { startDate: '2022-01-01', endDate: '2022-01-31' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await orderController.getOrdersByDataRange(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
});

test('get orders by data range fails to return a list of orders', async () => {
    const mockError = new Error('Failed to get orders by data range');

    orderService.findOrdersByDataRange.mockRejectedValue(mockError);

    const req = { query: { startDate: '2022-01-01', endDate: '2022-01-31' } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await orderController.getOrdersByDataRange(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(mockError.message);
});