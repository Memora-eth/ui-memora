import type { Metadata } from "next";

import DarkMode from "@/components/common/DarkMode";
import "../../public/styles/style.css";

export const metadata: Metadata = {
  title: "Memora",
  description: "Memora",
};

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
