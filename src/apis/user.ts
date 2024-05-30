import { useMutation } from "react-query";
import axios from "axios";

const useLoginMutation = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, data);
            return response.data;
        }
    });
};

const useSingupMutation = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signup`, data);
            return response.data;
        }
    });
};

export { useLoginMutation, useSingupMutation };