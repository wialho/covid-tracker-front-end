import { ConvertDatabaseFieldToDisplayString, ConvertZuluDateToDisplayableDate } from "./StringFormatting"

test('field formatted correctly', () => {
    expect(ConvertDatabaseFieldToDisplayString('test_stuff')).toBe('Test Stuff');
    expect(ConvertDatabaseFieldToDisplayString('singleword')).toBe('Singleword');
});

test('returns correct formatted date', () => {
    expect(ConvertZuluDateToDisplayableDate('1111T2222')).toBe('1111');
    expect(ConvertZuluDateToDisplayableDate('11112222')).toBe('11112222');
});