
import { NavLink } from "react-router-dom";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Users,
  ContactRound,
  Building2,
  Handshake,
  CheckSquare,
  CalendarDays,
  Inbox,
  ChartColumn,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", path: "/leads", icon: Users },
  { name: "Contacts", path: "/contacts", icon: ContactRound },
  { name: "Companies", path: "/companies", icon: Building2 },
  { name: "Deals", path: "/deals", icon: Handshake },
  { name: "Tasks", path: "/tasks", icon: CheckSquare },
  { name: "Calendar", path: "/calendar", icon: CalendarDays },
  { name: "Inbox", path: "/inbox", icon: Inbox },
  { name: "Reports", path: "/reports", icon: ChartColumn },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-[#17233e] text-white lg:flex">
      <div className="flex h-[72px] items-center gap-3 border-b border-white/10 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#3868e8]">
          <ChartNoAxesCombined size={19} />
        </div>
        <span className="text-lg font-bold">
          growth<span className="text-blue-300">OS</span>
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <p className="mb-3 px-3 text-[10px] font-bold tracking-[1.5px] text-slate-400">
          CORE
        </p>

        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `mb-1 flex h-10 items-center gap-3 rounded-md px-3 text-[13px] transition ${
                isActive
                  ? "bg-[#3868e8] font-semibold text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={17} strokeWidth={1.8} />
            {name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800">
            SA
          </div>
          <div>
            <p className="text-xs font-semibold">Shanu Alam</p>
            <p className="mt-1 text-[10px] text-slate-400">
              CRM Administrator
            </p>
          </div>
        </div>
        <p className="mt-4 text-[10px] text-slate-500">
          Universal Growth CRM
        </p>
      </div>
    </aside>
  );
}
