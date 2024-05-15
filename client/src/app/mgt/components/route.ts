import { NextRequest } from "next/server"


export async function GET() {
    const api = `${process.env.API_URL}/project`
    const first = await fetch(api, { cache: "no-cache" })
    const second = await first.json()
    return Response.json(second)
}

export async function DELETE(req:NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.values().next().value
    const api = `${process.env.API_URL}/project/${id}`
    const first = await fetch(api, { method: "DELETE" })
    const second = await first.json()
    return Response.json(second)
}