import type { NavigateFunction } from "react-router-dom";

export const redirectToDashboard = (role: string, navigate: NavigateFunction) => {
  switch (role) {
    case "admin":
      navigate("/admin/dashboard", { replace: true });
      break;
    case "professor":
      navigate("/professor/dashboard", { replace: true });
      break;
    default:
      navigate("/", { replace: true });
  }
};
