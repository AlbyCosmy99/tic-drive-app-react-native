import axiosClient from '../../axiosClient';

const getCarModelsByCarMakeId = async (makeId: number) => {
  try {
    const response = await axiosClient.get('cars/models/' + makeId);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export default getCarModelsByCarMakeId;
