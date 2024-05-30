import { useEffect, useState } from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    Button,
    Spinner,
    Input,
} from '@chakra-ui/react';
import {
    FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { GoUpload } from "react-icons/go";
import store from '../../store/store';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import UploadModal from '../../components/UploadModal/UploadModal';
import { useFetchAllFilesMutation } from '../../apis/files';
import PDFFile from '../../components/PDFFiles/PDFFile';

interface LinkItemProps {
    name: string;
    icon: IconType;
    path: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Dashboard', icon: RiDashboardHorizontalLine, path: '/dashboard' },
];

export default function SidebarWithHeader() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const data = store((state: any) => state.data);
    const files = store((state: any) => state.files);
    const setFiles = store((state: any) => state.setFiles);
    const { mutate, isLoading } = useFetchAllFilesMutation();

    const [name, setName] = useState('');
    const [search, setSearch] = useState('');
    const location = useLocation();
    const isChildRouteActive = location.pathname !== '/dashboard';

    useEffect(() => {
        setName(data.name);
    }, [data]);

    useEffect(() => {
        const fetchData = async () => {
            await mutate(data, {
                onSuccess: (data) => {
                    setFiles(data);
                }
            });
        };
        fetchData();
    }, []);

    const filteredFiles = files.filter((file: any) => {
        return file.fileName && file.fileName.toLowerCase().includes(search.toLowerCase())
    });

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <>
                <SidebarContent
                    onClose={() => onClose}
                    display={{ base: 'none', md: 'block' }}
                />
                <Drawer
                    autoFocus={false}
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="full"
                >
                    <DrawerContent>
                        <SidebarContent onClose={onClose} />
                    </DrawerContent>
                </Drawer>
                <MobileNav onOpen={onOpen} name={name} search={search} setSearch={setSearch} />
            </>
            <Box ml={{ base: 0, md: 60 }} p="4">
                <Outlet />
                {!isChildRouteActive && (
                    (
                        isLoading ?
                            <VStack>
                                <Text>We are fetching your files. Hold on.</Text>
                                <Spinner size={'xl'} />
                            </VStack> :
                            files.length === 0 ? <Text textAlign={'center'}>Upload a file to get started</Text> :
                                filteredFiles.length === 0 ?
                                    <Text textAlign={'center'}>No files found</Text> :
                                    <VStack>
                                        {filteredFiles.map((file: any) => (
                                            <PDFFile key={file.fileID} data={file} />
                                        ))}
                                    </VStack>
                    )
                )}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        store.setState({
            token: null,
            data: {
                name: null,
                email: null,
                id: null,
            },
        });
        navigate('/');
    }
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color={'#4299e1'}>
                    SpotDraft
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} onClick={() => { navigate(link.path); onClose(); }}>
                    {link.name}
                </NavItem>
            ))}
            <NavItem icon={IoLogOutOutline} onClick={handleLogout}>
                Logout
            </NavItem>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
        <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: '#4299e1',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, name, search, setSearch, ...rest }: MobileProps & { name: string, search: string, setSearch: Function }) => {
    const { isOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const handleSearchChange = (e: any) => {
        setSearch(e.target.value);
    };
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Input
                type='text'
                placeholder='Search'
                mr={{ base: 4, md: 4 }}
                ml={{ base: 4, md: 0 }}
                value={search}
                onChange={handleSearchChange}
            >

            </Input>
            <HStack>
                <Flex>
                    <Menu>
                        <HStack>
                            <Button _hover={{ bg: '#4299e1', color: 'white' }} border={'2px solid #4299e1'} variant={'outline'} onClick={onModalOpen}><Icon as={GoUpload} mr={2} />Upload</Button>
                            <UploadModal isModalOpen={isOpen} onModalClose={onModalClose} />
                            <HStack display={{ base: 'none', md: 'flex' }}>
                                <AiOutlineUser size={32} />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="l" fontWeight="bold">Hello,{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
                                </VStack>
                            </HStack>
                        </HStack>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};