import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVE;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollInCourse = async (user: string, course: string) => {
  const { data } = await axios.post(ENROLLMENTS_API, { user, course });
  return data;
};

export const unenrollFromCourse = async (user: string, course: string) => {
  const { data } = await axios.delete(
    `${ENROLLMENTS_API}/user/${user}/course/${course}`
  );
  return data;
};

export const fetchEnrollments = async () => {
  const { data } = await axios.get(ENROLLMENTS_API);
  return data;
};