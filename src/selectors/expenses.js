// filter expenses by filters and return expenses
import moment from 'moment';

export default (expenses, {
  text, sortBy, startDate, endDate
}) => expenses.filter((expense) => {
  const createdAtMoment = moment(expense.createdAt);
  const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
  const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
  const textMatch = text === '' || expense.description.toLowerCase().includes(text.toLowerCase());
  return startDateMatch && endDateMatch && textMatch;
}).sort((a, b) => {
  if (sortBy === 'date') {
    // If a is created before b then a goes first else b goes first
    return a.createdAt < b.createdAt ? 1 : -1;
  }
  // if a is less then it goes after b
  return a.amount < b.amount ? -1 : 1;
});
