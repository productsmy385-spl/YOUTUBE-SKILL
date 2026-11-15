import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.AUTH_SECRET || "sir-youtube-studio-default-super-secret-key-32-chars";
const encodedKey = new TextEncoder().encode(SECRET_KEY);

export const DEFAULT_WORKSPACE_ID = "00000000-0000-0000-0000-000000000001";
export const DEFAULT_USER_ID = "00000000-0000-0000-0000-000000000002";

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  workspaceId: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sir_studio_session")?.value;

    if (!token) {
      return {
        userId: DEFAULT_USER_ID,
        email: "creator@sir-studio.ai",
        role: "StudioOwner",
        workspaceId: DEFAULT_WORKSPACE_ID,
      };
    }

    const verified = await verifySessionToken(token);
    if (!verified) {
      return {
        userId: DEFAULT_USER_ID,
        email: "creator@sir-studio.ai",
        role: "StudioOwner",
        workspaceId: DEFAULT_WORKSPACE_ID,
      };
    }
    return verified;
  } catch {
    return {
      userId: DEFAULT_USER_ID,
      email: "creator@sir-studio.ai",
      role: "StudioOwner",
      workspaceId: DEFAULT_WORKSPACE_ID,
    };
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("sir_studio_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("sir_studio_session");
}
