import vehicleRegistrationOptions from '@/constants/VehicleRegistrationOptions';

export const carKeys = vehicleRegistrationOptions.map(elem => elem.keyString);

export type CarKeys = (typeof carKeys)[number];
