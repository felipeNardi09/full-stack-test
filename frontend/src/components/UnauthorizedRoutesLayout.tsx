import { Outlet } from "react-router-dom";

export default function UnauthorizedRoutesLayout() {
  return (
    <div className="flex h-screen items-center">
      <Outlet />
    </div>
  );
}
