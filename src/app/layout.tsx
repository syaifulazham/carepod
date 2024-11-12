import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Carepodlab (mockup)",
  description: "Carepodlab (mockup)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-50 antialiased`}
      >
        <div className="flex flex-col w-full items-center px-[10vw]">
          
          {children}
        </div>
        
      </body>
    </html>
  );
}
