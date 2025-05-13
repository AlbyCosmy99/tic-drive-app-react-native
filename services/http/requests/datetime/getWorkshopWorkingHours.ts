import axiosClient from '../../axiosClient';

const getWorkshopWorkingHours = async (workshopId: string, day: string) => {
  return await axiosClient.get(
    `datetime/workshop/workingHours?workshopId=${workshopId}&day=${day}`,
  );
};

export default getWorkshopWorkingHours;
