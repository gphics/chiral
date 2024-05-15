import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.values().next().value
    const api = `${process.env.API_URL}/brief/${id}`
    const first = await fetch(api, { cache: "no-cache" })
    const second = await first.json()
    return Response.json(second)
}