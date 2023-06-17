import { createUser } from "@/backend";



export async function POST(request: Request) {
    const body: User = await request.json();

    try {
        const user = await createUser(body);
        const { password, ...result } = user;
        return new Response(JSON.stringify({ succsess: true, data: result }));
    }
    catch (e: any) {
        return new Response(JSON.stringify({ succsess: false, message: e.message }));
    }
}
