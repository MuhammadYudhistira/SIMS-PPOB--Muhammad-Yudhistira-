export const formatRupiah = (value) => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const parseRupiah = (value) => {
  return parseInt(value.replace(/\./g, ''), 10) || 0;
};
