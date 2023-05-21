import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ethereum and polygon small explorer",
  description: "Handcrafted nextjs 13 app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="lg:container lg:mx-auto">{children}</div>
      </body>
    </html>
  );
}
