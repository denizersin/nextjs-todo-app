import { updateEvent } from "@/backend";

export async function POST(
    request,
    {
        params,
    }
) {
    const data = await request.json();
    const id = params.id; // 'a', 'b', or 'c'
    const newData = await updateEvent(data)
    if (newData) {
        return new Response(JSON.stringify({ success: true, data: newData }));
    }
    return new Response(JSON.stringify({ success: false }));

}