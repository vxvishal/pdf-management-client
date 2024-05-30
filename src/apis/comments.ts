import { useMutation } from "react-query";
import axios from "axios";
import store from "../store/store";

const useFetchAllCommentsMutation = () => {
    const token = store((state: any) => state.token);
    return useMutation({
        mutationFn: async (fileID: string) => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/comment/file/${fileID}`, {
                headers: {
                    'Authorization': token,
                }
            });
            return response.data;
        }
    });
};

const useAddCommentMutation = () => {
    const token = store((state: any) => state.token);
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/comment/add`, data, {
                headers: {
                    'Authorization': token,
                }
            });
            return response.data;
        }
    });
};

export { useFetchAllCommentsMutation, useAddCommentMutation };