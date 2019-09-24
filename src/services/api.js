import axios from 'axios'

const api = axios.create({
    baseURL:'https://weather.cit.api.here.com'
});

export default api