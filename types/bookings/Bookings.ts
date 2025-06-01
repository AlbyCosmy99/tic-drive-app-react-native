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
  workshopImage: {id: number, userId: string, url: string, isMainImage: boolean}
  finalPrice: number;
  status: string;
  serviceId: number;
  serviceName: string;
  customerCarId: number;
  customerCarName: string;
  customerCarPlate: string;
  customerCarYear: number;
  customerCarLogoUrl: string;
};

export type Bookings = Record<number, Booking[]>;

