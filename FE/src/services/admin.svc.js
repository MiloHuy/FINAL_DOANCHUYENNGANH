import DoanInstance from "./doan-instance.svc";

export const API_ADMIN_ENDPOINT = {
  GET: {
    all_accounts: "/api/v1/admin/users",
  },
  POST: {
    create_account: "/api/v1/admin/users",
  },
  DELETE: {
    delete_account: "/api/v1/admin/users/:id",
  },
  PATCH: {
    update_password: "/api/v1/admin/users/:id",
  },
};

export const createAccount = async (payload) => {
  const res = DoanInstance.post(
    API_ADMIN_ENDPOINT.POST.create_account,
    payload,
  );
  return res;
};

export const getAllAccounts = async (payload) => {
  const res = DoanInstance.get(API_ADMIN_ENDPOINT.GET.all_accounts, {
    params: payload,
  });
  return res;
};

export const deleteAccounts = async (id) => {
  console.log("Id: " + id);
  const res = DoanInstance.delete(
    API_ADMIN_ENDPOINT.DELETE.delete_account.replace(":id", id),
  );
  return res;
};

export const updatePassword = async (id, payload) => {
  const res = DoanInstance.patch(
    API_ADMIN_ENDPOINT.PATCH.update_password.replace(":id", id),
    payload,
  );
  return res;
};
