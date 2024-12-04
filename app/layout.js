import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/utils/Navbar";
import Offers from "@/components/utils/Offers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Customise - Casemandu",
  description: "Customise your own phone case with Casemandu.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Offers/>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
