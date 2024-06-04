'use client'
import React, { useEffect, useState } from 'react'
import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Image, Avatar, Popover, PopoverTrigger, PopoverContent, Card, CardHeader, CardBody, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, CardFooter, Divider } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { User } from "@supabase/supabase-js";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { CiSettings, CiTrash } from 'react-icons/ci';
import { MdOutlineLogout } from 'react-icons/md';

const Navbar = () => {

    const { user, signOut } = useAuth();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [activeUser, setActiveUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, } = await supabase.auth.getUser()
            setActiveUser(user);
        }
        fetchUser();
    }, [])


    const handleSignOut = async (_e: any) => {
        try {
            await signOut();
            router.push('/');
            toast.success('You have been successfully disconnected');
        } catch (error) {
            toast.error('Unable to sign out, please try again later !')
        }
    }

    const handleDeleteAccount = async (_e: any) => {

        console.log(activeUser?.id)

        if (activeUser) {
            setUserId(activeUser.id);
            const response = await fetch('/api/delete-user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId:userId }),
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error('Unable to delete this account, please try again later !')
                throw new Error(data.error);
            }
            onClose();
            router.push('/account-deleted');
        }

    }

    return (
        <Nav >
            <NavbarBrand>
                <Image src='/img/lock.png' width={56} />
                <p className="font-bold text-inherit">PaMa</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Passwords
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color='foreground' href="/plans" aria-current="page">
                        Plans
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/settings">
                        Settings
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Link className='p-0' color='foreground'>
                        <FaGithub size={24} />
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
                <NavbarItem>

                    {user ? (
                        <Popover showArrow placement="bottom">
                            <PopoverTrigger>
                                <Avatar />

                            </PopoverTrigger>
                            <PopoverContent className="p-1">
                                <Card shadow="none" className="max-w-[300px] min-w-[100px] lg:min-w-[300px] border-none bg-transparent">
                                    <CardHeader className="justify-between">
                                        <div className="flex gap-3">
                                            <Avatar isBordered radius="full" size="md" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                                            <div className="flex flex-col items-start justify-center">
                                                <h4 className="text-small font-semibold leading-none text-default-600">{activeUser?.user_metadata.name}</h4>
                                                <h5 className="text-small tracking-tight text-default-500">{user.email}</h5>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody>
                                        <Button as={Link} href="/settings" color="default" className="rounded-none bg-transparent justify-start" startContent={<CiSettings size={24} />} >Settings</Button>
                                        <Button onPress={handleSignOut} color="default" className="rounded-none bg-transparent justify-start" startContent={<MdOutlineLogout size={24} />} >Sign Out</Button>
                                    </CardBody>
                                    <Divider />
                                    <CardFooter>
                                        <Button onPress={onOpen} className="rounded-none bg-transparent justify-start text-red-500" startContent={<CiTrash size={24} />} >Delete account</Button>
                                    </CardFooter>
                                </Card>
                            </PopoverContent>
                        </Popover>
                    ) :
                        (
                            <Button as={Link} href="/signin" color='primary'>Login</Button>
                        )
                    }
                </NavbarItem>
            </NavbarContent>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="z-10">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Remove account</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to delete this account ?
                                </p>
                                <p>
                                    This action is irreversible!
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={handleDeleteAccount}>
                                    Delete
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Nav>
    )
}

export default Navbar