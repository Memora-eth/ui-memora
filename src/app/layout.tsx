import type { Metadata } from "next";
import "swiper/css";

import DarkMode from "@/components/common/DarkMode";
import "../../public/styles/style.css";

export const metadata: Metadata = {
  title: 'Memora',
  description: 'Secure your digital legacy with Memora',
  icons: {
    icon: [
      { url: '/img/favicon.ico', sizes: 'any' },
      { url: '/img/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/img/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/img/apple-touch-icon.png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/img/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/img/android-chrome-512x512.png' },
    ],
  },
  manifest: '/img/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        itemScope
        itemType="http://schema.org/WebPage"
        className={
          "overflow-x-hidden font-body text-jacarta-500 dark:bg-jacarta-900"
        }
      >
        <DarkMode />
        {children}
      </body>
    </html>
  );
}
