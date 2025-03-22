import { NextRequest } from "next/server"


let locales = ['en', 'fr']

const metaFiles = [
    '/sitemap.xml',
    '/robots.txt',
    '/favicon.ico',
    '/manifest.json',
    '/manifest.webmanifest',
    '/opengraph-image.png'
]


export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl
    if (metaFiles.includes(pathname)) return


    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    request.nextUrl.pathname = `/${'en'}${pathname}`
    return Response.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}