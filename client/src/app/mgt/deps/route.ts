import { NextRequest } from "next/server"


// function for login
export async function POST(req: NextRequest) {
    const transBody = await req.json()
    const api = `${process.env.API_URL}/user/login`
    const first = await fetch(api, {
        method: "POST",
        cache: "no-cache", body: JSON.stringify({ password: transBody.password }), headers: {
            "Content-Type": "application/json"
        }
    })
    const second = await first.json()
    return Response.json(second)
}