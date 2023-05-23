import { useDeleteEvent, useUpdateEvent } from '@/hooks';
import React from 'react'
import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';

const filterTasks = (currTaskType, allTasks, setIsFormActive) => {
    let filtered;
    switch (currTaskType) {
        case 'hepsi':
            filtered = allTasks;
            break;
        case 'toplanti':
            filtered = allTasks.filter(d => d.type == 0)
            break;
        case 'diger':
            filtered = allTasks.filter(d => d.type == 1)
            break;
        default:
            break;
    }
}



export default function TasksContainer({ eventsData, setIsFormActive }) {
    const queryClient = useQueryClient();
    const onSuccessDelete = (data) => {
        if (data.success) {
            queryClient.invalidateQueries(['events']);
            toast.success("Event deleted successfully");
        }
        else
            toast.error("Event could not be deleted" + data.message);

    }
    const onSuccessUpdate = (data) => {
        if (data.success) {
            queryClient.invalidateQueries(['events']);
            toast.success("Event updated successfully");
        }
        else
            toast.error("Event could not be updated" + data.message);
    }
    const { mutate: deleteMutate, status: deleteStatus } = useDeleteEvent(onSuccessDelete)
    const { mutate: updateMutate, status: updateStatus } = useUpdateEvent(onSuccessUpdate)
    const handleDeleteTask = async (e, taskData) => {
        deleteMutate(taskData.id)
    }
    const handleCompleteTask = (e, taskData) => {
        updateMutate({ ...taskData, eventStatus: 'completed' })
    }

    return (
        <div className={'TasksContainer component w-full h-full'}> <span>TasksContainer</span>
            <div onClick={(e) => { setIsFormActive(true) }}>create</div>
            {eventsData.map
                (data => (
                    <div key={data.eventId}>
                        {
                            Object.entries(data).map(([key, value]) => (
                                <div key={key}>{key} : {JSON.stringify(value)}</div>
                            )
                            )}
                        <div className="">{data.eventStatus}</div>
                        <button onClick={(e) => handleDeleteTask(e, data)} className='btn'>delete</button>
                        <button onClick={(e) => handleCompleteTask(e, data)} className='btn'>complete</button>
                        {/* <button className='btn'>undo</button> */}
                    </div>
                ))}

        </div>
    )
}
