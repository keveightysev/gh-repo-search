export const paginate = (page, array) => {
  if (page < 5) return array.slice(0, 9);
  if (page > array.length - 6) {
    return array.slice(array.length - 11, array.length);
  }
  const min = page - 5;
  const max = page + 5;
  return array.slice(min, max);
};
