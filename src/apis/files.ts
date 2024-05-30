import { useMutation } from "react-query";
import axios from "axios";
import store from "../store/store";

const useUploadFileMutation = () => {
    const token = store((state: any) => state.token);
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/file/upload`, data, {
                headers: {
                    'Authorization': token,
                }
            });
            return response.data;
        }
    });
};

const useDeleteFileMutation = () => {
    const token = store((state: any) => state.token);
    return useMutation({
        mutationFn: async (fileID: string) => {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/file/delete/${fileID}`, {
                headers: {
                    'Authorization': token,
                }
            });
            return response.data;
        }
    });
};

const useFetchAllFilesMutation = () => {
    const token = store((state: any) => state.token);
    return useMutation({
        mutationFn: async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/file/allFiles`, {
                headers: {
                    'Authorization': token,
                }
            });
            return response.data;
        }
    });
}

const useFetchFileMutation = () => {
    const token = store((state: any) => state.token);
    return useMutation({
        mutationFn: async (fileID: string) => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/file/${fileID}`, {
                headers: {
                    'Authorization': token,
                }
            });
            return response.data;
        }
    });
}

export { useUploadFileMutation, useDeleteFileMutation, useFetchAllFilesMutation, useFetchFileMutation };