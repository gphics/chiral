import { NextRequest } from "next/server";


// for getting single passcode
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const key = searchParams.values().next().value
    console.log(searchParams.keys())
    const api = `${process.env.API_URL}/passcode/${key}`
    const first = await fetch(api, { cache: "no-cache" })
    const second = await first.json()
    return Response.json(second)
}