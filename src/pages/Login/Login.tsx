import {
    Text,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Link,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import { useLoginMutation } from "../../apis/user";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/store';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
    const { mutate, isLoading } = useLoginMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setToken = useStore((state: any) => state.setToken);
    const setData = useStore((state: any) => state.setData);
    const navigate = useNavigate();
    const toast = useToast();

    function handleLogin(e: any) {
        e.preventDefault();
        mutate({ email, password }, {
            onSuccess: (data) => {
                setToken(data.token);
                setData(jwtDecode(data.token));
                navigate('/dashboard');
            },
            onError: (error: any) => {
                toast({
                    title: error.response.data.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                });
            }
        });
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'3rem'} color={'#4299e1'} pb={25}>SpotDraft</Heading>
                    <Heading fontSize={'xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <form onSubmit={(e: any) => handleLogin(e)}>
                        <Stack spacing={4} onKeyDown={(e) => { if (email && password && e.key === "Enter") { handleLogin(e); } }}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input autoFocus required type="email" onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input required type="password" onChange={(e) => setPassword(e.target.value)} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    type='submit'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    isLoading={isLoading}
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                    <Stack pt={6}>
                        <Text align={'center'}>
                            Don't have an account? <Link color={'blue.400'} onClick={() => navigate('/signup')}>Sign Up</Link>
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
