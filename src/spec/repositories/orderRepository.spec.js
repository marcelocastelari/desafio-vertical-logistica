const Order = require('../../main/models/orderModel');
const orderRepository = require('../../main/repositories/orderRepository');

jest.mock('../../main/models/orderModel');

describe('Order Repository', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('saveOrder function', async () => {
        const mockOrderData = [
            {
                uuid: '123',
                userId: 'user123',
                userName: 'John Doe',
                orderId: 'order123',
                productId: 'product123',
                productValue: 50,
                orderDate: '2024-04-19'
            }
        ];

        Order.insertMany.mockResolvedValue(mockOrderData);

        const result = await orderRepository.saveOrder(mockOrderData);

        expect(result).toEqual(mockOrderData);
        expect(Order.insertMany).toHaveBeenCalledWith(mockOrderData);
    });

    test('getOrders function', async () => {
        const mockOrders = [
            {
                uuid: '123',
                userId: 'user123',
                userName: 'John Doe',
                orderId: 'order123',
                productId: 'product123',
                productValue: 50,
                orderDate: '2024-04-19'
            }
        ];

        Order.find.mockResolvedValue(mockOrders);

        const result = await orderRepository.getOrders();

        expect(result).toEqual(mockOrders);
        expect(Order.find).toHaveBeenCalledWith({});
    });

    test('getOrdersById function', async () => {
        const mockOrderId = 'order123';
        const mockOrders = [
            {
                uuid: '123',
                userId: 'user123',
                userName: 'John Doe',
                orderId: 'order123',
                productId: 'product123',
                productValue: 50,
                orderDate: '2024-04-19'
            }
        ];

        Order.find.mockResolvedValue(mockOrders);

        const result = await orderRepository.getOrdersById(mockOrderId);

        expect(result).toEqual(mockOrders);
        expect(Order.find).toHaveBeenCalledWith({ orderId: mockOrderId });
    });

    test('getOrdersByDataRange function', async () => {
        const startDate = new Date('2024-04-01');
        const endDate = new Date('2024-04-20');
        const mockOrders = [
            {
                uuid: '123',
                userId: 'user123',
                userName: 'John Doe',
                orderId: 'order123',
                productId: 'product123',
                productValue: 50,
                orderDate: '2024-04-19'
            }
        ];

        Order.find.mockResolvedValue(mockOrders);

        const result = await orderRepository.getOrdersByDataRange(startDate, endDate);

        expect(result).toEqual(mockOrders);
        expect(Order.find).toHaveBeenCalledWith({ orderDate: { $gte: startDate, $lte: endDate } });
    });
});
