const moment = require('moment');
const { formatData } = require('../../main/utils/dateUtils');

jest.mock('moment', () => {
    const originalMoment = jest.requireActual('moment');
    const mockMoment = (date, format) => {
        const m = originalMoment(date, format);
        m.locale = jest.fn();
        return m;
    };
    mockMoment.locale = jest.fn();
    return mockMoment;
})

describe('formatData function', () => {
    test('formats date with "YYYY-MM-DD" format', () => {
        const inputDate = '2024-04-19';
        const expectedFormattedDate = moment(inputDate).format('YYYY-MM-DD');

        const result = formatData(inputDate, 'YYYY-MM-DD');

        expect(result).toEqual(expectedFormattedDate);
    });

    test('formats date with "DD/MM/YYYY" format', () => {
        const inputDate = '2024-04-19';
        const expectedFormattedDate = moment(inputDate).format('DD/MM/YYYY');

        const result = formatData(inputDate, 'DD/MM/YYYY');

        expect(result).toEqual(expectedFormattedDate);
    });

    test('formats date with "MMMM Do YYYY, h:mm:ss a" format', () => {
        const inputDate = '2024-04-19T10:30:00';
        const expectedFormattedDate = moment(inputDate).format('MMMM Do YYYY, h:mm:ss a');

        const result = formatData(inputDate, 'MMMM Do YYYY, h:mm:ss a');

        expect(result).toEqual(expectedFormattedDate);
    });

});
