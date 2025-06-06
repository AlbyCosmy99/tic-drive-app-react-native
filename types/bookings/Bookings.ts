import {BookingStatus} from './BookingStatus';

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
  workshopImage: {
    id: number;
    userId: string;
    url: string;
    isMainImage: boolean;
  };
  finalPrice: number;
  status: BookingStatus;
  serviceId: number;
  serviceName: string;
  customerCarId: number;
  customerCarName: string;
  customerCarMake: string;
  customerCarModel: string;
  customerCarPlate: string;
  customerCarYear: number;
  customerCarLogoUrl: string;
  pinCode: string;
};

export type Bookings = Record<number, Booking[]>;
