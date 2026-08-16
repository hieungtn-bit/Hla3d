import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HLA3D — Xưởng in 3D của ba anh em nhỏ",
    short_name: "HLA3D",
    description:
      "Hưng, Long và Anh tự nghĩ, tự làm, tự bán những món đồ in 3D — và học cách làm kinh doanh thật.",
    lang: "vi",
    start_url: "/",
    // Deliberately a browser app, not a standalone PWA: there is no service
    // worker, and pretending to be installable would only hide the URL bar
    // without any offline benefit.
    display: "browser",
    background_color: "#fff8ec",
    theme_color: "#fff8ec",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
