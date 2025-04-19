import axiosClient from '../../axiosClient';

const sendConfirmationEmail = async (email: string | undefined) => {
  await axiosClient.post(`auth/send-confirmation-email?email=${email}`);
};

export default sendConfirmationEmail;
