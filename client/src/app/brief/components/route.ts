import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url)
    const { value: key } = searchParams.values().next()
    const url = `${process.env.API_URL}/passcode/${key}`
    const first = await fetch(url, { cache: "no-cache" })
    const second = await first.json()
    if (second.err?.message.includes("Cast to ObjectId")) {
        second.err.message = "invalid passcode"
    }

    return Response.json(second)
}


export async function POST(req: NextRequest) {
    const reqObj = await req.json()
    const { key, ...rest } = reqObj
    const api = `${process.env.API_URL}/brief?key=${key}`
    const first = await fetch(api, { method: "POST", body: JSON.stringify(rest), headers: { "Content-Type": "application/json" } })
    const second = await first.json()
    return Response.json(second)
}

export async function PUT(req: NextRequest) {
    const reqObj = await req.json()
    const api = `${process.env.API_URL}/brief/${reqObj._id}`
    const first = await fetch(api, { method: "PUT", body: JSON.stringify(reqObj), headers: { "Content-Type": "application/json" } })
    const second = await first.json()
    return Response.json({ second })
}