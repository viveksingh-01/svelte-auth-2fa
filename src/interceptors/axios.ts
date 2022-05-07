/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';

let isRefreshAttempted = false;

axios.interceptors.response.use(res => res, async error => {
  if (!isRefreshAttempted) {
    isRefreshAttempted = true;
    if (error.response.status === 401) {
      const res: {data: {token: string}, status: number} = await axios.post('refresh', {}, {withCredentials: true}) ;
      if (res.status === 200) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }
    } 
    return axios(error.config);    
  }
  return error;
})
