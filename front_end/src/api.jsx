import axios from "axios";

const instance = axios.create({
  baseURL: 'https://digit-gorw.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;