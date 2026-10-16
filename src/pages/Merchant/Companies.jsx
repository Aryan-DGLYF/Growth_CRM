
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  X,
  Building2,
  ArrowLeft,
  BriefcaseBusiness,
  Users,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MessageSquare,
  Handshake,
  FileText,
  MoreHorizontal,
} from "lucide-react";

const initialCompanies = [
  {
    id: 1,
    name: "Apex Systems",
    industry: "Enterprise software",
    owner: "Anjum",
    status: "Qualified",
    updated: "2026-10-16",
    created: "2026-10-12",
    source: "Website",
    priority: "High",
    tier: "Tier A",
    email: "contact@apexsystems.com",
    phone: "+91 98765 43210",
    description: "Enterprise account",
  },
  {
    id: 2,
    name: "GreenTech Ltd.",
    industry: "Fintech platform",
    owner: "Sonam",
    status: "Proposal sent",
    updated: "2026-10-16",
    created: "2026-10-11",
    source: "Referral",
    priority: "Normal",
    tier: "Tier B",
    email: "hello@greentech.com",
    phone: "+91 98765 43211",
    description: "Fintech business account",
  },
  {
    id: 3,
    name: "Northstar Academy",
    industry: "Education",
    owner: "Pawan",
    status: "In progress",
    updated: "2026-10-15",
    created: "2026-10-10",
    source: "Website",
    priority: "Normal",
    tier: "Tier B",
    email: "info@northstar.com",
    phone: "+91 98765 43212",
    description: "Education account",
  },
  {
    id: 4,
    name: "Rahman Legal",
    industry: "Law firm",
    owner: "Shanu",
    status: "New",
    updated: "2026-10-15",
    created: "2026-10-09",
    source: "Advertisement",
    priority: "Normal",
    tier: "Tier C",
    email: "contact@rahmanlegal.com",
    phone: "+91 98765 43213",
    description: "Legal services account",
  },
  {
    id: 5,
    name: "Nova Services",
    industry: "Consulting",
    owner: "Anjum",
    status: "Contacted",
    updated: "2026-10-14",
    created: "2026-10-08",
    source: "Website",
    priority: "High",
    tier: "Tier A",
    email: "hello@novaservices.com",
    phone: "+91 98765 43214",
    description: "Consulting account",
  },
];

const statusStyles = {
  Qualified: "bg-emerald-50 text-emerald-700",
  "Proposal sent": "bg-orange-50 text-orange-700",
  "In progress": "bg-amber-50 text-amber-700",
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-purple-50 text-purple-700",
  Active: "bg-emerald-50 text-emerald-700",
};

