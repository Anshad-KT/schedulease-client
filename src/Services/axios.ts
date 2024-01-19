import axios from 'axios'
//const BASE_URL = process.env.REACT_APP_BASE_URL as string;
 const BASE_URL = 'http://scheduleease.com';

export const api = axios.create({
    baseURL: BASE_URL,
  });

  api.interceptors.request.use(
    (config)=>{
      let token=localStorage.getItem('user')
    
      
      
      if(token) config.headers['accessToken']=token
     
      
      
      return config
    },
    (error) => {

      return Promise.reject(error)
    }
  )



