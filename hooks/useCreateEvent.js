import { useMutation } from "@tanstack/react-query";

async function create(data) {

    return fetch("http://localhost:3000/api/event/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => res.json()).then((data) => {
        data.startTime = new Date(data.startTime)
        data.finishTime = new Date(data.finishTime)
        return data
    }
    )

}

export default function useCreateEvent(onSuccess) {
    return useMutation({
        mutationFn: create,
        onSuccess
    })
}