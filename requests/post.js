const endpoint = 'http://localhost:3000/api/'
import axios from 'axios';

export const post = async (path, payload, token) => {
    const headers = {
        'token': token ? token : '',
    }
    let response;
    await axios({
        method: 'POST',
        url: endpoint + path,
        headers: headers,
        data: payload
    }).then(res => response = res)
        .catch(error => { response = error.response }).finally(() => { });
    return response;
}