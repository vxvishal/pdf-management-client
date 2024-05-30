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
} from '@chakra-ui/react';
import { useSingupMutation } from "../../apis/user";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/store';
import { jwtDecode } from 'jwt-decode';

export default function Signup() {
    const { mutate, isLoading } = useSingupMutation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setToken = useStore((state: any) => state.setToken);
    const setData = useStore((state: any) => state.setData);

    const navigate = useNavigate();

    function handleSignup() {
        mutate({ name, email, password }, {
            onSuccess: (data) => {
                setToken(data.token);
                setData(jwtDecode(data.token));
                navigate('/dashboard');
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
                    <Heading fontSize={'4xl'}>Create an account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4} onKeyDown={(e) => { if (name && email && password && e.key === "Enter") { handleSignup(); } }}>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input type="text" onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSignup}
                                isLoading={isLoading}
                            >
                                Sign up
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack pt={6}>
                        <Text align={'center'}>
                            Already an user? <Link color={'blue.400'} onClick={() => navigate('/')}>Log In</Link>
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

