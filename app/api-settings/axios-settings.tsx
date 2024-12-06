import axios from 'axios';

export const setupAxiosInterceptors = (token: string) => {
  axios.defaults.headers.common['Authorization'] = token
    ? `Bearer ${token}`
    : '';
};
