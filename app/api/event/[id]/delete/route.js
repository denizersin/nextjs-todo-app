import { deleteEvent } from "@/backend";

export async function POST(
    request,
    {
        params,
    }
) {
    const id = params.id; // 'a', 'b', or 'c'
    const newData = await deleteEvent(parseInt(id))
    
    if (newData) {

        return new Response(JSON.stringify({ success: true, id: id }));

    }
    return new Response(JSON.stringify({ success: false, id: id }));

}