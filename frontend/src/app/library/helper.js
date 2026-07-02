 import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
 const notify = (msg,flag) => toast(msg,{type : flag ? 'success': 'error'});


function createSlug(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
  .replace(/-+/g, '-');        
}

const AxiosAPI = axios.create({
  baseURL : process.env.NEXT_PUBLIC_BASE_URL 
})

// utils/getCookie.js
function getCookies(name) {
  if (typeof document == 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length == 2) {
    return parts.pop().split(';').shift();
  }
  
  return null;
}


export {createSlug ,notify,AxiosAPI,getCookies}