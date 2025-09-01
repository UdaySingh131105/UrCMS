import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { GeistSans, GeistMono, Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import AuthProvider from "@/components/provider/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata = {
  title: "UrCMS - Blog Post Platform",
  description: "A modern CMS for creating, managing, and sharing blog posts with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins} antialiased`}
      >
        <AuthProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <SidebarTrigger />
              <NavBar />
              {children}
              <Toaster />
            </main>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
