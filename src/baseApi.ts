import axios, { AxiosRequestConfig, Method } from 'axios';

const apiUrl = 'http://localhost:3001'

const axiosInstance = axios.create({
    // You can set base URL and other default config here
    baseURL: apiUrl,
    headers: {
        Authorization:`Bearer ${localStorage.getItem('accessToken')}`
    },
});

const makeRequest = async<T=any> (
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
) => {
    try {        
        const response = await axiosInstance.request<T>({
            method,
            url,
            data,
            ...config,
        });
        
        return response;
    } catch (error) {        
        // Handle or throw error
        if (axios.isAxiosError(error) && error.response) {
            
            // Axios error with response (e.g., 4xx, 5xx response)
            throw error.response.data;
        } else {
            // Other errors (e.g., network error, timeout)
            throw error;
        }
    }
};

export default makeRequest;
