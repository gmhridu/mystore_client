import axios from 'axios';
import React from 'react';
import { useMemo } from 'react';


const useAxiosCommon = () => {
    const axiosInstance = useMemo(()=>{
        return axios.create({
          baseURL: import.meta.env.VITE_BASE_URL,
        });
    },[])
    return axiosInstance;
};

export default useAxiosCommon;