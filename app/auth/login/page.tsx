import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import Login from './Login';

interface IpageProps {
    children?: React.ReactNode | React.ReactNode[];
}

const page: FC<IpageProps> = ({ }: IpageProps) => {



    return (
        <div>
            <Login />
        </div>
    )
}
export default page;