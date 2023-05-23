import React, { FC, FormEventHandler, useState } from 'react'
import Register from './Register';

interface IpageProps {
    children?: React.ReactNode | React.ReactNode[];
}

const page: FC<IpageProps> = ({ }: IpageProps) => {


    return (
        <div>
            <Register />
        </div>
    )
}
export default page;