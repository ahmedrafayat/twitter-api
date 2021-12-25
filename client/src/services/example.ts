import axios from './axios';

export const getExample = async () => {
  return await (await axios.get('/example')).data;
};
