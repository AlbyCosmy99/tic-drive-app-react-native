import axiosClient from '../../axiosClient';

const getCarModelVersionsByModelId = async (modelId: number) => {
  try {
    const response = await axiosClient.get('cars/model-versions/' + modelId);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export default getCarModelVersionsByModelId;
