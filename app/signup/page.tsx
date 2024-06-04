"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import { toast } from 'sonner';
import {
    Card,
    Button,
    Input,
    CardHeader,
    CardBody,
    Link,

} from '@nextui-org/react';

const SignUp: React.FC = () => {
    const [displayedName, setDisplayedName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [attempts, setAttempts] = useState(0);
    const { signUp } = useAuth();
    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (attempts >= 5) {
            toast.error('You have reached the maximum number of attempts. Please try again later.');
            return;
        }
        try {
            await signUp(displayedName, email, password);
            router.push('/passwords');
        } catch (error: any) {
            setAttempts(attempts + 1);
            const errorMessage = error.message || 'An error occurred during sign in';
            if (errorMessage.includes('rate limit')) {
                toast.error('Too many sign-up attempts. Please try again later.');
            } else {
                toast.error(errorMessage);
            }
            console.error('Error signing up:', errorMessage);
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
                                type="text"
                                label="Name (or pseudonym)"
                                variant="bordered"
                                placeholder="John Doe"
                                value={displayedName}
                                onChange={(e) => setDisplayedName(e.target.value)}
                            />
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
                            <Button type="submit" color='primary'>Create an account</Button>
                            <p>Already have an account? <Link href='/signin'>Sign In</Link></p>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default SignUp;
