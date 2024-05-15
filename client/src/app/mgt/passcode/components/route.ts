import { NextRequest } from "next/server"
// for getting all passcodes
export async function GET() {
    const api = `${process.env.API_URL}/passcode`
    const first = await fetch(api, { cache: "no-cache" })
    const second = await first.json()
    return Response.json(second)
}



export async function PUT(req: NextRequest) {
    const trans = await req.json()
    console.log(trans)
    const { _id: id } = trans
    const api = `${process.env.API_URL}/passcode/${id}`
    const first = await fetch(api, { cache: "no-cache", method: "PUT", body: JSON.stringify(trans), headers: { "Content-Type": "application/json" } })
    const second = await first.json()
    console.log(second)
    return Response.json(second)
}

// creating a passcode
export async function POST() {
    const api = `${process.env.API_URL}/passcode/create`
    const first = await fetch(api, { cache: "no-cache" })
    const second = await first.json()
    return Response.json(second)
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const { value } = searchParams.values().next()
    const api = `${process.env.API_URL}/passcode/${value}`
    const first = await fetch(api, { method: "DELETE" })
    const second = await first.json()
    return Response.json(second)
}