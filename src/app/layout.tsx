import { type Metadata } from "next";
import "@/styles/globals.css";
import { inter, poppins, lexend, manrope, spaceGrotesk } from "@/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import AppProvider from "@/components/shared/providers/app-provider";

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
            <AppProvider>{children}</AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
