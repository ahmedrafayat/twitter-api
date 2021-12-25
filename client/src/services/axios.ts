import axios from 'axios';

const defaultAxios = axios.create({
  baseURL: 'http://localhost:5000/v1',
  responseType: 'json',
});

export default defaultAxios;
