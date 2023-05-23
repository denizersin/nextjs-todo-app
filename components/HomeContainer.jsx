import React from 'react'
import { useEvents } from '@/hooks';
import Home from '@/components/Home';
export default function HomeContainer({ initialEventsData }) {


    const { data, isLoading, isError } = useEvents(initialEventsData)

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
    return (
        <Home eventsData={data} />
    )
}
