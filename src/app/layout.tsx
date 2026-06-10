import type { Metadata, Viewport } from 'next';
import { Eczar, Nunito } from 'next/font/google';
import './globals.css';

const eczar = Eczar({
  variable: '--font-eczar',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Badshah Masala — Share Your Spice Story',
  description: 'Answer a few quick questions and enter our lucky draw to win a Badshah Premium Masala Gift Hamper.',
  openGraph: {
    title: 'Badshah Masala — Win a Hamper!',
    description: 'Answer a few quick questions and enter our lucky draw.',
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${eczar.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
