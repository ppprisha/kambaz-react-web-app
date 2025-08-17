import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
if (!REMOTE_SERVER) throw new Error("VITE_REMOTE_SERVER not set! Check Netlify env variables.");

const axiosWithCredentials = axios.create({
  baseURL: REMOTE_SERVER,
  withCredentials: true,
});

export const USERS_API = "/api/users";

export const signup = async (user: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return data;
};

export const signin = async (credentials: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return data;
};

export const signout = async () => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return data;
};

export const profile = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/profile`);
  return data;
};

export const updateUser = async (user: any) => {
  const { data } = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};
