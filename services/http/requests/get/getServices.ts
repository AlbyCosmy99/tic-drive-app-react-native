import axiosClient from '../../axiosClient';

const getServices = async (
  workshopId: string,
  languageCode: string,
  fatherId?: number
) => {
  const queryParams = new URLSearchParams({
    workshopId: workshopId ?? '',
    languageCode,
    take: '1000',
  });

  if (fatherId !== undefined) {
    queryParams.append('fatherId', fatherId.toString());
  }

  const res = await axiosClient.get(`services?${queryParams.toString()}`);
  return res.data;
};

export default getServices;
