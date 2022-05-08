/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { isAuthenticated } from '../store/auth';
import { setMessage } from '../store/message';

axios.defaults.baseURL = 'http://localhost:8000/api';

let isRefreshAttempted = false;

axios.interceptors.response.use(res => res, async error => {
  if (error.response.status === 401) {
    isAuthenticated.set(false);
    if (!isRefreshAttempted) {
      isRefreshAttempted = true;
      const res: {data: {token: string}, status: number} = await axios.post('refresh', {}, {withCredentials: true}) ;
      if (res.status === 200) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        return axios(error.config);    
      }
    } 
  }
  setMessage({
    body: error.response.data.message,
    type: 'error'
  });
  return error;
});
