import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * HLA3D is a learning site. The shop, order form, gift finder, name studio
   * and sales dashboard were removed: the 3D printer at home is for the
   * children to learn with, not to sell from. Old links land on the page
   * that replaced them rather than on a 404.
   */
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
