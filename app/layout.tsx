import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pipery — Production-grade CI/CD pipelines',
  description:
    'Verified, reusable, and observable CI/CD pipelines for modern DevOps teams.',
  keywords: [
    'CI/CD',
    'DevOps',
    'pipelines',
    'GitHub Actions',
    'GitLab CI',
    'CircleCI',
    'continuous integration',
    'continuous delivery',
  ],
  authors: [{ name: 'Pipery', url: 'https://pipery.dev' }],
  openGraph: {
    title: 'Pipery — Production-grade CI/CD pipelines',
    description:
      'Verified, reusable, and observable CI/CD pipelines for modern DevOps teams.',
    url: 'https://pipery.dev',
    siteName: 'Pipery',
    type: 'website',
    images: [
      {
        url: 'https://pipery.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pipery — CI/CD pipelines',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pipery — Production-grade CI/CD pipelines',
    description:
      'Verified, reusable, and observable CI/CD pipelines for modern DevOps teams.',
    creator: '@pipery',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Pipery",
          "url": "https://pipery.dev",
          "description": "Verified, reusable, and observable CI/CD pipelines for modern DevOps teams.",
          "publisher": {
            "@type": "Organization",
            "name": "Pipery",
            "url": "https://pipery.dev",
            "logo": {
              "@type": "ImageObject",
              "url": "https://pipery.dev/logo.svg"
            }
          }
        }) }} />
      </body>
    </html>
  )
}
