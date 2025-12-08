import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

interface SigninCredentials {
    username: string;
    password: string;
}

export const signin = async (credentials: SigninCredentials) => {
    try {
        const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
        console.log(response.data)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return error.response.data;
            }
        }
    }
};
interface SignupUser {
    username?: string;
    password?: string;
}

export const signup = async (user: SignupUser) => {
    const response = await axios.post(`${USERS_API}/signup`, user);
    return response.data;
};
interface UpdateUser {
    _id: string;
    name?: string;
    email?: string;
    password?: string;
}

export const createUser = async (user: any) => {
    const response = await axios.post(`${USERS_API}`, user);
    return response.data;
};
export const updateUser = async (user: UpdateUser) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};
export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
};
export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};
export const findAllUsers = async () => {
    const response = await axiosWithCredentials.get(USERS_API);
    return response.data;
};
export const findUsersByRole = async (role: string) => {
    const response = await
        axios.get(`${USERS_API}?role=${role}`);
    return response.data;
};
export const findUsersByPartialName = async (name: string) => {
    const response = await axios.get(`${USERS_API}?name=${name}`);
    return response.data;
};
export const findUserById = async (id: string) => {
    const response = await axios.get(`${USERS_API}/${id}`);
    return response.data;
};
export const deleteUser = async (userId: string) => {
    const response = await axios.delete(`${USERS_API}/${userId}`);
    return response.data;
};
