import axiosClient from '@/services/http/axiosClient';
import Car from '@/types/Car';

const registerCarAsync = async (
  token: string,
  languageCode: string,
  carSelected?: Car,
  userName?: string,
) => {
  return await axiosClient.post(
    'cars',
    {
      name:
        languageCode === 'it'
          ? `La ${carSelected?.make} ${carSelected?.model} di ${userName}`
          : `${userName}'s ${carSelected?.make} ${carSelected?.model}`,
      plate: carSelected?.plateNumber,
      make: carSelected?.make,
      model: carSelected?.model,
      year: carSelected?.year,
      fuelType: carSelected?.fuel,
      transmissionType: carSelected?.transmission,
      engineDisplacement: carSelected?.engineDisplacement,
      km: carSelected?.mileage,
      cv: carSelected?.powerCV,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export default registerCarAsync;
