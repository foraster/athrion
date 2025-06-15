import { $host } from ".";

export const registration = async (email, password, firstName, lastName, isNewsletter) => {
  await $host.post("api/user/registration", {
    email,
    password,
    firstName,
    lastName,
    isNewsletter
  });
};

export const login = async (email, password, isRemember = false) => {
  await $host.post("api/user/login", {
    email,
    password,
    isRemember
  });
};

export const logout = async () => {
  await $host.post("api/user/logout");
};


export const check = async () => {
  try {
    const { data } = await $host.get("api/user/auth");
    return data; 
  } catch (error) {
    console.error("Check failed:", error?.response?.data || error.message);
    return null;
  }
};

export const fetchUsers = async () => {
  try {
    const { data } = await $host.get("api/user/users");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteUser = async () => {
  await $host.post("api/user/delete-account");
};