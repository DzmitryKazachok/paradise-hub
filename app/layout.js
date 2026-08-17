import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import Footer from "./_components/Footer";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata = {
  title: {
    template: "%s | The Paradise Hub",
    default: "Welcome to The Paradise Hub",
  },
  description:
    "Paradise Hub is a website for luxury cabins and vacation rentals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex flex-1 flex-col px-8 py-12">
          <main className="mx-auto w-full max-w-7xl flex-1">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
