import axiosClient from '../../../axiosClient';

const getServices = async (
  workshopId?: string,
  languageCode?: string,
  fatherId?: number,
  getAncestors?: boolean,
) => {
  const queryParams = new URLSearchParams({
    workshopId: workshopId ?? '',
    languageCode: languageCode ?? 'it',
    take: '1000',
  });

  if (fatherId !== undefined) {
    queryParams.append('fatherId', fatherId.toString());
  }

  if (getAncestors !== undefined) {
    queryParams.append('getAncestors', getAncestors.toString());
  }

  const res = await axiosClient.get(`services?${queryParams.toString()}`);
  return res.data;
};

export default getServices;
