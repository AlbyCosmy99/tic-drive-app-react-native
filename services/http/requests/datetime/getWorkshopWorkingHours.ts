import axiosClient from '@/services/http/axiosClient';
import { WorkshopWorkingHours } from '@/types/workshops/WorkshopWorkingHours';

export default function getWorkshopWorkingHours(workshopId: string) {
  console.log('Fetching working hours for workshopId:', workshopId);  

  return axiosClient.get<WorkshopWorkingHours[]>(
    '/DateTime/workshop/workingHours',
    {
      params: {
        WorkshopId: workshopId,
      },
    },
  );
}
