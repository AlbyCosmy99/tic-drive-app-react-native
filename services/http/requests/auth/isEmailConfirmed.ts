import axiosClient from '../../axiosClient';

const isEmailConfirmed = async (email: string | undefined) => {
  return await axiosClient.get(`auth/check-email-is-confirmed?email=${email}`);
};

export default isEmailConfirmed;
