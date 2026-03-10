export const ADMIN_SESSION_COOKIE = "quzex_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

type AdminSessionPayload = {
  sub: string;
  email: string;
  role: "admin";
  exp: number;
};

function getSessionSecret() {
  return process.env.AUTH_SECRET || "quzex-dev-secret-change-me";
}

function base64UrlEncode(value: string) {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return atob(`${normalized}${padding}`);
}

async function signValue(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  const bytes = Array.from(new Uint8Array(signature), (byte) => String.fromCharCode(byte)).join("");

  return base64UrlEncode(bytes);
}

export async function createAdminSessionToken(payload: Omit<AdminSessionPayload, "exp">) {
  const sessionPayload: AdminSessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(sessionPayload));
  const signature = await signValue(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionToken(token: string) {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = await signValue(encodedPayload);

  if (expectedSignature !== signature) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminSessionPayload;

    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getAdminSessionMaxAge() {
  return SESSION_MAX_AGE;
}
