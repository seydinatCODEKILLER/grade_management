export type UserRole = "admin" | "professor";

const DASHBOARD_PATHS: Record<UserRole, string> = {
  admin: "/admin/dashboard",
  professor: "/professor/dashboard",
};

export const pathToDashboardForUser = (role: UserRole): string => {
  return DASHBOARD_PATHS[role] ?? "/";
};
