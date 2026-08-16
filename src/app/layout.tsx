import type { Metadata, Viewport } from "next";
import { Nunito, Baloo_2, JetBrains_Mono } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// Baloo 2 is chunky and rounded — it reads as a kid's brand without tipping
// into a nursery font. Nunito keeps body copy friendly but still readable at
// paragraph length. Both carry the full Vietnamese diacritic set.
const display = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const sans = Nunito({
  variable: "--font-nunito",
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
    default: "HLA3D — Xưởng in 3D của ba anh em nhỏ",
    template: "%s — HLA3D",
  },
  description: site.descriptionVi,
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
    title: "HLA3D — Xưởng in 3D của ba anh em nhỏ",
    description: site.descriptionVi,
  },
  twitter: {
    card: "summary_large_image",
    title: "HLA3D — Xưởng in 3D của ba anh em nhỏ",
    description: site.descriptionVi,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fff8ec",
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
