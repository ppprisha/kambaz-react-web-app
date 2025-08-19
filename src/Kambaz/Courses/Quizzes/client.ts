import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const findQuizzesForCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return data;
};

export const findQuizById = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return data;
};

export const deleteQuiz = async (quizId: string) => {
    const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return data;
};

export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};