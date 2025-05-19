import CartForMobile from "@/components/shared/CartForMobile";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Toaster } from "@/components/ui/sonner";
import TokenExpirationContext from "@/context/TokenExpirationContext";
import TanstackProvider from "@/TanstackProvider/TanstackProvider";
import type { Metadata } from "next";
import { Montserrat, Roboto, Rubik } from "next/font/google";
import { Suspense } from "react";
import "../globals.css";
import StoreProvider from "./StoreProvider";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "900"],
});

const rubik = Rubik({
    variable: "--font-rubik",
    subsets: ["latin"],
});

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Lalon Store",
    description: "Get the best product",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${roboto.className} ${roboto.variable} ${rubik.variable} ${montserrat.variable} antialiased`}
                cz-shortcut-listen="true"
                suppressHydrationWarning>
                <StoreProvider>
                    <TanstackProvider>
                        <TokenExpirationContext>
                            <Suspense fallback={<div>Loading Root...</div>}>
                                <Header />
                                {children}
                                <Footer />
                                <CartForMobile />
                            </Suspense>
                        </TokenExpirationContext>
                    </TanstackProvider>
                    <Toaster richColors />
                </StoreProvider>
            </body>
        </html>
    );
}
