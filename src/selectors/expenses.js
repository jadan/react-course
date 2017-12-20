export default (expenses, {
  text, sortBy, startDate, endDate
}) => expenses.filter((expense) => {
  const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
  const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
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