function formatDate(value) {
  if (!value) return "—";

  const d = new Date(value + "T00:00:00");

  if (Number.isNaN(d.getTime())) return value;

  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Companies() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [owner, setOwner] = useState("All");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState("");
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    name: "",
    industry: "",
    owner: "Anjum",
    status: "New",
    email: "",
    phone: "",
    source: "Website",
    priority: "Normal",
    tier: "Tier C",
  });

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const q = search.toLowerCase();

      const matchSearch =
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.owner.toLowerCase().includes(q);

      const matchStatus =
        status === "All" || c.status === status;

      const matchOwner =
        owner === "All" || c.owner === owner;

      const matchDate =
        !date ||
        c.updated === date ||
        c.created === date;

      return (
        matchSearch &&
        matchStatus &&
        matchOwner &&
        matchDate
      );
    });
  }, [companies, search, status, owner, date]);

  const pageSize = 5;
  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / pageSize)
  );
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function notify(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function exportCSV() {
    const header = [
      "Company",
      "Industry",
      "Owner",
      "Status",
      "Updated",
      "Email",
      "Phone",
    ];

    const rows = filtered.map((c) => [
      c.name,
      c.industry,
      c.owner,
      c.status,
      c.updated,
      c.email,
      c.phone,
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row
          .map(
            (v) =>
              `"${String(v || "").replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "companies.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function openCreate() {
    setSelected(null);
    setForm({
      name: "",
      industry: "",
      owner: "Anjum",
      status: "New",
      email: "",
      phone: "",
      source: "Website",
      priority: "Normal",
      tier: "Tier C",
    });
    setModal("form");
  }

  function openEdit(company) {
    setSelected(company);
    setForm({
      ...company,
      name: company.name || "",
      industry: company.industry || "",
      owner: company.owner || "Anjum",
      status: company.status || "New",
      email: company.email || "",
      phone: company.phone || "",
      source: company.source || "Website",
      priority: company.priority || "Normal",
      tier: company.tier || "Tier C",
    });
    setModal("form");
  }

  function saveCompany(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.industry.trim()) {
      notify("Please enter company name and industry.");
      return;
    }

    const today = new Date().toLocaleDateString("en-CA");

    if (selected) {
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === selected.id
            ? {
                ...c,
                ...form,
                updated: today,
              }
            : c
        )
      );

      setSelected((prev) => ({
        ...prev,
        ...form,
        updated: today,
      }));

      notify("Company updated successfully.");
    } else {
      const company = {
        ...form,
        id: Date.now(),
        created: today,
        updated: today,
        description: `${form.industry} account`,
      };

      setCompanies((prev) => [company, ...prev]);
      setPage(1);
      notify("Company created successfully.");
    }

    setModal("");
  }

  function deleteCompany(company) {
    if (!window.confirm(`Delete ${company.name}?`)) return;

    setCompanies((prev) =>
      prev.filter((c) => c.id !== company.id)
    );

    if (selected?.id === company.id) {
      setSelected(null);
    }

    notify("Company deleted successfully.");
  }

  function resetFilters() {
    setSearch("");
    setStatus("All");
    setOwner("All");
    setDate("");
    setPage(1);
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">

        {/* Top navigation */}
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                growthOS
              </h1>
              <p className="text-xs text-slate-400">
                Customer relationship management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 sm:flex">
              <Search size={15} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                  setSelected(null);
                }}
                placeholder="Search anything..."
                className="w-40 bg-transparent text-sm outline-none"
              />
            </div>

            <button
              onClick={() => notify("You are all caught up.")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Help
            </button>

            <button
              onClick={() => notify("Signed in as Shanu Alam")}
              className="rounded-lg px-3 py-2 text-sm font-semibold"
            >
              ● Shanu Alam
              <ChevronDown size={13} className="ml-1 inline" />
            </button>
          </div>
        </header>

        {/* Main heading */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
              <span>Core</span>
              <span>/</span>
              <span>Companies</span>
              {selected && (
                <>
                  <span>/</span>
                  <span>Company profile</span>
                </>
              )}
            </div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {selected ? "Company profile" : "Companies / accounts"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {selected
                ? `${selected.name} • ${selected.description || selected.industry} • ${selected.tier}`
                : "Account records, hierarchy and relationship health"}
            </p>
          </div>

          {selected ? (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelected(null)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
              >
                <ArrowLeft size={16} />
                Back to companies
              </button>

              <button
                onClick={() => notify("Task action selected.")}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={16} />
                Add task
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
              >
                <Download size={16} />
                Export
              </button>

              <button
                onClick={openCreate}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                <Plus size={17} />
                New
              </button>
            </div>
          )}
        </div>

        {!selected ? (
          <>
            {/* Filters */}
            <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(200px,1fr)_150px_150px_180px]">

                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search records..."
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setPage(1);
                    }}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-[#f7f9fc] px-3 py-2.5 pr-8 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="All">All statuses</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal sent">Proposal sent</option>
                    <option value="In progress">In progress</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <div className="relative">
                  <select
                    value={owner}
                    onChange={(e) => {
                      setOwner(e.target.value);
                      setPage(1);
                    }}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-[#f7f9fc] px-3 py-2.5 pr-8 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="All">All owners</option>
                    <option value="Anjum">Anjum</option>
                    <option value="Sonam">Sonam</option>
                    <option value="Pawan">Pawan</option>
                    <option value="Shanu">Shanu</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                {/* Actual calendar date picker */}
                <div className="relative">
                  <CalendarDays
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setPage(1);
                    }}
                    aria-label="Filter companies by date"
                    className="w-full rounded-lg border border-slate-200 bg-[#f7f9fc] py-2.5 pl-9 pr-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <span>{filtered.length} matching records</span>

                {(search || status !== "All" || owner !== "All" || date) && (
                  <button
                    onClick={resetFilters}
                    className="font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Companies table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      {[
                        "Company",
                        "Industry",
                        "Owner",
                        "Status",
                        "Updated",
                        "Actions",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {visible.map((company) => (
                      <tr
                        key={company.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-blue-50/40"
                      >
                        <td className="px-5 py-4">
                          <button
                            onClick={() => setSelected(company)}
                            className="text-sm font-semibold hover:text-blue-600"
                          >
                            {company.name}
                          </button>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {company.industry}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {company.owner}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex whitespace-nowrap rounded px-2.5 py-1.5 text-[11px] font-semibold ${
                              statusStyles[company.status] ||
                              "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {company.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-xs text-slate-500">
                          {formatDate(company.updated)}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex gap-1">
                            <button
                              title="View company"
                              onClick={() => setSelected(company)}
                              className="rounded p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              title="Edit company"
                              onClick={() => openEdit(company)}
                              className="rounded p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              title="Delete company"
                              onClick={() => deleteCompany(company)}
                              className="rounded p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {visible.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-16 text-center text-sm text-slate-400"
                        >
                          No companies found. Try changing your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  Showing{" "}
                  {filtered.length
                    ? (currentPage - 1) * pageSize + 1
                    : 0}
                  –
                  {Math.min(currentPage * pageSize, filtered.length)}
                  {" of "}
                  {filtered.length} records
                </p>

                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="rounded-lg border p-2 disabled:opacity-30"
                  >
                    <ChevronLeft size={15} />
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, i) => i + 1
                  ).map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`h-8 min-w-8 rounded-lg px-2 text-xs ${
                        currentPage === n
                          ? "bg-blue-600 text-white"
                          : "hover:bg-slate-100"
                      }`}
                    >
                      {n}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="rounded-lg border p-2 disabled:opacity-30"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Company profile */
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <span className="inline-flex rounded bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase text-emerald-700">
                    Active
                  </span>

                  <h3 className="mt-4 text-lg font-bold">
                    {selected.name} · {selected.description || selected.industry} · {selected.tier}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {selected.industry}
                  </p>
                </div>

                <button
                  onClick={() => openEdit(selected)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
                >
                  <Pencil size={15} />
                  Edit company
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_0.9fr]">
              {/* Activity */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <h3 className="mb-5 text-base font-bold">
                  Activity & related records
                </h3>

                <div className="mb-6 flex flex-wrap gap-2">
                  <button className="rounded bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600">
                    Timeline
                  </button>
                  <button
                    onClick={() => notify("Company details are shown in Key details.")}
                    className="rounded px-4 py-2 text-xs text-slate-500 hover:bg-slate-50"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => notify("Task action selected.")}
                    className="rounded px-4 py-2 text-xs text-slate-500 hover:bg-slate-50"
                  >
                    Tasks
                  </button>
                  <button
                    onClick={() => notify("No files attached yet.")}
                    className="rounded px-4 py-2 text-xs text-slate-500 hover:bg-slate-50"
                  >
                    Files
                  </button>
                  <button
                    onClick={() => notify("No notes added yet.")}
                    className="rounded px-4 py-2 text-xs text-slate-500 hover:bg-slate-50"
                  >
                    Notes
                  </button>
                </div>

                <div className="space-y-7">
                  <div className="flex items-start gap-4">
                    <div className="rounded bg-blue-50 p-2 text-blue-600">
                      <CheckCircle2 size={17} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Record created</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Imported from website form
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {formatDate(selected.created)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded bg-blue-50 p-2 text-blue-600">
                      <Users size={17} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Owner assigned</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Assigned to {selected.owner}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded bg-blue-50 p-2 text-blue-600">
                      <CalendarDays size={17} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Follow-up scheduled</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Call planned for tomorrow
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded bg-blue-50 p-2 text-blue-600">
                      <MessageSquare size={17} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Note added</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Budget and next steps discussed
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Key details */}
              <div className="space-y-5">
                <section className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="mb-4 text-base font-bold">
                    Key details
                  </h3>

                  {[
                    ["Owner", selected.owner],
                    ["Created", formatDate(selected.created)],
                    ["Source", selected.source],
                    ["Priority", selected.priority],
                    ["Last contacted", formatDate(selected.updated)],
                    ["Email", selected.email || "—"],
                    ["Phone", selected.phone || "—"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-start justify-between gap-3 border-b border-slate-100 py-3 last:border-0"
                    >
                      <span className="text-xs text-slate-500">
                        {label}
                      </span>
                      <span className="max-w-[65%] break-all text-right text-xs font-semibold">
                        {value}
                      </span>
                    </div>
                  ))}
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="mb-4 text-sm font-bold">
                    Quick actions
                  </h3>

                  <div className="space-y-3">
                    <button
                      onClick={() => notify("Task action selected.")}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <Plus size={15} />
                      Add task
                    </button>

                    <button
                      onClick={() => notify(`Email: ${selected.email || "No email available"}`)}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <MessageSquare size={15} />
                      Send message
                    </button>

                    <button
                      onClick={() => notify("More actions selected.")}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <MoreHorizontal size={15} />
                      More actions
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* Create / Edit company modal */}
        {modal === "form" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
            <div className="my-auto w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <h3 className="text-lg font-bold">
                    {selected ? "Edit company" : "Create company"}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Add account information and ownership
                  </p>
                </div>

                <button
                  onClick={() => setModal("")}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={19} />
                </button>
              </div>

              <form onSubmit={saveCompany} className="p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="text-sm font-medium">
                    Company name *
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Enter company name"
                      className={inputClass}
                    />
                  </label>

                  <label className="text-sm font-medium">
                    Industry *
                    <input
                      required
                      value={form.industry}
                      onChange={(e) =>
                        setForm({ ...form, industry: e.target.value })
                      }
                      placeholder="e.g. Enterprise software"
                      className={inputClass}
                    />
                  </label>

                  <label className="text-sm font-medium">
                    Email address
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="name@company.com"
                      className={inputClass}
                    />
                  </label>

                  <label className="text-sm font-medium">
                    Phone number
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+91 00000 00000"
                      className={inputClass}
                    />
                  </label>

                  <label className="text-sm font-medium">
                    Owner
                    <select
                      value={form.owner}
                      onChange={(e) =>
                        setForm({ ...form, owner: e.target.value })
                      }
                      className={inputClass}
                    >
                      <option>Anjum</option>
                      <option>Sonam</option>
                      <option>Pawan</option>
                      <option>Shanu</option>
                    </select>
                  </label>

                  <label className="text-sm font-medium">
                    Status
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                      className={inputClass}
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>In progress</option>
                      <option>Qualified</option>
                      <option>Proposal sent</option>
                    </select>
                  </label>

                  <label className="text-sm font-medium">
                    Lead source
                    <select
                      value={form.source}
                      onChange={(e) =>
                        setForm({ ...form, source: e.target.value })
                      }
                      className={inputClass}
                    >
                      <option>Website</option>
                      <option>Referral</option>
                      <option>Advertisement</option>
                      <option>Social Media</option>
                    </select>
                  </label>

                  <label className="text-sm font-medium">
                    Priority
                    <select
                      value={form.priority}
                      onChange={(e) =>
                        setForm({ ...form, priority: e.target.value })
                      }
                      className={inputClass}
                    >
                      <option>Normal</option>
                      <option>High</option>
                      <option>Low</option>
                    </select>
                  </label>
                </div>

                <div className="mt-7 flex justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={() => setModal("")}
                    className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Save company
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {notice && (
          <div className="fixed bottom-5 right-5 z-[60] flex max-w-sm items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl">
            <BriefcaseBusiness size={17} />
            <span>{notice}</span>
            <button
              onClick={() => setNotice("")}
              className="ml-2"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <footer className="mt-6 flex items-center gap-2 text-[11px] text-slate-400">
          <FileText size={13} />
          Prototype screen · Sample data · Local UI interactions
        </footer>
      </div>
    </div>
  );
}
