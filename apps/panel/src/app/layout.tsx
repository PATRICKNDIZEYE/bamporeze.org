import '@radix-ui/themes/styles.css';
import '@repo/ui/styles.css';
import type { Metadata } from 'next';
import HotToaster from '../components/toaster';
import { AuthCtxProvider } from '../hooks/useAuth';
import { GlobalCtxProvider } from '../hooks/useGlobalContext';
import './globals.css';


export const metadata: Metadata = {
  title: 'hcakigali  | Admin panel',
  description: 'Website adminstration for hcakigali',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <GlobalCtxProvider>
        <AuthCtxProvider>
          <body>
            <HotToaster />
            {children}
          </body>
        </AuthCtxProvider>
      </GlobalCtxProvider>

    </html >
  )
}
