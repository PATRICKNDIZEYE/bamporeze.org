import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'hcakigali  .',
        short_name: 'hcakigali  .',
        description: 'Mining company based in Rwanda',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#0B60B0',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}