export function normalizeDateToApiResponse(date:string) {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

export function normizeDateToDatePicker(date:string) {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
}
