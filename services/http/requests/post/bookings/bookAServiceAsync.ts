import axiosClient from '@/services/http/axiosClient';

const bookAServiceAsync = (
  token: string,
  workshopId: string,
  serviceId: number,
  carId: number,
  price: number,
  appointmentDate: Date,
) => {
  return axiosClient.post(
    'bookings',
    {
      workshopId,
      serviceId,
      customerCarId: carId,
      finalPrice: price,
      appointmentDate,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export default bookAServiceAsync;
