import { Playfair_Display, Open_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-display',
})

const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
})

export const metadata = {
  title: 'Искусство в деталях',
  description: 'Фото-квест Музея Академии Художеств',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${playfair.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}