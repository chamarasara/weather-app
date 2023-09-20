import axios from "axios";

const nodeService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_CAFE_NODE_SERVICE,
  headers: {
    'Content-Type': 'application/json',
  },
});

const instance = {
  nodeService,
};

export default instance;
