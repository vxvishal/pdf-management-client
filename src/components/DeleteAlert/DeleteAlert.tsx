import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter
} from "@chakra-ui/react"
import { useRef } from "react"
import { useDeleteFileMutation } from "../../apis/files";
import useStore from "../../store/store";

type DeleteAlertProps = {
    isOpen: boolean;
    onAlertClose: () => void;
    fileID: string;
};

export default function DeleteAlert({ fileID, isOpen: isAlertOpen, onAlertClose }: DeleteAlertProps) {
    const cancelRef = useRef(null);

    const { mutate, isLoading } = useDeleteFileMutation();
    const files = useStore((state: any) => state.files);
    const setFiles = useStore((state: any) => state.setFiles);

    const handleDelete = async () => {
        try {
            await mutate(fileID, {
                onSuccess: () => {
                    onAlertClose();
                    const newFiles = files.filter((file: any) => file._id !== fileID);
                    setFiles(newFiles);
                }
            });
        } catch (error) {
            console.error("Delete failed:", error);
        }
    }

    return (
        <>
            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={onAlertClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete PDF
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onAlertClose}>
                                Cancel
                            </Button>
                            <Button isLoading={isLoading} colorScheme='red' onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

