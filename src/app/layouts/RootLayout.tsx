import { Outlet, useLocation } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { useApp } from "../context/AppContext";

export function RootLayout() {
  const location = useLocation();
  const { darkMode } = useApp();

  const isFullscreenPage =
    location.pathname.startsWith("/messages/") ||
    location.pathname.startsWith("/create");

  return (
    <div
      className={`flex flex-col w-full max-w-[480px] mx-auto relative ${darkMode ? "dark" : ""} app-frame`}
      style={{ minHeight: "100dvh", backgroundColor: darkMode ? "#030712" : "#f3f4f6" }}
    >
      <main
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{
          paddingBottom: isFullscreenPage
            ? "env(safe-area-inset-bottom)"
            : "calc(4.5rem + env(safe-area-inset-bottom) + 0.5rem)",
        }}
      >
        <Outlet />
      </main>
      {!isFullscreenPage && <BottomNav />}
    </div>
  );
}
