import Service from '@/types/Service';

export default interface ServicesState {
  servicesChoosenByUsers: Service[];
  servicesChoosenByWorkshops: Service[];
  areServicesOn: boolean;
  lastServiceSelectedFromFilter: Service | undefined;
}
