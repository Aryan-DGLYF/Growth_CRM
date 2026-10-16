
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Users,
} from "lucide-react";

const demoContacts = [
  { id: 1, name: "Sara Khan", company: "Northstar Academy", owner: "Anjum", status: "Qualified", updated: "2026-10-16", email: "sara@northstar.com", phone: "9876543210", source: "Website", priority: "High" },
  { id: 2, name: "Apex Systems", company: "Enterprise software", owner: "Anjum", status: "Qualified", updated: "2026-10-16", email: "contact@apex.com", phone: "9876543211", source: "Referral", priority: "Normal" },
  { id: 3, name: "GreenTech Ltd.", company: "Fintech platform", owner: "Sonam", status: "Proposal sent", updated: "2026-10-16", email: "hello@greentech.com", phone: "9876543212", source: "Website", priority: "High" },
  { id: 4, name: "Northstar Academy", company: "Education", owner: "Pawan", status: "In progress", updated: "2026-10-15", email: "info@northstar.com", phone: "9876543213", source: "Advertisement", priority: "Normal" },
  { id: 5, name: "Raghav Legal", company: "Law firm", owner: "Shanu", status: "New", updated: "2026-10-15", email: "contact@raghavlegal.com", phone: "9876543214", source: "Social Media", priority: "Low" },
  { id: 6, name: "Nova Services", company: "Consulting", owner: "Anjum", status: "Contacted", updated: "2026-10-14", email: "hello@nova.com", phone: "9876543215", source: "Website", priority: "Normal" },
  { id: 7, name: "Rahul Sharma", company: "Bright Future", owner: "Sonam", status: "New", updated: "2026-10-13", email: "rahul@example.com", phone: "9876543216", source: "Referral", priority: "Normal" },
  { id: 8, name: "Priya Verma", company: "Urban Living", owner: "Pawan", status: "Qualified", updated: "2026-10-12", email: "priya@example.com", phone: "9876543217", source: "Website", priority: "High" },
];

