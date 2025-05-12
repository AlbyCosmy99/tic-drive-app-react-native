import axiosClient from '../../axiosClient';

const getCarsMakes = async () => {
  const res = await axiosClient.get('cars/makes');
  return res.data;
};

export default getCarsMakes
