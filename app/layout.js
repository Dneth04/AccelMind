import { ClerkProvider } from "@clerk/nextjs"; // Import ClerkProvider
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FlashLearn",
  description: "An AI-powered Flashcard Generator SaaS App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>  {/* Wrap the content in ClerkProvider */}
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
