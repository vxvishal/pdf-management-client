import { useState } from 'react';
import DragAndDropBox from "../DragAndDrop/DragAndDrop";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import { useUploadFileMutation } from '../../apis/files';
import useStore from '../../store/store';

interface UploadModalProps {
    isModalOpen: boolean;
    onModalClose: () => void;
}

export default function UploadModal({ isModalOpen, onModalClose }: UploadModalProps) {
    const { isOpen, onClose: closeDisclosure } = useDisclosure({ isOpen: isModalOpen, onClose: onModalClose });
    const [fileName, setFileName] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { mutate, isLoading } = useUploadFileMutation();
    const files = useStore((state: any) => state.files);
    const setFiles = useStore((state: any) => state.setFiles);

    const uploadFile = async () => {
        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            await mutate(formData, {
                onSuccess: (data) => {
                    closeDisclosure();
                    setFileName(null);
                    setSelectedFile(null);
                    setFiles([...files, data]);
                }
            });
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const onClose = () => {
        closeDisclosure();
        setFileName(null);
        setSelectedFile(null);
    };

    const filesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Only PDF files are allowed');
            return;
        }

        setFileName(file.name);
        setSelectedFile(file);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload a PDF</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DragAndDropBox onFileDrop={(file) => {
                            if (file.type !== 'application/pdf') {
                                alert('Only PDF files are allowed');
                                return;
                            }
                            setFileName(file.name);
                            setSelectedFile(file);
                        }} fileName={fileName} />
                        <input
                            type="file"
                            onChange={filesSelected}
                            accept="application/pdf"
                            style={{ display: 'none' }}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={4} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            _hover={{ bg: '#4299e1', color: 'white' }}
                            border={'2px solid #4299e1'}
                            variant={'outline'}
                            isLoading={isLoading}
                            onClick={uploadFile}
                        >
                            Upload
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}


