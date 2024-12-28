import User from '@/types/User';
import axiosClient from '../http/axiosClient';

const register = async (user: User): Promise<any> => {
    try {
        const response =await axiosClient.post('auth/register', {
            name: user.name,
            email: user.email,
            password: user.password,
            confirmPassword: user.repeatedPassword,
            userType: user.category === 'user' ? 1 : 2
        })
        return response.data
    } catch (err) {
        throw err;
    }
};

export default register;