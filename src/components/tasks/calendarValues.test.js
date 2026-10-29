import { localDate, taskPayload } from './calendarValues';
test('calendar days and hours survive JSON serialization without UTC shifts', () => {
  const value = taskPayload({ name: 'Example', date: '2026-10-29', startHour: '10:00', endHour: '11:00' }, 1);
  const serialized = JSON.parse(JSON.stringify(value));
  expect(serialized.date.substring(0,10)).toBe('2026-10-29');
  expect(serialized.startHour.substring(11,16)).toBe('10:00');
  expect(localDate(new Date(2026,9,29,0,0))).toBe('2026-10-29');
});
test('editing keeps the persisted identity and creation date', () => {
  const value = taskPayload({date:'2026-10-29',startHour:'10:00',endHour:'11:00'}, 1, {id:42,createdBy:2,createdAt:'2026-10-01'});
  expect(value.id).toBe(42); expect(value.createdBy).toBe(2); expect(value.createdAt).toBe('2026-10-01T00:00:00Z');
});
