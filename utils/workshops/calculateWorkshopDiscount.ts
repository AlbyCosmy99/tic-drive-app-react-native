const calculateWorkshopDiscount = (price: string, discount: number) => {
  const priceValue = parseInt(price?.slice(1));
  return priceValue - (priceValue * discount) / 100;
};

export default calculateWorkshopDiscount;
