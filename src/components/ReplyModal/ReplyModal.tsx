import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    VStack,
    Box
} from '@chakra-ui/react'
import React from 'react'
import {
    EditorProvider,
    Editor,
    Toolbar,
    BtnBold,
    BtnItalic,
    BtnUnderline,
    BtnStrikeThrough,
    BtnNumberedList,
    BtnBulletList
} from 'react-simple-wysiwyg';
import { useAddCommentMutation } from '../../apis/comments';

function ReplyModal({ isOpen, onClose, fileID, parentCommentID }: { isOpen: boolean, onClose: () => void, fileID: string, parentCommentID: string }) {
    const [html, setHtml] = React.useState('');
    const { mutate, isLoading } = useAddCommentMutation();

    const onChange = (e: any) => {
        setHtml(e.target.value);
    };

    const handleReply = () => {
        if (html === '') return;
        mutate({ fileID, parentCommentID, comment: html }, {
            onSuccess: () => {
                setHtml('');
                onClose();
            }
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Reply to Comment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack width="100%">
                        <EditorProvider>
                            <Box width="100%">
                                <Editor
                                    value={html}
                                    onChange={onChange}
                                    style={{ width: '100%' }}
                                >
                                    <Toolbar>
                                        <BtnBold />
                                        <BtnItalic />
                                        <BtnUnderline />
                                        <BtnStrikeThrough />
                                        <BtnNumberedList />
                                        <BtnBulletList />
                                    </Toolbar>
                                </Editor>
                            </Box>
                        </EditorProvider>
                    </VStack>
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
                        onClick={handleReply}
                    >
                        Reply
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ReplyModal