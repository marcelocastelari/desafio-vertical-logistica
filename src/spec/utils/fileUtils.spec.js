const fileUtils = require('../../main/utils/fileUtils');

describe('validateFile function', () => {
  test('throws error when no file is provided', async () => {
    await expect(fileUtils.validateFile(null)).rejects.toThrowError('No file was uploaded.');
  });

  test('throws error when file is not a text file', async () => {
    const mockFile = { mimetype: 'image/jpeg', originalname: 'test.jpg' };
    await expect(fileUtils.validateFile(mockFile)).rejects.toThrowError('File is not a text file.');
  });

  test('returns true for valid text file', async () => {
    const mockFile = { mimetype: 'text/plain', originalname: 'test.txt' };
    const result = await fileUtils.validateFile(mockFile);
    expect(result).toBe(true);
  });

});

describe('readFile function', () => {  
    test('returns array of lines for valid file content', async () => {
      const mockFile = { buffer: { toString: () => 'Line 1\nLine 2' }, originalname: 'test.txt' };
      const result = await fileUtils.readFile(mockFile);
      expect(result).toEqual(['Line 1', 'Line 2']);
    });

    test('throws error for empty file content', async () => {
        const mockFile = { buffer: { toString: () => '' }, originalname: 'test.txt' };
        await expect(fileUtils.readFile(mockFile)).toEqual(Error('File is empty.'));
    });
});

describe('parseRow function', () => {
    test('returns parsed data for valid row format', () => {
      const row = '1234567890 User Name 1234567890 9876543210 Product Description';
      const expectedResult = Array[
        '1234567890',
        'User Name',
        '1234567890',
        '9876543210',
        'Product Description',
        undefined
      ];
      const result = fileUtils.parseRow(row);
      expect(result).toEqual([["1234567890", "User Name", "1234567890", "9876543210", "Product Description", undefined]]);
    });
  
    test('returns empty array for invalid row format', () => {
      const row = 'Invalid data';
      const result = fileUtils.parseRow(row);
      expect(result).toEqual([]);
    });
  });
  
  
