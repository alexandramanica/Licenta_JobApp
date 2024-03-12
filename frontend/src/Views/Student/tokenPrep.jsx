import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const refreshToken = async () => {
  
    const refreshToken = localStorage.getItem('tokenRefresh');
    //debugger;
    if (!refreshToken) {
      console.log('Refresh token is undefined');
      return;
    }
    console.log('Refresh token:', refreshToken);
    try {
      const res = await axios.post("http://localhost:8001/api/refresh",  
      { token: refreshToken });
      localStorage.setItem('tokenAcces', res.data.accessToken);
      localStorage.setItem('tokenRefresh', res.data.refreshToken);
  
      console.log('Server response:', res.data);
      console.log('New access token:', res.data.accessToken);
      console.log('New refresh token:', res.data.refreshToken);
      return res.data;
    } catch (err) {
      console.log('Error refreshing token:', err);
      return err.message;
    }
  };
  
export const axiosJWT = axios.create()
  
  axiosJWT.interceptors.request.use(
    
    async (config) => {
      let currentDate = new Date();
      const tokenData = getUserDataFromToken();
      console.log(tokenData.exp*1000,"hhhh", currentDate.getTime());
      if (tokenData) {
        if (tokenData.exp * 1000 < currentDate.getTime()) {
          const data = await refreshToken();
          console.log("datataaa",data)
          config.headers["authorization"] = "Bearer " + data.accessToken;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  
  
  export function getUserDataFromToken() {
    const token = localStorage.getItem('tokenAcces');
    
    if (!token) return null;
  
    try {
      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
}