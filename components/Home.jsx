import React, { useEffect, useRef, useState } from 'react'
import TasksContainer from '@/components/TasksContainer';
import { Calendar } from 'react-modern-calendar-datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { useSetQueryKey } from '@/hooks/utils';
import { notifications } from '@/notifs/notificationApi';
import { useUpdateEvent } from '@/hooks';
import { queryClient } from './Providers';
import TaskForm from './TaskForm';

export default function Home({ eventsData }) {


    const defaultValue = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
    };
    const { data: isFormActive } = useSetQueryKey(['isFormActive'], false);


    const mutateEvent = useUpdateEvent(() => { queryClient.invalidateQueries(['events']) });

    const [selectedDay, setSelectedDay] = useState(defaultValue);
    const [currDayTasks, setCurrDayTasks] = useState(getFilteredByDate());


    useEffect(() => {
        setCurrDayTasks(getFilteredByDate());
    }, [selectedDay]);

    useEffect(() => {
        setCurrDayTasks(getFilteredByDate());
        notifications(eventsData, mutateEvent);
    }, [eventsData]);

    const taskRef = useRef(null);
    const calendarContainerRef = useRef(null);


    function getFilteredByDate() {
        return eventsData.filter(
            data => data.startTime.getDate() == selectedDay.day &&
                data.startTime.getMonth() + 1 == selectedDay.month &&
                data.startTime.getFullYear() == selectedDay.year
        )
    }


    const handleClickCalendar = (e) => {
        if (!e.target.classList.contains('Calendar__day')) {
            taskRef.current.classList.remove('active')
            calendarContainerRef.current.classList.remove('active')
        }
        e.stopPropagation();
    }
    const handleClickTasks = (e) => {
        const tasks = taskRef.current;
        if (!tasks.classList.contains('active')) {
            tasks.classList.add('active')
        }
    }

    const handleChangeCalendar = (day) => {
        taskRef.current.classList.add('active')
        calendarContainerRef.current.classList.add('active')

        setSelectedDay(day)
    }

    return (
        <div className="home-container  ">
            <div onClick={handleClickCalendar} className="calendar-container flex justify-center items-center" ref={calendarContainerRef}>
                <Calendar value={selectedDay} onChange={handleChangeCalendar} shouldHighlightWeekends />
            </div>
            <div className="tasks p-6" ref={taskRef} onClick={handleClickTasks}>
                <TasksContainer eventsData={currDayTasks} />
            </div>
            {isFormActive && <TaskForm />}
        </div>
    )

}
