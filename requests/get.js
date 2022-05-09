const endpoint = 'http://localhost:3000/api/'
import axios from 'axios';

export const get = async (path, token) => {
    const headers = {
        'token': token
    };

    const response = await axios({
        method: 'GET',
        url: endpoint + path,
        headers: headers
    });
    return response;
}