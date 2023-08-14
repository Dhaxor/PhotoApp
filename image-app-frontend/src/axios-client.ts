import axios, { AxiosInstance } from 'axios';


const axiosClient: AxiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('ACCESS_TOKEN');
	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
})

axiosClient.interceptors.response.use((response) => {
	return response;
}, (error) => {
	if (error.response.status === 401) {
		localStorage.removeItem("ACCESS_TOKEN");
	}
	return Promise.reject(error);
})

export default axiosClient;