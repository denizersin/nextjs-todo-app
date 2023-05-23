import React, { useRef, useState } from "react";
import { useCreateEvent } from "@/hooks";
import { useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

function Event({ setIsFormActive }) {
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
            new Date(`${date}T${eventStartTime}:00.000Z`).toISOString()
        );
        formData.append('finishTime',
            new Date(`${date}T${eventFinishTime}:00.000Z`).toISOString()
        );
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        return;

    }




    return (
        <div className="wrapper fixed z-10 center-non-static w-full h-[100vh] flex justify-center items-center bg-slate-200/50">

            <div className="container w-[80%] h-[80%] bg-slate-300 relative">
                <form onSubmit={handleSubmit} ref={formRef}>
                    <label>
                        Date:
                        <input name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Start Time:
                        <input name="startTime" type="time" value={eventStartTime} onChange={(e) => setEventStartTime(
                            e.target.value
                        )} />
                    </label>
                    <br />
                    <label>
                        Finish Time:
                        <input name="finishTime" type="time" value={eventFinishTime} onChange={(e) => { setEventFinishTime(e.target.value); console.log(e.target) }} />
                    </label>
                    <br />
                    <label>
                        Type:
                        <input name="eventType" type="text" value={eventType} onChange={(e) => setEventType(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Event Explanation:
                        <textarea name="eventAction" value={eventAction} onChange={(e) => { setEventAction(e.target.value); }} />
                    </label>
                    <br />
                    <button type="submit">Save</button>
                </form>
                <button
                    onClick={() => setIsFormActive(false)}
                    className="absolute top-0 left-full">X</button>
            </div>
            {
                status === 'loading' && <div className="absolute top-0 left-0 w-full h-full bg-slate-200/50 flex justify-center items-center">
                    <div className="loader">Ekleniyor....</div>
                </div>
            }
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
