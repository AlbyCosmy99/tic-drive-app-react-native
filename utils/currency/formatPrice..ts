const formatPrice = (price: number, discount: number = 0): string => {
  const roundedPrice = parseFloat(price.toFixed(2));
  const discountAmount = (roundedPrice * discount) / 100;
  const finalPrice = roundedPrice - discountAmount;
  return finalPrice.toFixed(2);
};

export default formatPrice;
