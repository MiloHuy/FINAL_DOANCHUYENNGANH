import DoanInstance from "./doan-instance.svc";

export const API_USER_ENDPOINT = {
  GET: {
    my_info: "/api/v1/users/me",
    get_topics: "/api/v1/users/topics",
  },
  POST: {
    create_topic: "/api/v1/users/topics",
    upload_image: "/api/v1/uploads",
    edit_info: "/api/v1/users",
    logout: "/api/v1/auth/logout",
  },
  DELETE: {
    delete_topics: "/api/v1/users/topics/:id",
  },
  PUT: {
    update_topic: "/api/v1/users/topics/:id",
  },
};

export const getUserInfo = async () => {
  const res = DoanInstance.get(API_USER_ENDPOINT.GET.my_info);
  return res;
};

export const getListTopicUser = async (payload) => {
  const res = DoanInstance.get(API_USER_ENDPOINT.GET.get_topics, {
    params: payload,
  });
  return res;
};

export const createTopicUser = async (payload) => {
  const res = DoanInstance.post(API_USER_ENDPOINT.POST.create_topic, payload);
  return res;
};

export const deleteTopicUser = async (id) => {
  const res = DoanInstance.delete(
    API_USER_ENDPOINT.DELETE.delete_topics.replace(":id", id),
  );
  return res;
};

export const updateTopicUser = async (id, payload) => {
  const res = DoanInstance.put(
    API_USER_ENDPOINT.PUT.update_topic.replace(":id", id),
    payload,
  );
  return res;
};

export const updateInfoUser = async (payload) => {
  const res = DoanInstance.post(API_USER_ENDPOINT.POST.edit_info, payload);
  return res;
};

export const logoutUser = async () => {
  const res = DoanInstance.post(API_USER_ENDPOINT.POST.logout);
  return res;
};

export const uploadImage = async (payload) => {
  const res = DoanInstance.post(
    API_USER_ENDPOINT.POST.upload_image,
    payload,
    {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    },
    {
      onUploadProgress: (progressEvent) => {
        console.log(
          "upload progress " +
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
            "%",
        );
      },
    },
  );
  return res;
};
