// import { Noto_Sans_TC } from "@next/font/google";
import localFont from "next/font/local";
import "../styles/globals.css";
import "../styles/animations.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
// const fontNoto = Noto_Sans_TC({
//   variable: "--font-Noto-Sans-TC",
//   subsets: ["latin"],
//   weight: "100 200 300 400 500 600 700 800 900",
// });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
