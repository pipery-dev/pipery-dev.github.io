import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pipery — Production-grade CI/CD pipelines',
  description:
    'Verified, reusable, and observable CI/CD pipelines for modern DevOps teams.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
