import React from 'react'
import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Image } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import { ThemeSwitcher } from './ThemeSwitcher';

const Navbar = () => {
    return (
        <Nav shouldHideOnScroll>
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
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Nav>
    )
}

export default Navbar