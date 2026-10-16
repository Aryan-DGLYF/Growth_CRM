
import { useState } from "react";
import { Search, Bell, ChevronDown, CircleHelp } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const location = useLocation();
  const currentPage =
    location.pathname.split("/")[1]?.replace(/^./, (c) => c.toUpperCase()) ||
    "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="relative hidden w-full max-w-md sm:block">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search anything..."
          className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <p className="text-sm font-semibold text-slate-700 sm:hidden">
        {currentPage}
      </p>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="hidden items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 sm:flex">
          <CircleHelp size={16} />
          Help
        </button>

        <div className="relative">
          <button
            aria-label="Notifications"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <Bell size={19} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 w-60 rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
              <p className="text-sm font-semibold">Notifications</p>
              <p className="mt-2 text-xs text-slate-500">
                You are all caught up.
              </p>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
              SA
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold text-slate-800">
                Shanu Alam
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500">
                Administrator
              </p>
            </div>
            <ChevronDown size={15} className="hidden text-slate-400 sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-44 rounded-lg border border-slate-200 bg-white p-2 shadow-xl">
              <button
                onClick={() => setProfileOpen(false)}
                className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-slate-50"
              >
                My Profile
              </button>
              <button
                onClick={() => setProfileOpen(false)}
                className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-slate-50"
              >
                Account Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
