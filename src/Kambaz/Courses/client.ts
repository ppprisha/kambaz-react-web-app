import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
if (!REMOTE_SERVER) throw new Error("VITE_REMOTE_SERVER not set! Check Netlify env variables.");

const axiosClient = axios.create({
  baseURL: REMOTE_SERVER,
});

export const fetchAllCourses = async () => {
  const { data } = await axiosClient.get("/api/courses");
  return data;
};

