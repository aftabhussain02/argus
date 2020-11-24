import Axios from "axios";
import qs from "qs";

export const fetchKids = () => Axios.get("/user-kids");

export const kidAssignedUsers = (id) => Axios.get(`user-kids/get-users/${id}`);

export const deleteKidAssigned = (id) => Axios.delete(`user-kids/${id}`);

export const fetchAssianableUsers = (kidId) => {
  const query = qs.stringify({
    _where: {
      _or: [
        [{ "role.name_ne": "Kid" }, { user_kids_null: true }],
        [{ "role.name_ne": "Kid" }, { "user_kids.kid_ne": kidId }],
      ],
    },
  });

  return Axios.get(`/users?${query}`);
};

export const createKidAssign = (assignedTo, role, kid) =>
  Axios.post(
    "user-kids",
    { assignedTo, role, kid },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
