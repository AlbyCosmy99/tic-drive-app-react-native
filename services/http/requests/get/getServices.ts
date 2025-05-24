import axiosClient from '../../axiosClient';

const getServices = async (workshopId: string, languageCode: string) => {
  const res = await axiosClient.get(
    'services?workshopId=' +
      (workshopId ? workshopId : '') +
      '&languageCode=' +
      languageCode +
      '&take=1000',
  );
  return res.data;
};

export default getServices;
