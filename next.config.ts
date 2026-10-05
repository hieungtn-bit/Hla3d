import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * The lab and journal pages told stories nobody in the family had told —
   * print counts, failures, a queue. They are gone; old links land on the
   * About page, which says what is actually true.
   */
  async redirects() {
    return [
      { source: "/lab", destination: "/about#safety", permanent: true },
      { source: "/journal", destination: "/about", permanent: true },
      { source: "/journal/:slug", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
