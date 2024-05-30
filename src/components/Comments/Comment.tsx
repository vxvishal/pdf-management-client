import {
    Text,
    Stack,
    HStack,
    VStack,
    Box,
    useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineUser } from 'react-icons/ai';
import { LuReply } from "react-icons/lu";
import ReplyModal from "../ReplyModal/ReplyModal";

const Comment = ({ comment, fileID, handleModalOnClose }: { comment: any, fileID: string, handleModalOnClose: () => void }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleClose = () => {
        onClose();
        handleModalOnClose();
    };

    return (
        <Stack pt={4} pb={4} wordBreak={'break-word'}>
            <HStack>
                <AiOutlineUser size={35} />
                <VStack align={'left'}>
                    <Text fontWeight={700}>{comment.commentBy.charAt(0).toUpperCase() + comment.commentBy.slice(1)}</Text>
                    <Box pl={4} dangerouslySetInnerHTML={{ __html: comment.comment }} />
                    <HStack _hover={{ cursor: 'pointer' }} onClick={onOpen}>
                        <LuReply />
                        <Text fontSize={10}>Reply</Text>
                    </HStack>
                </VStack>
            </HStack>
            <ReplyModal isOpen={isOpen} onClose={handleClose} fileID={fileID} parentCommentID={comment._id} />
        </Stack>
    );
};

export default Comment;
