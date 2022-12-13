import ajax from "ajax";
const BASE_URL = 'https://randomuser.me';

const client = ajax.create({
    baseURL:'https://randomuser.me/api/'
});

client.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers = {
        Authorization:localStorage.getItem('contact_app_token')
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default class Api {
    static registration(email, password) {
        let auth = {email, password};
        let requestBody = JSON.stringify(auth);

        return request(`${BASE_URL}/api/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        });
    }

    static login(email,password){
        const auth = {email,password};
        return request(`${BASE_URL}/api/login`,{
            method: 'POST',
            headers :{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(auth)
        });
    }

    static getAllContacts(token){
        // return request(`${BASE_URL}/api/contact`,{
        //     headers: {
        //         Authorization:token
        //     }
        // });
        return client.get('contact');
    }

    static addContact(token,contact){
        return request(`${BASE_URL}/api/contact`,{
            method:'POST',
            headers:{
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(contact)
        });
    }

    static removeContactById(token, id){
        return request(`${BASE_URL}/api/contact/${id}`,{
            method:'DELETED',
            headers:{
                Authorization:token
            }
        });
    }

    static updateContact(token, contact){
        return request(`${BASE_URL}/api/contact`,{
            method:'PUT',
            headers:{
                Authorization:token,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(contact)
        });
    }

    static clearAll(token){
        return request(`${BASE_URL}/api/clear`,{
            method:'DELETE',
            headers:{
                Authorization:token
            }
        });
    }
}


function parseJSON(response) {
    return new Promise(resolve => {
        response.json()
            .then(json => resolve({
                status: response.status,
                ok: response.ok,
                json
            }));
    });
}

function request(url, options) {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(parseJSON)
            .then(response => {
                if (response.ok) {
                    return resolve(response.json);
                }
                return reject(response.json);
            }).catch(error => {
            reject({
                message: error.message
            });
        });
    });
}
