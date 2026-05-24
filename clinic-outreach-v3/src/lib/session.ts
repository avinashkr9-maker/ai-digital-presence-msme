import { cookies } from "next/headers";
import crypto from "crypto";

export const SESSION_COOKIE = "dikhao_admin_session";

// Secret used to sign session tokens. MUST be set in env for production.
function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    // Fail closed: without a real secret, no session can be valid.
    return "";
  }
  return secret;
}

// Create a signed token: base64(payload).hmac
// Payload carries an issued-at timestamp so tokens can expire.
export function createSessionToken(): string {
  const secret = getSecret();
  if (!secret) return "";
  const payload = JSON.stringify({ iat: Date.now() });
  const payloadB64 = Buffer.from(payload).toString("base64url");
  const sig = crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${sig}`;
}

// Verify a token: signature must match AND not be older than maxAgeMs.
export function verifySessionToken(token: string | undefined): boolean {
  const secret = getSecret();
  if (!secret || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sig] = parts;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");
  // Constant-time compare to avoid timing attacks.
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;
  try {
    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8"),
    );
    const maxAgeMs = 1000 * 60 * 60 * 24 * 7; // 7 days
    if (typeof payload.iat !== "number") return false;
    if (Date.now() - payload.iat > maxAgeMs) return false;
    return true;
  } catch {
    return false;
  }
}

export async function hasSession(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
