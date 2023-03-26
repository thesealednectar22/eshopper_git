import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { useStateValue } from '../components/Context/StateProvider';


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

const MAX_REFRESH_ATTEMPTS = 3;
let refreshAttempts = 0;
let data;

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response)
    const a = response.config.data
    data = JSON.parse(a)
    localStorage.setItem("email",data.email)
    localStorage.getItem('email')
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refresh");
      try {
        refreshAttempts++;
        if (refreshAttempts > MAX_REFRESH_ATTEMPTS) {
          const navigate = useNavigate();
          console.log("Max refresh attempts exceeded");
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          navigate('/login/')
          return Promise.reject(error);
        }
        const response = await axiosInstance.post('/refreshtoken/', { "refresh": refreshToken });
        const newAccessToken = response.data.access;
        localStorage.setItem("access", newAccessToken);
        const originalRequest = error.config;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        const navigate = useNavigate();
        console.log("Refresh token failed", error);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate('/login/')
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;