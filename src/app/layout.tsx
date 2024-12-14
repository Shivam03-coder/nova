import { type Metadata } from "next";
import "@/styles/globals.css";
import { inter, poppins, lexend, manrope, spaceGrotesk } from "@/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import AppWrapper from "./app-wrapper";

export const metadata: Metadata = {
  title: "NOVA-X",
  description: "A NEW GENERATION DRAWING SOFTWARE",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${poppins.variable} ${lexend.variable} ${manrope.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <body>
            <AppWrapper>{children}</AppWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
