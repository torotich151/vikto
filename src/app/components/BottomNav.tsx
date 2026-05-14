import { Link, useLocation } from "react-router";
import { Home, Users, PlusCircle, Bell, Menu } from "lucide-react";

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/explore", icon: Users, label: "Friends" },
    { path: "/create", icon: PlusCircle, label: "Create" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
    { path: "/profile", icon: Menu, label: "Menu" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-[480px] mx-auto z-50 shadow-lg"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          const isCenter = index === 2;

          if (isCenter) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-center -mt-8"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#E91E63] to-[#FF5722] flex items-center justify-center shadow-lg">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-1"
            >
              <Icon
                className={`w-6 h-6 ${isActive ? "text-[#E91E63]" : "text-gray-400"}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] ${isActive ? "text-[#E91E63] font-semibold" : "text-gray-400"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
