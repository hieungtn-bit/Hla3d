import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * HLA3D is a learning site. The shop, order form, gift finder, name studio
   * and sales dashboard were removed: the 3D printer at home is for the
   * children to learn with, not to sell from. Old links land on the page
   * that replaced them rather than on a 404.
   */
  /*
   * Baseline hardening for a site children use. No CSP yet: the JSON-LD and
   * analytics scripts would need nonces, and a wrong CSP breaks lessons.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Lessons only speak (speechSynthesis); nothing listens, films or locates.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
    ];
  },
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/shop", destination: "/goc-in-3d", permanent: true },
      { source: "/shop/:slug", destination: "/goc-in-3d", permanent: true },
      { source: "/chon-qua", destination: "/goc-in-3d", permanent: true },
      { source: "/custom", destination: "/goc-in-3d", permanent: true },
      { source: "/dat-hang", destination: "/goc-in-3d", permanent: true },
      { source: "/order/:path*", destination: "/goc-in-3d", permanent: true },
      { source: "/feed.json", destination: "/llms.txt", permanent: true },
      { source: "/dashboard", destination: "/hom-nay", permanent: true },
      { source: "/dashboard/:path*", destination: "/hom-nay", permanent: true },
      { source: "/lab", destination: "/goc-in-3d", permanent: true },
      { source: "/journal", destination: "/about", permanent: true },
      { source: "/journal/:slug", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
