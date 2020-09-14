import axios from "axios";

import { getAuthToken } from "../libs/cookie";

const API_URL = "/api";

const client = axios.create({
  baseURL: API_URL,
});

export const fetcher = (url: string) => client.get(url).then((res) => res.data);

export const setDefaultHeaders = () => {
  const token = getAuthToken();
  if (token) {
    client.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
    };
  }
};

export default client;
