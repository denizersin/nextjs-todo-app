"use client";
import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { updateQuery } from '@/hooks/utils';

export default function Nav() {

    const session = useSession()
    const user = session.data?.user;
    console.log(session)
    useEffect(() => {
        if (session.status === 'unauthenticated') {
            signIn();
        }
    }, [session]);
    return (
        <div className={'Nav component flex justify-evenly p-1 items-center bg-slate-800 text-white'} >
            {
                session.status === 'authenticated' && (
                    <div className='c c1 flex gap-3'>
                        <div>welcome {user.name}</div>
                        {/* <div>{user.email}</div> */}
                    </div>
                )
            }
            <div className="c c2">
                <button className='btn mr-2' onClick={() => { updateQuery(['isFormActive'],true) }}>Create Event</button>
                <button className='btn bg-red-400' onClick={() => { signOut() }}>sign out</button>
            </div>
        </div>
    )
}
