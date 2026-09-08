import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HLA3D — Xưởng in 3D của ba anh em nhỏ",
    short_name: "HLA3D",
    description:
      "Lớp tiếng Anh và lớp toán miễn phí của ba anh em Hưng, Long và Anh. Cuối tuần thì in 3D và bán đồ tự làm.",
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
