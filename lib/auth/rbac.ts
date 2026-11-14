import { getSession } from "./session";

export type StudioRole = "SuperAdmin" | "StudioOwner" | "Director" | "Editor" | "Viewer";

export const ROLE_PERMISSIONS: Record<StudioRole, string[]> = {
  SuperAdmin: ["*"],
  StudioOwner: [
    "projects:*",
    "scripts:*",
    "storyboard:*",
    "generation:*",
    "rendering:*",
    "publish:*",
    "publish:approve",
    "oauth:*",
    "analytics:*",
    "settings:*",
    "users:manage",
  ],
  Director: [
    "projects:*",
    "scripts:*",
    "storyboard:*",
    "generation:*",
    "rendering:*",
    "publish:approve",
    "analytics:view",
  ],
  Editor: [
    "projects:view",
    "projects:edit",
    "scripts:edit",
    "storyboard:edit",
    "generation:trigger",
    "rendering:trigger",
    "analytics:view",
  ],
  Viewer: [
    "projects:view",
    "scripts:view",
    "storyboard:view",
    "analytics:view",
  ],
};

export async function hasPermission(requiredPermission: string): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;

  const userRole = (session.role as StudioRole) || "Viewer";
  const userPermissions = ROLE_PERMISSIONS[userRole] || [];

  if (userPermissions.includes("*")) return true;

  const [requiredDomain, requiredAction] = requiredPermission.split(":");

  return userPermissions.some((perm) => {
    if (perm === requiredPermission) return true;
    const [domain, action] = perm.split(":");
    if (domain === requiredDomain && action === "*") return true;
    return false;
  });
}

export async function assertPermission(requiredPermission: string): Promise<void> {
  const allowed = await hasPermission(requiredPermission);
  if (!allowed) {
    throw new Error(`Unauthorized: Insufficient permissions for action '${requiredPermission}'`);
  }
}

