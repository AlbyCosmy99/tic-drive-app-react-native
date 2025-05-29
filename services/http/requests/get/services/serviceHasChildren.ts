import axiosClient from '@/services/http/axiosClient';

const serviceHasChildren = async (serviceId?: number) => {
  const res = await axiosClient.get('services/serviceHasChildren/' + serviceId);
  return res.data.serviceHasChildren;
};

export default serviceHasChildren;
