import { useEffect, useState } from "react";
import Comment from "./Comment";
import { useFetchAllCommentsMutation } from "../../apis/comments";
import { Spinner, VStack, Text } from "@chakra-ui/react";

function renderComments(comments: any, fileID: string, handleModalOnClose: () => void, depth: number = 0) {
    return comments.map((comment: any) => (
        <div key={comment._id} style={{ paddingLeft: `${25 * depth}px` }}>
            <Comment comment={comment} fileID={fileID} handleModalOnClose={handleModalOnClose} />
            {comment.comments.length > 0 && renderComments(comment.comments, fileID, handleModalOnClose, depth + 1)}
        </div>
    ));
}

export default function Comments({ fileID }: { fileID: string }) {

    const [commentsData, setCommentsData] = useState([]);
    const { mutate, isLoading } = useFetchAllCommentsMutation();
    const [key, setKey] = useState(0);

    const handleModalOnClose = () => {
        setKey(key + 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            await mutate(fileID, {
                onSuccess: (data) => {
                    setCommentsData(data);
                }
            });
        };
        fetchData();
    }, [key]);

    return (
        (
            isLoading ?
                <VStack justifyContent={'center'}>
                    <Spinner size='xl' />
                </VStack> :
                commentsData.length === 0 ?
                    <Text p={8} textAlign={'center'}>No comments found</Text> :
                    <div key={key}>
                        {renderComments(commentsData, fileID, handleModalOnClose)}
                    </div>
        )
    );
}