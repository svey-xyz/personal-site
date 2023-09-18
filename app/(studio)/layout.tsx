import '@styles/globals.css'

export const metadata = {
  title: 'Studio',
  description: 'Sanity.io Studio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className="m-0 h-0" >{children}</body>
    </html>
  )
}
