import { Event } from "@prisma/client";
import { UseMutationResult } from "@tanstack/react-query";



let currInterval: any = null;

export const checkNotifPermission = () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(function (permission) {
        });
    }
}

export const notifications = (eventsData: Event[], mutateEvent: UseMutationResult) => {
    clearInterval(currInterval);
    currInterval = setInterval(async () => {
        eventsData.map(async (event) => {
            if (!event.isUserNotified &&
                !mutateEvent.isLoading &&
                event.startTime.getTime() <= new Date().getTime()) {
                let title = "JavaScript Jeep";
                mutateEvent.mutate({ ...event, isUserNotified: true })

                let body = `It's Your event time! ${event.eventType}`;

                var notification = new Notification(title, { body });
            }
        })
    }, 500);


}