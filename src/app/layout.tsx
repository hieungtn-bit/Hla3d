import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "HLA3D — Young Maker 3D Printing Lab",
    template: "%s — HLA3D",
  },
  description: site.description,
  keywords: [
    "in 3D",
    "3D printing Vietnam",
    "bảng tên 3D",
    "flexi toys",
    "custom name plate",
    "young makers",
    "HLA3D",
  ],
  authors: [{ name: "HLA3D" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl(),
    siteName: site.name,
    title: "HLA3D — Young Maker 3D Printing Lab",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "HLA3D — Young Maker 3D Printing Lab",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f2ed",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
