import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';

const inter = {
  className: 'font-sans',
};

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // This is to ensure that theme-related code only runs client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
} 