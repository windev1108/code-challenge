import { API_CONFIG } from '@/constants'
import axios from 'axios'


const axiosIntance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosIntance