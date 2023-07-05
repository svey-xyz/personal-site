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
    <html lang="en">
      <body className="m-0" >{children}</body>
    </html>
  )
}
