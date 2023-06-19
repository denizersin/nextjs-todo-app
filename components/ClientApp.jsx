"use client";
import React, { useEffect } from 'react'
import { checkNotifPermission } from "@/notifs/notificationApi";
import "./index.css"
import { Toaster } from 'react-hot-toast';
import Home from './Home';
import { useEvents } from '@/hooks';

export default function ClientApp({ initialTaskData }) {

    const { data, isLoading, isError } = useEvents(initialTaskData)
    useEffect(() => {
        checkNotifPermission();
    }, []);

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    return (
        <>
            <Home eventsData={data||initialTaskData } />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}
