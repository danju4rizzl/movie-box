import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Welcome to Movie Box',
  description: 'A movie app called Movie Box'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          {/* TODO: Add footer here */}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
