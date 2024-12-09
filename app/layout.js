import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/utils/Navbar";
import Offers from "@/components/utils/Offers";
import {Poppins} from "next/font/google"
import { CartProvider } from "@/context/cartContext";

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

const PoppinsRegular = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--font-poppins",
  weight: "100 900",
})

export const metadata = {
  title: "Customise - Casemandu",
  description: "Customise your own phone case with Casemandu.",
};

const poppins = Poppins({subsets: ["latin"],  weight: '400',})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CartProvider>

      <body
        className={`${poppins.className}   antialiased`}
        >
        <Offers/>
        <Navbar />
        {children}
      </body>
        </CartProvider>
    </html>
  );
}
