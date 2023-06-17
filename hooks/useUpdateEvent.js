import { useMutation } from "@tanstack/react-query"

async function updateEvent(data) {
    return fetch(`http://localhost:3000/api/event/${data.id}/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json())
}

export default function useUpdateEvent(onSuccess) {
    return useMutation({
        mutationFn: updateEvent,
        onSuccess
    })
}