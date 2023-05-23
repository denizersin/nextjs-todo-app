"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, FormEventHandler, useState } from 'react'

interface IpageProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Register: FC<IpageProps> = ({ }: IpageProps) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [tcNum, setTcNum] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [adress, setAdress] = useState("");
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const route = useRouter();
    // On form submit, call the register function

    const registerUser = async () => {
        console.log('qwe');
        setIsLoading(true);
        let data = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, firstName, lastName, tcNum, phoneNum, adress }),
        })
        console.log(data);
        let Data: any = await data.json();
        if (Data.success) {
            setIsLoading(false);
            if (data) {
                setSuccess(true);
                setTimeout(() => {
                    route.push('/auth/login');
                }, 2000);
            }
        }
        else {
            setIsLoading(false);
            alert('error'+Data.message);
        }
    }
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        registerUser();
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                />
                <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                />
                <input
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                />
                <input
                    name="tcNum"
                    value={tcNum}
                    onChange={(e) => setTcNum(e.target.value)}
                    placeholder="TC Number"
                />
                <input
                    name="phoneNum"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    placeholder="Phone Number"
                />
                <input
                    name="adress"
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                    placeholder="Adress"
                />
                <button type="submit">Register</button>

            </form>
            {
                isLoading && <p>Loading...</p>
            }
            {
                success && <p>You are registered succsessfully you are redirecting to login</p>
            }
            <Link href="/auth/login">Login</Link>
        </div>
    )
}
export default Register;