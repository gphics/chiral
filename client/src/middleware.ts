import { NextRequest, NextResponse } from "next/server";


export const config = {
    matcher: "/mgt/:path*"
}

export default function middleware(req: NextRequest) {
    const mgt = req.cookies.get("mgt")
    const { pathname } = req.nextUrl
    const { searchParams } = new URL(req.nextUrl)
    const isPermit = searchParams.get("permit")
    if (isPermit) {
        return NextResponse.next()
    }
    // route for login
    if (pathname === "/mgt/deps") {
        return NextResponse.next()
    }
    // preventing external access to mgt routes
    if (!mgt && pathname !== "/mgt/login") {
        return NextResponse.redirect(new URL("/mgt/login", req.url))
    }
    if (mgt && pathname === "/mgt/login") {
        return NextResponse.redirect(new URL("/mgt", req.url))
    }

}