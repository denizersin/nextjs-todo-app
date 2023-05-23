"use client";
import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';

export default function Nav() {

    const session = useSession()
    const user = session.data?.user;
    console.log(session)
    useEffect(() => {
        if(session.status === 'unauthenticated'){
            signIn();
        }
    }, [session]);
    return (
        <div className={'Nav component flex justify-between'}>
            {
                session.status === 'authenticated' && (
                    <div className='c c1 flex gap-3'>
                        <div>{user.name}</div>
                        <div>{user.email}</div>
                    </div>
                )
            }
            <div className="c c2">
                <button onClick={()=>{signOut()}}>sign out</button>
            </div>
        </div>
    )
}
