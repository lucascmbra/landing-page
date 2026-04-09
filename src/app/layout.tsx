import { Metadata } from "next"
import "./globals.scss"

export const metadata: Metadata = {
  title: "FIAP | A Melhor Faculdade de Tecnologia do Brasil",
  description:
    "Estude na FIAP, referência em tecnologia, inovação e negócios. Cursos de curta duração e imersões com foco no mercado e no futuro digital.",
  icons: {
    icon: [{ url: "/assets/img/favicon.ico" }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
