import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { QuickOrderBar } from "@/components/layout/quick-order-bar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-bold focus:text-paper"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      {/* Bottom padding so the fixed bar never covers the last row of content. */}
      <div className="h-20 md:hidden" aria-hidden />
      <QuickOrderBar />
    </>
  );
}
