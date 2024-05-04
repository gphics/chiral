import { resultType } from "@/Types/types"


export async function GET(): Promise<resultType> {
    const url = `${process.env.API_URL}/project`
    const first = await fetch(url, { cache: "no-cache" })
    const second: resultType = await first.json()
    // @ts-ignore
    return Response.json(second)
}