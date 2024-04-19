const orderUtils = require("../../main/utils/orderUtils");

describe("groupOrdersByUser function", () => {
  test("groups orders by user and order id", async () => {
    const rawOrders = [
        {
            uuid: 'xpto',
            userId: 13,
            userName: 'Josh',
            orderId: 123,
            productId: 2,
            productValue: 1195.64,
            orderDate: '2024-04-19',
            __v: 0
        }
    ];

    const expectedResult = {
      13: { 
        name: "Josh", 
        orders: [
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            {
               "date": "2024-04-19",
                "order_id": 123,
                "products": [{
                    "product_id": 2,
                    "value": 1195.64,
               }],
                "total": 1195.64,
            },
            ],
        "user_id": 13 },
    };

    const result = await orderUtils.groupOrdersByUser(rawOrders);
    expect(result).toEqual(expectedResult);
  });

  test("returns empty object for empty input", async () => {
    const rawOrders = [];
    const result = await orderUtils.groupOrdersByUser(rawOrders);
    expect(result).toEqual({});
  });

});

describe('FormatTotals function', () => {
    test('formats totals and product values to strings with two decimal places', () => {
        const groupOrders = {
          user1: {
            user_id: 'user1',
            name: 'John Doe',
            orders: [
              {
                order_id: 'order1',
                total: 100.12345678,
                date: '2024-04-20',
                products: [{ product_id: 'prod1', value: 50.78901234 }],
              },
            ],
          },
        };
      
        const expectedResult = {
          user1: {
            user_id: 'user1',
            name: 'John Doe',
            orders: [
              {
                order_id: 'order1',
                total: '100.12',
                date: '2024-04-20',
                products: [{ product_id: 'prod1', value: '50.79' }],
              },
            ],
          },
        };
      
        orderUtils.formatTotals(groupOrders);
        expect(groupOrders).toEqual(expectedResult);
      });
      
})
