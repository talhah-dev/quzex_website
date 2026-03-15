export function normalizeImageSrc(src?: string) {
  const value = String(src || "").trim();

  if (!value) {
    return "";
  }

  try {
    const parsed = value.startsWith("http")
      ? new URL(value)
      : new URL(value, "http://localhost:3000");

    if (parsed.pathname === "/_next/image") {
      const originalUrl = parsed.searchParams.get("url");

      if (originalUrl) {
        return originalUrl;
      }
    }
  } catch {
    return value;
  }

  return value;
}
