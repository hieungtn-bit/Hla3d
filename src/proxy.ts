import { NextResponse, type NextRequest } from "next/server";

/**
 * Keeps /dashboard private.
 *
 * The dashboard has always said "PRIVATE · DAD + 3 MAKERS" and shown a lock,
 * while being open to anyone with the URL and linked from the public footer.
 * This makes the label true.
 *
 * The password lives in the DASHBOARD_PASSWORD environment variable on
 * Vercel, set by Ba — never in this public repository. Until it is set the
 * dashboard stays shut for everyone, because the alternative (open until
 * someone remembers) is exactly the state this file exists to end.
 *
 * Any username works; only the password is checked.
 */
export function proxy(request: NextRequest) {
  const password = process.env.DASHBOARD_PASSWORD;

  if (!password) {
    return new NextResponse(
      "Bảng theo dõi này là của riêng Ba và ba anh em, và đang được khoá.\n",
      { status: 403, headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } },
    );
  }

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    let given = "";
    try {
      const decoded = new TextDecoder().decode(Uint8Array.from(atob(header.slice(6)), (c) => c.charCodeAt(0)));
      given = decoded.slice(decoded.indexOf(":") + 1);
    } catch {
      given = "";
    }
    if (sameText(given, password)) {
      const res = NextResponse.next();
      res.headers.set("cache-control", "private, no-store");
      return res;
    }
  }

  return new NextResponse("Cần mật khẩu.\n", {
    status: 401,
    headers: {
      "www-authenticate": 'Basic realm="HLA3D dashboard", charset="UTF-8"',
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

/** Compares without stopping at the first wrong character, so timing says nothing. */
function sameText(a: string, b: string): boolean {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
