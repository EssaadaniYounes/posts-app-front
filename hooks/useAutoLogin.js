import { post } from '../requests/post';

export const useAutoLogin = async () => {
    const existingUser = JSON.parse(localStorage.getItem('user')).payload;
    if (existingUser) {
        const response = await post('user/login', existingUser);
        return { user: response.data.data };
    }
    return {};
}
