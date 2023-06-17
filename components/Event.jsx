import React, { useRef, useState } from "react";
import { useCreateEvent } from "@/hooks";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { getQueryData, updateQuery } from "@/hooks/utils";
import { useQueryClient } from "@tanstack/react-query";

function Event({ }) {
    const session = useSession();

    const queryClient = useQueryClient();
    const onSuccess = (data) => {
        queryClient.invalidateQueries(['events']);
        setDefault();
        toast.success("Event created successfully");
        // setIsFormActive(false);
    }
    const { mutate, status } = useCreateEvent(onSuccess);
    const [date, setDate] = useState(dateToUtc(new Date()));
    const [eventStartTime, setEventStartTime] = useState("");
    const [eventFinishTime, setEventFinishTime] = useState("");
    const [eventType, setEventType] = useState("");
    const [eventAction, setEventAction] = useState("");

    const formRef = useRef();

    const setDefault = () => {
        setDate('');
        setEventStartTime('');
        setEventFinishTime('')
        setEventType('')
        setEventAction('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(formRef.current);
        console.log(date)
        setHourToDate(formData);
        const formDataObj = {};
        formData.forEach((value, key) => (formDataObj[key] = value));
        formDataObj.ownerId = session.data.user.id;
        mutate(formDataObj);
    };

    const setHourToDate = (formData) => {
        formData.delete('startTime');
        formData.delete('finishTime');

        //prtin form data

        formData.delete('date');

        formData.append('startTime',
            new Date(`${date}T${eventStartTime}+03:00`).toISOString()
        );
        formData.append('finishTime',
            new Date(`${date}T${eventFinishTime}+03:00`).toISOString()
        );
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        return;

    }




    return (
        <div className="fixed z-10 inset-0 flex justify-center items-center bg-slate-800/50">
            <div className="container w-3/5 h-4/5 p-2 pt-4 bg-slate-600  relative rounded-lg">
                <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col space-y-4">
                    <label className="flex flex-col">
                        <span className="mb-1 text-white">Date:</span>
                        <input
                            name="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="px-2 py-1 w-[300px] max-sm:w-full border rounded"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1 text-white">Start Time:</span>
                        <input
                            name="startTime"
                            type="time"
                            value={eventStartTime}
                            onChange={(e) => setEventStartTime(e.target.value)}
                            className="px-2 py-1 w-[300px] max-sm:w-full border rounded"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1 text-white">Finish Time:</span>
                        <input
                            name="finishTime"
                            type="time"
                            value={eventFinishTime}
                            onChange={(e) => {
                                setEventFinishTime(e.target.value);
                                console.log(e.target);
                            }}
                            className="px-2 py-1 w-[300px] max-sm:w-full border rounded"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1 text-white">Type:</span>
                        <input
                            name="eventType"
                            type="text"
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            className="px-2 py-1 w-[300px] max-sm:w-full border rounded"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1 text-white">Event Explanation:</span>
                        <textarea
                            name="eventAction"
                            value={eventAction}
                            onChange={(e) => {
                                setEventAction(e.target.value);
                            }}
                            className="px-2 py-1  border rounded"
                        />
                    </label>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        Save
                    </button>
                </form>
                <button
                    onClick={() => updateQuery(['isFormActive'], (prev) => !prev)}
                    className="absolute top-0 right-0 btn  bg-red-600"
                >
                    X
                </button>
            </div>
            {status === 'loading' && (
                <div className="fixed inset-0 flex justify-center items-center bg-slate-200/50">
                    <div className="loader">Ekleniyor....</div>
                </div>
            )}
        </div>

    );
}

export default Event;


const dateToUtc = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
