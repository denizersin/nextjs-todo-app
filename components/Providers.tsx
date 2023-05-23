"use client";
import React, { FC } from 'react'
import { SessionProvider } from "next-auth/react";

interface IProvidersProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Providers: FC<IProvidersProps> = ({ children }: IProvidersProps) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
export default Providers;