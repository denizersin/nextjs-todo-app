"use client";
import React, { FC } from 'react'
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

interface IProvidersProps {
    children?: React.ReactNode | React.ReactNode[];
}

export const  queryClient = new QueryClient();

const Providers: FC<IProvidersProps> = ({ children }: IProvidersProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                {children}
            </SessionProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
export default Providers;