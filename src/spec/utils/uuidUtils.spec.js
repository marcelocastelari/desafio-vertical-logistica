const { getUUID } = require('../../main/utils/uuidUtils')
jest.mock('uuid', () => ({ v4: () => '123456789' }));

test('getUUID generates a valid version 4 UUID', () => {
    const uuid = getUUID();
    expect(uuid).toEqual("123456789");
  });