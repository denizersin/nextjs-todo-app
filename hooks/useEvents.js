import { useQuery } from "react-query";




export default function useEvents(initialData) {
    return useQuery({
        queryKey: ["events"],
        queryFn: () => fetch("http://localhost:3000/api/event").then((res) => res.json()).then((data) => {
            data.forEach(element => {
                element.startTime = new Date(element.startTime)
                element.finishTime = new Date(element.finishTime)
            });
            return data
        }),
        initialData
    })
}