import axiosClient from '@/services/http/axiosClient';
import {WorkshopWorkingHours} from '@/types/workshops/WorkshopWorkingHours';

export default function getWorkshopWorkingHours(
  workshopId: string,
  dayName?: string,
) {
  const params: any = {WorkshopId: workshopId};

  if (dayName) {
    params.day = dayName;
  }

  return axiosClient.get<WorkshopWorkingHours[]>(
    '/DateTime/workshop/workingHours',
    {
      params,
    },
  );
}
