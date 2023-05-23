
import { useMutation } from 'react-query'

async function deleteEvent(id) {
    return fetch(`http://localhost:3000/api/event/${id}/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json())
}

export default function useDeleteEvent(onSuccess) {
    return useMutation({
        mutationFn: deleteEvent,
        onSuccess
    })
}