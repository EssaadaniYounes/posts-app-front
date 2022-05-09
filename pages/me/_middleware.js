import { NextRequest, NextResponse } from 'next/server'
import { post } from '../../requests/post'
export async function middleware(request) {

    let response = NextResponse.next()

    const email = request.cookies["email"]
    const password = request.cookies["password"]

    if (!(email && password)) {
        const url = request.nextUrl.clone()
        url.pathname = '/auth'
        return NextResponse.redirect(url)
    }


    return response

}