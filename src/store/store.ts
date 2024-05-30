import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Comment = {
    user: string;
    comment: string;
    commentBy: string;
    comments: Comment[];
    _id: string;
};

const useStore = create(
    persist(
        (set) => ({
            token: null,
            data: {
                name: null,
                email: null,
                id: null,
            },
            files: [
                {
                    _id: null,
                    fileID: null,
                    fileName: null,
                    fileURL: null,
                    uploadedBy: null,
                    uploadedOn: null,
                    numberOfPages: null,
                    thumbnailURL: null,
                },
            ],
            comments: [],
            setToken: (token: string) => set({ token }),
            setData: (data: any) => set({ data }),
            setFiles: (files: any) => set({ files }),
            setComments: (comments: Comment[]) => set({ comments }),
        }),
        {
            name: 'SpotDraft',
            getStorage: () => localStorage,
        }
    )
);

export default useStore;
