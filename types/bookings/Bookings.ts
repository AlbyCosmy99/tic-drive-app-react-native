export type Booking = {
  id: number;
  bookingDate: string;
  appointmentDate: string;
  customerId: string;
  customerName: string;
  customerImage: string | null;
  workshopId: string;
  workshopName: string;
  workshopAddress: string;
  finalPrice: number;
  status: number;
  serviceId: number;
  serviceName: string;
  customerCarId: number;
  customerCarName: string;
  customerCarPlate: string;
  customerCarYear: number;
  customerCarLogoUrl: string;
};

export type Bookings = Record<number, Booking[]>;

