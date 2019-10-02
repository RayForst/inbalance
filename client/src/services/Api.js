import axios from 'axios';
import store from '../store';

export default () => {
  const { token } = store.state;
  const config = {
    baseURL: 'http://192.168.1.46:3000/',
  };

  if (token) {
    config.headers = {
      Authorization: token,
    };
  }

  return axios.create(config);
};
