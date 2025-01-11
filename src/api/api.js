import axios from "axios";

const accessToken = window.localStorage.getItem('access');

const client = axios.create({
  baseURL: 'https://metsenatclub.xn--h28h.uz/api/v1/',
  headers: { 
    Authorization: `Bearer ${accessToken}`
  }
});

export default client;
