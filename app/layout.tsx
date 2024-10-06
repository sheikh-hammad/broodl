// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import { Fugaz_One, Open_Sans } from "next/font/google";
// import "./globals.css";
// import Link from "next/link";
// import { AuthProvider } from "@/context/AuthContext";
// import Head from "./head";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
// const openSans = Open_Sans({ subsets: ["latin"], weight: ["400"] });

// export const metadata: Metadata = {
//   title: "Broodl",
//   description: "Track your daily mood everyday of the year",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const header = (
//     <header className="p-4 sm:p-8 flex justify-between items-center gap-4">
//       <Link href="/">
//         <h1
//           className={
//             "text-base sm:text-lg textGradient text-slate-800 " +
//             fugazOne.className
//           }
//         >
//           Broodl
//         </h1>
//       </Link>
//       <div className="flex items-center justify-between">
//         PLACEHOLDER || CTA
//       </div>
//     </header>
//   );
//   const footer = (
//     <footer className="p-4 sm:p-8 grid place-items-center">
//       <p className={"text-indigo-900 " + fugazOne.className}>Created with ❤️</p>
//     </footer>
//   );
//   return (
//     <html lang="en">
//       <Head/>
//       <AuthProvider>
//         <body
//           className={
//             "w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col " +
//             openSans.className
//           }
//         >
//           {header}
//           {children}
//           {footer}
//         </body>
//       </AuthProvider>
//     </html>
//   );
// }

import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";
import Logout from "@/components/Logout";

const opensans = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export const metadata = {
  title: "Broodl",
  description: "Track your daily mood every day of the year!",
};
// Define the type for the props of RootLayout
interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={'/'}>
        <h1 className={'text-base sm:text-lg textGradient ' + fugaz.className}>Broodl</h1>
      </Link>
      <Logout />
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <Link href={'https://youtu.be/lkjrUW8fI40'} target="_blank" className="">
        <p className={'text-indigo-500 duration-200 hover:text-white hover:bg-indigo-500  ' + fugaz.className}>Built by Muhammad Hammad</p>
      </Link>
    </footer>
  )

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800  ' + opensans.className}>
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
