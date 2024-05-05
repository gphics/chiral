


export async function GET() {
    const url = `${process.env.API_URL}/project`
    const first = await fetch(url, { cache: "no-cache" })
    const second = await first.json()
    // @ts-ignore
    return Response.json(second)
}