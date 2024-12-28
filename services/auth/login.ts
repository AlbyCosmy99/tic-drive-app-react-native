import User from '@/types/User';

export const login = async (user: User): Promise<any> => {
    try {
        const response = await fetch("https://ticdrive20241221234140.azurewebsites.net/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
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