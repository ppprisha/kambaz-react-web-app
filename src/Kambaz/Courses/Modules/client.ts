import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;



export const deleteModule = async (moduleId: string) => {
    const { data } = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
    console.log("Module deleted:", data);
    return data;
};

export const updateModule = async (module: any) => {
    const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
    return data;
};

