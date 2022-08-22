import axios from "axios";
import { serverURL } from "./serverUrl";

const api = axios.create({baseURL:serverURL});

api.interceptors.request.use(
    function(config){
        console.log('in process');
        let admin = JSON.parse(localStorage.getItem('adminData'))
        console.log(admin);
        const token = admin.admintoken
        console.log(token);
        if(token){
            config.headers['Authorization'] = token
        }
        console.log(config);
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)
export default api;