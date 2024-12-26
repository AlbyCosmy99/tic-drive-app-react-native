import User from '@/types/User';
import { setToken } from './secureStore/setToken';
import { getToken } from './secureStore/getToken';

const register = async (user: User): Promise<any> => {
    try {
        const response = await fetch("https://ticdrive20241221234140.azurewebsites.net/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password,
                confirmPassword: user.repeatedPassword,
                userType: user.category === 'user' ? 1 : 2
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        throw err;
    }
};

export default register;