import { useLocation, useParams } from 'react-router-dom';
import DisplayPDF from '../../components/DisplayPDF/DisplayPDF';
import {
    Heading,
    VStack,
    Stack,
    Card,
    CardBody,
    Box,
    Button,
    Spinner,
    Flex,
} from '@chakra-ui/react';
import {
    Toolbar,
    Editor,
    EditorProvider,
    BtnBold,
    BtnItalic,
    BtnUnderline,
    BtnStrikeThrough,
    BtnNumberedList,
    BtnBulletList,
} from 'react-simple-wysiwyg';
import { useEffect, useState } from 'react';
import Comments from '../../components/Comments/main';
import { useAddCommentMutation } from '../../apis/comments';
import { useFetchFileMutation } from '../../apis/files';

function View() {
    const location = useLocation();
    const [state, setState] = useState(location.state);
    const [html, setHtml] = useState('');
    const { mutate, isLoading } = useAddCommentMutation();
    const [key, setkey] = useState(0);
    const { id } = useParams();
    const { mutate: fetchFile } = useFetchFileMutation();

    useEffect(() => {
        if (state !== null) return;
        if (id) {
            fetchFile(id, {
                onSuccess: (data) => {
                    setState(data);
                },
            });
        }
    }, [state]);

    function onChange(e: any) {
        setHtml(e.target.value);
    }

    function handleAddComment() {
        if (html === '') return;
        mutate({ fileID: state._id, comment: html }, {
            onSuccess: () => {
                setHtml('');
                setkey(key + 1);
            }
        });
    };

    if (!state) return (
        <Flex justify="center" align="center" height="100vh">
            <Spinner size={'xl'} />
        </Flex>
    );

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {
                state?.fileURL &&
                <DisplayPDF fileURL={state?.fileURL} />
            }

            <Stack w={'100%'}>
                <CardBody w={'100%'} overflowY={'auto'} maxH={'75vh'}>
                    <Heading fontSize={25} size='md'>Comments</Heading>

                    <VStack align={'left'}>
                        <Box width="100%">
                            <EditorProvider>
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
                            </EditorProvider>
                            <Button
                                _hover={{ bg: '#4299e1', color: 'white' }}
                                border={'2px solid #4299e1'}
                                variant={'outline'} mt={2}
                                onClick={handleAddComment}
                                isLoading={isLoading}
                            >
                                Add comment
                            </Button>
                            {
                                state?._id &&
                                <Comments key={key} fileID={state?._id} />
                            }
                        </Box>
                    </VStack>
                </CardBody>
            </Stack>
        </Card >
    );
}

export default View;