const colors = {
  Qualified: "bg-emerald-50 text-emerald-700",
  "Proposal sent": "bg-orange-50 text-orange-700",
  "In progress": "bg-amber-50 text-amber-700",
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-purple-50 text-purple-700",
  Converted: "bg-green-100 text-green-800",
};

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value + "T00:00:00");

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Contacts() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState(() => {
    try {
      const stored = localStorage.getItem("crm_contacts");

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((contact) => ({
            ...contact,
            updated:
              contact.updated_at ||
              contact.updated ||
              "",
          }));
        }
      }
    } catch (error) {
      console.error("Unable to load contacts:", error);
    }

    return demoContacts;
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [owner, setOwner] = useState("All");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const q = search.toLowerCase();

      const matchesSearch = [
        c.name,
        c.company,
        c.email,
        c.phone,
        c.owner,
      ].some((v) =>
        String(v || "").toLowerCase().includes(q)
      );

      const matchesStatus =
        status === "All" || c.status === status;

      const matchesOwner =
        owner === "All" || c.owner === owner;

      const contactDate =
        c.updated_at || c.updated || "";

      const matchesDate =
        !date ||
        String(contactDate).slice(0, 10) === date ||
        String(c.created_at || "").slice(0, 10) === date;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesOwner &&
        matchesDate
      );
    });
  }, [contacts, search, status, owner, date]);

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

  function saveContacts(next) {
    setContacts(next);

    try {
      localStorage.setItem(
        "crm_contacts",
        JSON.stringify(next)
      );
    } catch (error) {
      console.error("Unable to save contacts:", error);
      setNotice("Unable to save contacts.");
    }
  }

  function exportCSV() {
    const headers = [
      "Name",
      "Company",
      "Owner",
      "Status",
      "Updated",
      "Email",
      "Phone",
    ];

    const rows = filtered.map((c) => [
      c.name,
      c.company,
      c.owner,
      c.status,
      c.updated,
      c.email,
      c.phone,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map(
            (v) =>
              `"${String(v || "").replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const a = document.createElement("a");
    a.href = url;
    a.download = "crm-contacts.csv";
    a.click();

    URL.revokeObjectURL(url);
  }

  function removeContact(contact) {
    if (!window.confirm(`Delete ${contact.name}?`)) return;

    saveContacts(
      contacts.filter((c) => c.id !== contact.id)
    );

    setNotice("Contact deleted successfully.");
  }

  function addContact() {
    const name = window.prompt("Enter contact full name:");

    if (!name || !name.trim()) return;

    const email =
      window.prompt("Enter email address:") || "";

    const company =
      window.prompt("Enter company name:") || "";

    const today = new Date().toLocaleDateString("en-CA");

    const next = [
      {
        id: Date.now(),
        name: name.trim(),
        email,
        company,
        phone: "",
        owner: "Anjum",
        status: "New",
        updated: today,
        created_at: today,
        source: "Website",
        priority: "Normal",
      },
      ...contacts,
    ];

    saveContacts(next);
    setPage(1);
    setNotice("Contact created successfully.");
  }

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setOwner("All");
    setDate("");
    setPage(1);
  };

  const hasFilters =
    search !== "" ||
    status !== "All" ||
    owner !== "All" ||
    date !== "";

  return (
    <div className="min-h-screen bg-[#f7f9fc] p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px]">

        {/* Page heading */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs text-slate-400">
              CRM / Contacts
            </p>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Contacts directory
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              People and relationship history
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
            >
              <Download size={16} />
              Export
            </button>

            <button
              onClick={addContact}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={17} />
              New
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Total contacts
              </span>
              <Users size={19} className="text-blue-600" />
            </div>

            <p className="mt-3 text-2xl font-bold">
              {contacts.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">
              Qualified contacts
            </p>

            <p className="mt-3 text-2xl font-bold text-emerald-600">
              {contacts.filter((c) => c.status === "Qualified").length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">
              Follow-up needed
            </p>

            <p className="mt-3 text-2xl font-bold text-amber-600">
              {
                contacts.filter(
                  (c) =>
                    c.status === "New" ||
                    c.status === "In progress"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Search, filters and calendar */}
        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_auto_auto_auto]">

            {/* Search */}
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search records..."
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Status filter */}
            <div className="relative">
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full min-w-32 appearance-none rounded-lg border border-slate-200 bg-[#f7f9fc] py-2.5 pl-3 pr-8 text-sm outline-none focus:border-blue-500"
              >
                <option value="All">All statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In progress">In progress</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal sent">Proposal sent</option>
                <option value="Converted">Converted</option>
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {/* Owner filter */}
            <div className="relative">
              <select
                value={owner}
                onChange={(e) => {
                  setOwner(e.target.value);
                  setPage(1);
                }}
                className="w-full min-w-32 appearance-none rounded-lg border border-slate-200 bg-[#f7f9fc] py-2.5 pl-3 pr-8 text-sm outline-none focus:border-blue-500"
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

            {/* Calendar replaces Date range */}
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setPage(1);
                }}
                aria-label="Filter contacts by date"
                title="Filter by date"
                className="w-full min-w-40 rounded-lg border border-slate-200 bg-[#f7f9fc] px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>{filtered.length} matching records</span>

            {hasFilters && (
              <button
                onClick={resetFilters}
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Contacts table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  {[
                    "Contact",
                    "Company",
                    "Owner",
                    "Status",
                    "Updated",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visible.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-blue-50/40"
                  >
                    <td className="px-5 py-4">
                      <button
                        onClick={() => navigate(`/contacts/${c.id}`)}
                        className="text-sm font-semibold hover:text-blue-600"
                      >
                        {c.name}
                      </button>

                      <p className="mt-1 text-xs text-slate-400">
                        {c.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {c.company}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {c.owner}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded px-2.5 py-1.5 text-[11px] font-semibold ${
                          colors[c.status] ||
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-500">
                      {formatDate(c.updated)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <button
                          title="View profile"
                          onClick={() => navigate(`/contacts/${c.id}`)}
                          className="rounded p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          title="Edit contact"
                          onClick={() =>
                            navigate(`/contacts/${c.id}?edit=true`)
                          }
                          className="rounded p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          title="Delete contact"
                          onClick={() => removeContact(c)}
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
                      No contacts found. Try changing your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
                <ChevronLeft size={16} />
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
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Notification */}
        {notice && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl">
            {notice}

            <button onClick={() => setNotice("")}>
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
