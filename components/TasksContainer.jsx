import { useDeleteEvent, useUpdateEvent } from '@/hooks';
import { updateQuery } from '@/hooks/utils';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'react-hot-toast';
import { IoMdRemoveCircle } from 'react-icons/io';
import { BsCheck2Circle } from 'react-icons/bs';
import classNames from 'classnames';


const filterTasks = (currTaskType, allTasks) => {
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



export default function TasksContainer({ eventsData }) {
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
    const { mutate: deleteMutate, status: deleteStatus, isLoading: isLoadingDelete } = useDeleteEvent(onSuccessDelete)
    const { mutate: updateMutate, status: updateStatus, isLoading: isLoadingUpdate } = useUpdateEvent(onSuccessUpdate)
    const handleDeleteTask = async (e, taskData) => {
        deleteMutate(taskData.id)
    }
    const handleCompleteTask = (e, taskData) => {
        updateMutate({ ...taskData, eventStatus: 'completed' })
    }
    return (
        <div className={'TasksContainer component w-full h-full flex flex-col items-center'}>
            <button className='btn rounded-full' onClick={() => updateQuery(['isFormActive'], true)}>+</button>
            <div className="c w-full h-12 bg-red-300 flex">
                <div className="c c1 w-[150px] flex items-center justify-center border">Event Date</div>
                <div className="c c2 w-[150px] flex items-center justify-center border">Event Start Time</div>
                <div className="c c3 w-[150px] flex items-center justify-center border border" >Event Finish Time</div>
                <div className="c c5 w-[150px] flex items-center justify-center border">Event status</div>
                <div className="c c4 w-[150px] flex items-center justify-center border">Event Type</div>
                <div className="c c5 grow border bg-green-300 flex items-center justify-center">Event Action</div>
            </div>
            {eventsData.map
                (data => {
                    const isCompleted = data.eventStatus == 'completed';
                    const isTimePassed=data.finishTime.getTime()<new Date().getTime();
                    return (
                        <div key={data.eventId} className='w-full'>
                            <div className={classNames( "c w-full   bg-red-200 flex",{
                                'opacity-50':isTimePassed ,
                            })}>
                                <div className="c c1 w-[150px] flex items-center border">{data.startTime.toLocaleDateString()}</div>
                                <div className="c c2 w-[150px] flex items-center border">{data.startTime.toLocaleTimeString()}</div>
                                <div className="c c3 w-[150px] flex items-center border border" >{data.finishTime.toLocaleTimeString()}</div>
                                <div className="c c5 w-[150px] flex items-center border flex">
                                    <div className={classNames('', { 'line-through': isCompleted })}>
                                        {data.eventStatus}
                                    </div>
                                    <div className="c2 flex flex-col gap-2 items-center p-1">
                                        <button onClick={(e) => handleDeleteTask(e, data)} className=''>
                                            <IoMdRemoveCircle
                                                className={classNames('text-red-600 text-3xl', {
                                                    'scale-50': isLoadingDelete,
                                                })} />
                                        </button>
                                        <button onClick={(e) => handleCompleteTask(e, data)} className=''>
                                            <BsCheck2Circle
                                                className={classNames('text-green-600 text-3xl', {
                                                    'scale-50': isLoadingUpdate,
                                                    'opacity-50': isCompleted
                                                })} />
                                        </button>
                                    </div>
                                </div>
                                <div className="c c4 w-[150px] border flex items-center">{data.eventType}</div>
                                <div className="c c5 grow border bg-green-200 flex items-center">{data.eventAction}</div>
                            </div>

                        </div>
                    )
                }
                )

            }

        </div>
    )
}
