import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/lib/auth-context'
import { Toaster } from '@/components/ui/sonner'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CareConnect - Professional Caregiving Platform',
  description: 'Connect with trusted, professional caregivers. Quality care you can depend on.',
  manifest: '/manifest.json',
  themeColor: '#1e3a8a',
  keywords: 'caregiving, elderly care, child care, disability support, professional caregivers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={raleway.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen">
              {children}
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
