import axiosClient from '@/services/http/axiosClient';

const getWorkshopWithServiceDetails = (
  workshopId: string,
  serviceId: number,
) => {
  return axiosClient.get(
    'workshops?workshopId=' + workshopId + '&serviceId=' + serviceId,
  );
};

export default getWorkshopWithServiceDetails;
