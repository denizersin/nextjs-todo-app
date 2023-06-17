"use client";
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { FC, FormEventHandler, useEffect, useState } from 'react'

interface IpageProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Login: FC<IpageProps> = ({ }: IpageProps) => {
    const sesssion = useSession();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        signIn("credentials", {
            username: email,
            password: password,
            redirect: true,
            callbackUrl: "/", //! Where to redirect to on success.
        })

        console.log(e);
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting) {
            // alert('submitted');
            setIsSubmitting(false);
        }
    }, [isSubmitting])

    console.log(sesssion);
    return (
        <div className="flex justify-center mt-40">
            <div className="container max-w-[400px]">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="px-4 py-2 border rounded"
                    />
                    <input
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        className="px-4 py-2 border rounded"
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        Login
                    </button>
                    {isSubmitting && <p>Logging in...</p>}
                </form>
                <Link href="/auth/register" className="text-blue-500 underline">register</Link>
            </div>
        </div>

    )
}
export default Login;