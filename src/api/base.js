import axios from 'axios';

const BaseApi = {
    base(params) {
        axios.defaults.baseURL = "http://localhost:5000";
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        const request = {
            url: params.url,
            method: params.method,
            data:
                typeof params.data !== 'undefined'
                    ? JSON.stringify(params.data)
                    : {}
        };

        return new Promise((resolve) => {
            // returning in this format {error, data}
            axios(request).then(
                res => {
                    resolve({error: res.status === 200 ? null : res.status, data: res.data})
                },
                error => {
                    resolve({error: error, data: []});
                }
            );
        })
    }
};

export default BaseApi;