import { QuestProvider } from '@/context/QuestContext'
import './globals.css'

export const metadata = {
  title: 'Искусство в деталях',
  description: 'Фото-квест Музея Академии Художеств',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <QuestProvider>
          {children}
        </QuestProvider>
      </body>
    </html>
  )
}
