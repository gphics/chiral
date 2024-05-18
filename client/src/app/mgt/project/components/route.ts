import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    const api = `${process.env.API_URL}/project/${id}`
    const first = await fetch(api, { cache: "no-cache" })
    const second = await first.json()
    return Response.json(second)

}

export async function PUT(req: NextRequest) {
    const trans = await req.json()
    const { _id: id } = trans
    const api = `${process.env.API_URL}/project/${id}`
    const first = await fetch(api, { method: "PUT", cache: "no-cache", headers: { "Content-Type": "application/json" }, body: JSON.stringify(trans) })
    const second = await first.json()
    return Response.json(second)
}