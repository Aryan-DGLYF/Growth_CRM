
import { useState } from "react";
import {
  UserRound,
  Bell,
  ShieldCheck,
  Building2,
  Globe,
  Save,
  CheckCircle2,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

const initialSettings = {
  fullName: "Shanu Alam",
  company: "Universal Growth",
  email: "admin@example.com",
  phone: "",
  timezone: "Asia/Kolkata",
  language: "English",
  emailNotifications: true,
  desktopNotifications: false,
  weeklyReport: true,
  twoFactor: false,
};

const sections = [
  { label: "Profile", icon: UserRound },
  { label: "Company", icon: Building2 },
  { label: "Notifications", icon: Bell },
  { label: "Regional Preferences", icon: Globe },
  { label: "Security", icon: ShieldCheck },
];

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-blue-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className={inputClass}
      />
    </label>
  );
}

export default function Setting() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeSection, setActiveSection] = useState("Profile");
  const [notice, setNotice] = useState("");

  function update(field, value) {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
    setNotice("");
  }

  function handleSave(event) {
    event.preventDefault();

    // Demo only: save changes in this component's React state.
    setNotice("Your settings have been updated successfully.");
  }

  function handleReset() {
    setSettings(initialSettings);
    setNotice("Settings have been reset.");
  }

  function renderSection() {
    switch (activeSection) {
      case "Profile":
        return (
          <section>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <UserRound size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Update your name and contact details.
                </p>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                {settings.fullName
                  .split(" ")
                  .filter(Boolean)
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-slate-800">
                  {settings.fullName || "Your name"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  CRM Administrator
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Full name"
                value={settings.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
              <Field
                label="Email address"
                type="email"
                value={settings.email}
                onChange={(e) => update("email", e.target.value)}
              />
              <Field
                label="Phone number"
                value={settings.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
          </section>
        );

      case "Company":
        return (
          <section>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Building2 size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">
                  Company Information
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Manage your organization's details.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field
                  label="Company name"
                  value={settings.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </div>
              <Field
                label="Administrator"
                value={settings.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
              <Field
                label="Company email"
                type="email"
                value={settings.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
          </section>
        );

      case "Notifications":
        return (
          <section>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Bell size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">
                  Notification Preferences
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Choose which updates you want to receive.
                </p>
              </div>
            </div>

            {[
              {
                key: "emailNotifications",
                title: "Email notifications",
                description: "Receive updates about CRM activity.",
              },
              {
                key: "desktopNotifications",
                title: "Desktop notifications",
                description: "Enable browser notifications where supported.",
              },
              {
                key: "weeklyReport",
                title: "Weekly reports",
                description: "Keep track of your weekly performance.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-4 border-b border-slate-100 py-5"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>
                <Toggle
                  label={item.title}
                  checked={settings[item.key]}
                  onChange={(value) => update(item.key, value)}
                />
              </div>
            ))}
          </section>
        );

      case "Regional Preferences":
        return (
          <section>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Globe size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">
                  Regional Preferences
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Customize language and timezone.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Timezone
                <select
                  value={settings.timezone}
                  onChange={(e) => update("timezone", e.target.value)}
                  className={inputClass}
                >
                  <option value="Asia/Kolkata">
                    India Standard Time (IST)
                  </option>
                  <option value="UTC">UTC</option>
                  <option value="Europe/London">
                    United Kingdom
                  </option>
                  <option value="America/New_York">
                    Eastern Time
                  </option>
                </select>
              </label>

              <label className="text-sm font-medium text-slate-700">
                Language
                <select
                  value={settings.language}
                  onChange={(e) => update("language", e.target.value)}
                  className={inputClass}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </label>
            </div>
          </section>
        );

      case "Security":
        return (
          <section>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <ShieldCheck size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">
                  Security Settings
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Review your account security preferences.
                </p>
              </div>
            </div>

            <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
              <div className="flex items-start gap-3">
                <LockKeyhole
                  size={20}
                  className="mt-1 text-blue-600"
                />
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Two-factor authentication
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Demo preference only; no authentication is activated.
                  </p>
                </div>
              </div>
              <Toggle
                label="Two-factor authentication"
                checked={settings.twoFactor}
                onChange={(value) => update("twoFactor", value)}
              />
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-800">
                Password management
              </p>
              <p className="mt-1 text-xs leading-5 text-amber-700">
                Password changes and real security controls require
                a secure authentication system. This UI does not
                change your password.
              </p>
            </div>
          </section>
        );

      default:
        return null;
    }
  }

  return (
    <div className="min-h-full bg-[#f5f7fb] p-4 text-slate-800 sm:p-7">
      <div className="mb-7">
        <p className="mb-2 text-xs text-slate-400">
          Core / Settings
        </p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your account, company and application preferences.
        </p>
      </div>

      {notice && (
        <div
          role="status"
          className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
        >
          <CheckCircle2 size={19} />
          {notice}
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[245px_minmax(0,1fr)]">
        <aside className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <p className="px-3 py-3 text-[10px] font-bold uppercase tracking-[1.5px] text-slate-400">
            Settings menu
          </p>

          {sections.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setActiveSection(label);
                setNotice("");
              }}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                activeSection === label
                  ? "bg-blue-600 font-semibold text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </button>
          ))}
        </aside>

        <form
          onSubmit={handleSave}
          className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5 sm:p-7">
            <div>
              <h2 className="text-lg font-bold">
                {activeSection}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage your {activeSection.toLowerCase()} details.
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Save size={16} />
              Save changes
            </button>
          </div>

          <div className="p-5 sm:p-7">
            {renderSection()}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-7">
            <p className="text-xs text-slate-400">
              Universal Growth CRM
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Reset
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Save size={15} />
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
        <User size={14} />
        Settings are currently running in local demo mode.
        <Mail size={14} />
      </div>
    </div>
  );
}
