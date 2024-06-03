
import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaUnlockAlt } from 'react-icons/fa'
import data from '@/public/json/personal_data.json'
import { Link } from '@nextui-org/react'

const Footer = () => {
    return (
        <footer className='w-full p-2 pt-8 flex flex-col items-center gap-12 border-t border-foreground-400'>
            <div className='w-full flex gap-4 justify-evenly items-start'>
                <div className='flex flex-col'>
                    <div className='flex gap-4 items-center'>
                        <FaUnlockAlt size={48} />
                        <p className='font-bold text-xl'>Password Manager</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-3xl font-light'>Navigate</p>
                    <Link href='/' color='foreground'>Home</Link>
                    <Link href='/plans' color='foreground'>Plans</Link>
                    <Link href='/settings' color='foreground'>Settings</Link>
                </div>
                <div className='flex flex-col gap-4'>
                    <button className='border border-transparent border-b-foreground-400 hover:border-foreground-400 px-8 py-2 transition-all duration-250'>
                        Contact me
                    </button>
                    <button className='border border-transparent border-b-foreground-400 hover:border-foreground-400 px-8 py-2 transition-all duration-250'>
                        My Website
                    </button>
                </div>
                <div className='flex gap-6'>
                    <Link href={data.Instagram} color='foreground'>
                        <FaInstagram size={32} />
                    </Link>
                    <Link href={data.Instagram} color='foreground'>
                        <FaFacebook size={32} />
                    </Link>
                    <Link href={data.LinkedIn} color='foreground'>
                        <FaLinkedin size={32} />
                    </Link>
                    <Link href={data.Github} color='foreground'>
                        <FaGithub size={32} />
                    </Link>
                </div>
            </div>
            <div ><p>©{(new Date().getFullYear())} Thomas Moser</p></div>
        </footer>
    )
}

export default Footer