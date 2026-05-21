import { cookies } from "next/headers";

export const SESSION_COOKIE = "dikhao_admin_session";

export async function hasSession() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === "active";
}
