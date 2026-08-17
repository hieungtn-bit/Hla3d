import type { Metadata, Viewport } from "next";
import { Nunito, Baloo_2, JetBrains_Mono } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { AnalyticsProvider } from "@/lib/analytics";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { site } from "@/data/site";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/seo/structured-data";
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
  alternates: { canonical: "/" },
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
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "HLA3D — Ba anh em, một xưởng in 3D. Hưng 8 tuổi, Long 6 tuổi và Anh 5 tuổi.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HLA3D — Xưởng in 3D của ba anh em nhỏ",
    description: site.descriptionVi,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: { title: "HLA3D", capable: false },
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
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <AnalyticsProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
