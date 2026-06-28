import { Link, useLocation } from "react-router";
import { Home, Compass, PlusCircle, Bell, User } from "lucide-react";

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/explore", icon: Compass, label: "Explore" },
    { path: "/create", icon: PlusCircle, label: "Create" },
    { path: "/notifications", icon: Bell, label: "Alerts" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-50 shadow-lg lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item, index) => {
          const isActive = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
          const Icon = item.icon;
          const isCenter = index === 2;

          if (isCenter) {
            return (
              <Link key={item.path} to={item.path} className="flex items-center justify-center -mt-8">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#E91E63] to-[#FF5722] flex items-center justify-center shadow-lg shadow-pink-300/40">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
              </Link>
            );
          }

          return (
            <Link key={item.path} to={item.path} className="flex flex-col items-center justify-center gap-1 flex-1 py-1 relative">
              <Icon
                className={`w-6 h-6 ${isActive ? "text-[#E91E63]" : "text-gray-400 dark:text-gray-500"}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {/* Unread badge */}
              {item.path === "/notifications" && (
                <span className="absolute top-1 right-[calc(50%-12px)] w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">7</span>
              )}
              <span className={`text-[10px] ${isActive ? "text-[#E91E63] font-semibold" : "text-gray-400 dark:text-gray-500"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
