"use client";
import HomeContainer from '@/components/HomeContainer';
import React, { useEffect } from 'react'
import { checkNotifPermission } from "@/notifs/notificationApi";
import "./index.css"
import { Toaster } from 'react-hot-toast';

export default function ClientApp({ initialEventsData }) {
    useEffect(() => {
        checkNotifPermission();
    }, []);
    return (
        <>
            <HomeContainer initialEventsData={initialEventsData} />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}
