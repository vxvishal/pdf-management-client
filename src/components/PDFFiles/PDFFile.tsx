import {
    Card,
    Stack,
    CardBody,
    Heading,
    CardFooter,
    Button,
    Image,
    Text,
    Skeleton,
    VStack,
    HStack,
    Icon,
    useToast,
} from '@chakra-ui/react'
import { useState } from 'react';
import { GoDownload } from "react-icons/go";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoLinkSharp } from "react-icons/io5";
import DeleteAlert from '../DeleteAlert/DeleteAlert';
import { Link } from 'react-router-dom';

function PDFFile({ data }: { data: any }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const toast = useToast();

    const handleDownload = async () => {
        try {
            const response = await fetch(data.fileURL);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', data.fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <Link to={`/dashboard/view/${data._id}`} state={data}>
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
            >
                <Skeleton isLoaded={imageLoaded} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Image
                        width={'200px'}
                        height={'258px'}
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src={data.thumbnailURL}
                        onLoad={() => setImageLoaded(true)}
                    />
                </Skeleton>

                <Stack>
                    <CardBody>
                        <Skeleton isLoaded={imageLoaded}>
                            <Heading textAlign={'center'} size='md'>{data.fileName}</Heading>
                        </Skeleton>
                    </CardBody>

                    <CardFooter>
                        <VStack align={'left'}>
                            <Text textAlign={'left'} py='2'>
                                <Skeleton isLoaded={imageLoaded}>
                                    Uploaded on: {data.uploadedOn}
                                </Skeleton>
                            </Text>
                            <Text textAlign={'left'} py='2'>
                                <Skeleton isLoaded={imageLoaded}>
                                    Pages: {data.numberOfPages}
                                </Skeleton>
                            </Text>
                            <HStack>
                                <Skeleton isLoaded={imageLoaded}>
                                    <Button
                                        _hover={{ bg: '#4299e1', color: 'white' }}
                                        border={'2px solid #4299e1'}
                                        variant={'outline'}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            handleDownload();
                                        }}
                                    >
                                        <Icon as={GoDownload} mr={2} />Download
                                    </Button>
                                </Skeleton>
                                <Skeleton isLoaded={imageLoaded}>
                                    <Button
                                        variant='solid'
                                        _hover={{ bg: '#9c3030' }}
                                        bg={'#d95650'}
                                        color={'white'}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            setIsOpen(true);
                                        }}
                                    >
                                        <Icon as={MdOutlineDeleteOutline} mr={2} />Delete
                                    </Button>
                                </Skeleton>
                                <Skeleton isLoaded={imageLoaded}>
                                    <Button
                                        variant='solid'
                                        _hover={{ bg: '#2e6b9d' }}
                                        bg={'#4299e1'}
                                        color={'white'}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            navigator.clipboard.writeText(`${window.location.origin}/dashboard/view/${data._id}`);
                                            toast({
                                                title: 'Link copied to clipboard',
                                                status: 'success',
                                                position: 'top-right',
                                                duration: 2000,
                                                isClosable: true,
                                            });
                                        }}
                                    >
                                        <Icon size={''} as={IoLinkSharp} />
                                    </Button>
                                </Skeleton>
                                <DeleteAlert
                                    isOpen={isOpen}
                                    onAlertClose={onClose}
                                    fileID={data._id}
                                />
                            </HStack>
                        </VStack>
                    </CardFooter>
                </Stack>
            </Card>
        </Link>
    )
}

export default PDFFile;