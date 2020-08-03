import { differenceInCalendarDays } from 'date-fns';

export function getValueLocation(price, returnDateString, initialDateString) {
  const value =
    differenceInCalendarDays(
      new Date(returnDateString),
      new Date(initialDateString)
    ) * price;
  return (Math.round(value * 100) / 100).toFixed(2);
}
