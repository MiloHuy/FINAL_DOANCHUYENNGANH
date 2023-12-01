import DoanInstance from "./doan-instance.svc";

export const API_GUEST_ENDPOINT = {
  GET: {
    get_list_users: "/api/v1/users",
    get_user_info: "/api/v1/users/:id",
    get_user_topic: "/api/v1/topics/users/:id",
  },
};

export const getListUser = async (payload) => {
  const res = DoanInstance.get(API_GUEST_ENDPOINT.GET.get_list_users, {
    params: payload,
  });
  return res;
};

export const getUserInfo = async (id) => {
  const res = DoanInstance.get(
    API_GUEST_ENDPOINT.GET.get_user_info.replace(":id", id),
  );
  return res;
};

export const getUserTopics = async (id, payload) => {
  const res = DoanInstance.get(
    API_GUEST_ENDPOINT.GET.get_user_topic.replace(":id", id),
    { params: payload },
  );
  return res;
};
