import { NextResponse } from "next/server";

export function middleware(req) {
    const nextUrl = req.nextUrl;
    console.log(nextUrl.pathname,'qw213')
    if (nextUrl.pathname === '/test') {
      console.log(')))')
        return NextResponse.rewrite(new URL('/about', req.url));
    }
  }