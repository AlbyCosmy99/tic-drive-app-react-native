const calculateWorkshopDiscount = (price: number, discount: number) => {
  const priceValue = parseFloat(price.toFixed(2));
  return priceValue - (priceValue * discount) / 100;
};

export default calculateWorkshopDiscount;
