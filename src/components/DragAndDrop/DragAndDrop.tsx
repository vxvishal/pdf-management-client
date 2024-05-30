import React, { useState } from 'react';
import { Box, Text } from "@chakra-ui/react";

interface DragAndDropBoxProps {
    onFileDrop: (file: File) => void;
    fileName: string | null;
}

const DragAndDropBox: React.FC<DragAndDropBoxProps> = ({ onFileDrop, fileName }) => {
    const [dragging, setDragging] = useState(false);

    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    }

    const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    }

    const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
    }

    const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type !== 'application/pdf') {
                alert('Only PDF files are allowed');
                return;
            }
            onFileDrop(file);
        }
    }

    const fileInputClicked = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'application/pdf';
        fileInput.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                const file = target.files[0];
                if (file.type !== 'application/pdf') {
                    alert('Only PDF files are allowed');
                    return;
                }
                onFileDrop(file);
            }
        };
        fileInput.click();
    }

    return (
        <Box
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
            onClick={fileInputClicked}
            bg={dragging ? "gray.200" : "gray.50"}
            height="200px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            color="gray.500"
            borderStyle="dashed"
            borderColor="gray.500"
            borderWidth="2px"
            borderRadius="md"
            _hover={{ cursor: 'pointer' }}
        >
            {fileName ? `${fileName}` : <Text>Drag and drop a file here <br />or<br />Click to select</Text>}
        </Box>
    );
}

export default DragAndDropBox;
