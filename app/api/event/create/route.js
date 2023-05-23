import { createEvent } from "@/backend";

export async function POST(
    request,
    {
        params,
    }
) {
    const data = await request.json();
    console.log(data);
    const newData = await createEvent(data)
    if (newData) {
        return new Response(JSON.stringify({ success: true, data: newData}));
    }
    return new Response(JSON.stringify({ success: false}));

}