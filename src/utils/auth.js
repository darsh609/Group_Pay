import { toast } from "react-toastify";

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  } else {
    toast.info("You are already logged out");
  }
};
// export const login = (token, user) => {
//   localStorage.setItem("token", token);
//   localStorage.setItem("user", JSON.stringify(user));
// };

// export const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
// };

// export const isLoggedIn = () => {
//   return !!localStorage.getItem("token");
// };

export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  console.log("Logged in user:", user);
  return user ? JSON.parse(user) : null;
};