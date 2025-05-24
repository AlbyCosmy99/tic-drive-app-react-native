const calculateWorkshopDiscount = (price: number, discount: number): string => {
  const priceValue = parseFloat(price.toFixed(2));
  const discountedPrice = priceValue - (priceValue * discount) / 100;
  return discountedPrice.toFixed(2);
};

export default calculateWorkshopDiscount;
