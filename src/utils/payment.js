export const getPaymentIcon = (type = '') => {
  const curType = type.toLowerCase().trim();
  switch (curType) {
    case 'cards':
      return 'cards';
    case 'webmoney':
      return 'webmoney';
    default:
      return '';
  }
};
