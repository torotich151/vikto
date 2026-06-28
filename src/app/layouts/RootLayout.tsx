import { Outlet, useLocation } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { DesktopSidebar } from "../components/DesktopSidebar";
import { DesktopRightPanel } from "../components/DesktopRightPanel";
import { useApp } from "../context/AppContext";

const CHAT_PAGES = ["/messages/"];
const NO_RIGHT_PANEL = ["/messages", "/create", "/settings", "/edit-profile"];

export function RootLayout() {
  const location = useLocation();
  const { darkMode } = useApp();

  const isFullscreenPage =
    location.pathname.startsWith("/messages/") ||
    location.pathname.startsWith("/create");

  const isChatPage = CHAT_PAGES.some(p => location.pathname.startsWith(p));

  const showRightPanel = !NO_RIGHT_PANEL.some(p =>
    location.pathname === p || location.pathname.startsWith(p + "/")
  );

  return (
    <div className={`min-h-screen w-full ${darkMode ? "dark bg-gray-950" : "bg-gray-50"}`}>

      {/* ── DESKTOP layout ── */}
      <div className="hidden lg:flex min-h-screen">
        <DesktopSidebar />

        {/* Main content */}
        <main className={`flex-1 min-w-0 overflow-y-auto ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}
          style={{ maxHeight: "100vh" }}>
          {/* Desktop top bar */}
          <div className={`sticky top-0 z-30 border-b px-6 py-3.5 flex items-center justify-between ${darkMode ? "bg-gray-900/95 border-gray-800" : "bg-white/95 border-gray-100"} backdrop-blur`}>
            <h1 className={`font-bold text-xl capitalize ${darkMode ? "text-white" : "text-gray-900"}`}>
              {location.pathname === "/" ? "Home"
                : location.pathname.startsWith("/messages/") ? "Chat"
                : location.pathname.replace("/", "").replace(/-/g, " ") || "Home"}
            </h1>
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?img=30" alt="You" className="w-8 h-8 rounded-full object-cover ring-2 ring-[#E91E63]/30 cursor-pointer" />
            </div>
          </div>

          {/* Page content — centered, max-width responsive */}
          <div className={`mx-auto w-full ${isChatPage ? "max-w-full h-[calc(100vh-57px)] flex flex-col" : "max-w-2xl xl:max-w-3xl px-0 py-0"}`}>
            <Outlet />
          </div>
        </main>

        {/* Right panel — suggestions + trending */}
        {showRightPanel && <DesktopRightPanel />}
      </div>

      {/* ── MOBILE layout ── */}
      <div
        className={`lg:hidden flex flex-col w-full app-frame ${darkMode ? "dark" : ""}`}
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
    </div>
  );
}
