import Axios from "axios";

export const login = (data) => Axios.post(`/auth/local`, data);
