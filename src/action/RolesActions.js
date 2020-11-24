import Axios from "axios";

export const getRoles = () => Axios.get("/users-permissions/roles");
