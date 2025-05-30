import axiosClient from "@/services/http/axiosClient"

const bookAService = (
  token: string,
  workshopId: string,
  serviceId: number,
  carId: number,
  price: number,
  appointmentDate: Date
) => {
  return axiosClient.post(
    "bookings",
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
    }
  );
};

export default bookAService;
