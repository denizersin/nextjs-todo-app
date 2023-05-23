"use client";
import HomeContainer from '@/components/HomeContainer';
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import "./index.css"
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient()

export default function ClientApp({ initialEventsData }) {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <HomeContainer initialEventsData={initialEventsData} />
            </QueryClientProvider>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}
