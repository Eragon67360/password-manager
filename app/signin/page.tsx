"use client"
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';

import {
    Card,
    Button,
    Input,
    CardHeader,
    CardBody,
    Link,

} from '@nextui-org/react';
import { toast } from 'sonner';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const { signIn } = useAuth();
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            toast.success('You have been successfully connected');
            router.push('/passwords');
        } catch (error:any) {
            const errorMessage = error.message || 'An error occurred during sign in';
            toast.error(errorMessage);
            console.error('Error signing in:', errorMessage);
        }
    };

    return (
        <>
            <div className='min-h-[90dvh] flex items-center justify-center'>
                <Card className='p-8 min-w-[400px]' >
                    <CardHeader>
                        <p>Login to Password Manager</p>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                            <Input
                                type="email"
                                label="Email"
                                variant="bordered"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isRequired
                            />
                            <Input
                                label="Password"
                                variant="bordered"
                                placeholder="Enter your password"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {isVisible ? (
                                            <BsEyeSlash />
                                        ) : (
                                            <BsEyeFill />
                                        )}
                                    </button>
                                }
                                isRequired
                                type={isVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="max-w-xs"
                            />
                            <Button type="submit" color='primary'>Sign In</Button>
                            <p>Need to create an account? <Link href='/signup'>Sign Up</Link></p>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>

    );
};

export default SignIn;
