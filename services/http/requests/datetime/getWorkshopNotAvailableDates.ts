import axiosClient from '../../axiosClient';

const getWorkshopNotAvailableDates = async (workshopId: string) => {
  return await axiosClient.get(
    'datetime/workshop/notAvailableDays?workshopId=' + workshopId,
  );
};

export default getWorkshopNotAvailableDates;
