import axiosClient from '@/services/http/axiosClient';

const changePasswordAsync = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
) => {
  return await axiosClient.post('auth/change-password', {
    currentPassword,
    newPassword,
    confirmPassword,
  });
};

export default changePasswordAsync;
