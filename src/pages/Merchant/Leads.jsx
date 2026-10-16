
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Users,
  Filter,
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
} from "lucide-react";

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const initialLeads = [
  {
    id: 1,
    name: "Apex Systems",
    company: "Enterprise software",
    owner: "Anjum",
    status: "Qualified",
    updated: "Today",
    updatedDate: getToday(),
    email: "contact@apex.com",
    phone: "9876543210",
  },
  {
    id: 2,
    name: "GreenTech Ltd.",
    company: "Fintech platform",
    owner: "Sonam",
    status: "Proposal sent",
    updated: "Today",
    updatedDate: getToday(),
    email: "hello@greentech.com",
    phone: "9876543211",
  },
  {
    id: 3,
    name: "Northstar Academy",
    company: "Education",
    owner: "Pawan",
    status: "In progress",
    updated: "Yesterday",
    updatedDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    })(),
    email: "info@northstar.com",
    phone: "9876543212",
  },
  {
    id: 4,
    name: "Raghav Legal",
    company: "Law firm",
    owner: "Shanu",
    status: "New",
    updated: "Yesterday",
    updatedDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    })(),
    email: "contact@raghavlegal.com",
    phone: "9876543213",
  },
  {
    id: 5,
    name: "Nova Services",
    company: "Consulting",
    owner: "Anjum",
    status: "Contacted",
    updated: "Oct 14",
    updatedDate: "2026-10-14",
    email: "hello@novaservices.com",
    phone: "9876543214",
  },
  {
    id: 6,
    name: "Bright Future",
    company: "Technology",
    owner: "Sonam",
    status: "New",
    updated: "Oct 13",
    updatedDate: "2026-10-13",
    email: "info@brightfuture.com",
    phone: "9876543215",
  },
  {
    id: 7,
    name: "Urban Living",
    company: "Real estate",
    owner: "Pawan",
    status: "Qualified",
    updated: "Oct 12",
    updatedDate: "2026-10-12",
    email: "sales@urbanliving.com",
    phone: "9876543216",
  },
  {
    id: 8,
    name: "Cloud Matrix",
    company: "Cloud services",
    owner: "Shanu",
    status: "Proposal sent",
    updated: "Oct 11",
    updatedDate: "2026-10-11",
    email: "team@cloudmatrix.com",
    phone: "9876543217",
  },
  {
    id: 9,
    name: "Pixel Works",
    company: "Digital agency",
    owner: "Anjum",
    status: "In progress",
    updated: "Oct 10",
    updatedDate: "2026-10-10",
    email: "hi@pixelworks.com",
    phone: "9876543218",
  },
  {
    id: 10,
    name: "Smart Finance",
    company: "Financial services",
    owner: "Sonam",
    status: "Contacted",
    updated: "Oct 09",
    updatedDate: "2026-10-09",
    email: "support@smartfinance.com",
    phone: "9876543219",
  },
];

const statuses = [
  "New",
  "Contacted",
  "In progress",
  "Qualified",
  "Proposal sent",
  "Converted",
  "Lost",
];

const statusColors = {
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-orange-50 text-orange-700",
  "In progress": "bg-amber-50 text-amber-700",
  Qualified: "bg-emerald-50 text-emerald-700",
  "Proposal sent": "bg-orange-50 text-orange-700",
  Converted: "bg-green-100 text-green-800",
  Lost: "bg-red-50 text-red-700",
};

export default function Leads() {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ownerFilter, setOwnerFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [viewLead, setViewLead] = useState(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    owner: "Anjum",
    status: "New",
    email: "",
    phone: "",
  });

  const pageSize = 5;

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const query = search.toLowerCase();

      const matchesSearch =
        lead.name.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query) ||
        lead.owner.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      const matchesOwner =
        ownerFilter === "All" || lead.owner === ownerFilter;

      const matchesDate =
        !selectedDate || lead.updatedDate === selectedDate;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesOwner &&
        matchesDate
      );
    });
  }, [
    leads,
    search,
    statusFilter,
    ownerFilter,
    selectedDate,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLeads.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleLeads = filteredLeads.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function openAddModal() {
    setSelectedLead(null);
    setForm({
      name: "",
      company: "",
      owner: "Anjum",
      status: "New",
      email: "",
      phone: "",
    });
    setShowModal(true);
  }

  function openEditModal(lead) {
    setSelectedLead(lead);
    setForm({
      name: lead.name,
      company: lead.company,
      owner: lead.owner,
      status: lead.status,
      email: lead.email,
      phone: lead.phone,
    });
    setShowModal(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.company.trim()) {
      return;
    }

    const today = getToday();

    if (selectedLead) {
      setLeads((previous) =>
        previous.map((lead) =>
          lead.id === selectedLead.id
            ? {
                ...lead,
                ...form,
                updated: "Today",
                updatedDate: today,
              }
            : lead
        )
      );
      setMessage("Lead updated successfully.");
    } else {
      setLeads((previous) => [
        {
          id: Date.now(),
          ...form,
          updated: "Today",
          updatedDate: today,
        },
        ...previous,
      ]);
      setMessage("New lead added successfully.");
      setPage(1);
    }

    setShowModal(false);
  }

  function deleteLead(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmed) return;

    setLeads((previous) =>
      previous.filter((lead) => lead.id !== id)
    );

    setMessage("Lead deleted successfully.");
  }

  function exportCSV() {
    const headers = [
      "Lead Name",
      "Company / Source",
      "Owner",
      "Status",
      "Updated",
      "Date",
      "Email",
      "Phone",
    ];

    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.company,
      lead.owner,
      lead.status,
      lead.updated,
      lead.updatedDate,
      lead.email,
      lead.phone,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map(
            (value) =>
              '"' +
              String(value ?? "").replace(/"/g, '""') +
              '"'
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "crm-leads.csv";
    link.click();

    URL.revokeObjectURL(url);
    setMessage("Leads exported successfully.");
  }

  function changeFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
              <span>CRM</span>
              <span>/</span>
              <span className="text-blue-600">Leads</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              Leads list
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Capture, qualify, assign and convert leads
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <Download size={16} />
              Export
            </button>

            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={17} />
              New Lead
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Total Leads</p>
              <Users className="text-blue-600" size={19} />
            </div>
            <h2 className="mt-3 text-2xl font-bold">{leads.length}</h2>
            <p className="mt-1 text-xs text-slate-400">
              All registered leads
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Qualified</p>
            <h2 className="mt-3 text-2xl font-bold text-emerald-600">
              {leads.filter((l) => l.status === "Qualified").length}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Ready for conversion
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">In Progress</p>
            <h2 className="mt-3 text-2xl font-bold text-amber-600">
              {leads.filter((l) => l.status === "In progress").length}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Currently being followed up
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Converted</p>
            <h2 className="mt-3 text-2xl font-bold text-blue-600">
              {leads.filter((l) => l.status === "Converted").length}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Successfully converted
            </p>
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) =>
                  changeFilter(setSearch, e.target.value)
                }
                placeholder="Search records..."
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:flex">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    changeFilter(setStatusFilter, e.target.value)
                  }
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-[#f7f9fc] py-2.5 pl-3 pr-9 text-sm outline-none focus:border-blue-500 xl:w-40"
                >
                  <option value="All">All statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={ownerFilter}
                  onChange={(e) =>
                    changeFilter(setOwnerFilter, e.target.value)
                  }
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-[#f7f9fc] py-2.5 pl-3 pr-9 text-sm outline-none focus:border-blue-500 xl:w-36"
                >
                  <option value="All">All owners</option>
                  <option value="Anjum">Anjum</option>
                  <option value="Sonam">Sonam</option>
                  <option value="Pawan">Pawan</option>
                  <option value="Shanu">Shanu</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              {/* Single date filter */}
              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="date"
                  aria-label="Filter by updated date"
                  value={selectedDate}
                  onChange={(e) =>
                    changeFilter(setSelectedDate, e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-[#f7f9fc] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 xl:w-44"
                />
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-xs text-slate-500">
              <Filter size={14} />
              {filteredLeads.length} matching records
            </p>

            {(search ||
              statusFilter !== "All" ||
              ownerFilter !== "All" ||
              selectedDate) && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                  setOwnerFilter("All");
                  setSelectedDate("");
                  setPage(1);
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-white">
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Lead Name
                  </th>
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Company / Source
                  </th>
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Owner
                  </th>
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-4 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Updated
                  </th>
                  <th className="px-5 py-4 text-right text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-slate-100 transition last:border-0 hover:bg-blue-50/40"
                  >
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setViewLead(lead)}
                        className="text-sm font-semibold text-slate-800 hover:text-blue-600"
                      >
                        {lead.name}
                      </button>
                      <p className="mt-1 text-xs text-slate-400">
                        {lead.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {lead.company}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">
                          {lead.owner.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm text-slate-600">
                          {lead.owner}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded px-2.5 py-1.5 text-[11px] font-semibold ${
                          statusColors[lead.status] ||
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-500">
                      {lead.updated}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          title="View lead"
                          onClick={() => setViewLead(lead)}
                          className="rounded-md p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          title="Edit lead"
                          onClick={() => openEditModal(lead)}
                          className="rounded-md p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          title="Delete lead"
                          onClick={() => deleteLead(lead.id)}
                          className="rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {visibleLeads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <Search size={21} className="text-slate-400" />
                      </div>
                      <p className="font-semibold text-slate-700">
                        No leads found
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Try changing your search or date.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Showing{" "}
              {filteredLeads.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
              {" - "}
              {Math.min(currentPage * pageSize, filteredLeads.length)} of{" "}
              {filteredLeads.length} records
            </p>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setPage((p) => Math.max(1, p - 1))
                }
                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((number) => (
                <button
                  key={number}
                  onClick={() => setPage(number)}
                  className={`h-8 min-w-8 rounded-lg px-2 text-xs font-semibold ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((p) => Math.min(totalPages, p + 1))
                }
                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
            <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {selectedLead ? "Edit Lead" : "Create New Lead"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Enter the lead details below.
                  </p>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Lead Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Enter lead name"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Company / Source *
                    </label>
                    <input
                      required
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="Enter company"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="name@company.com"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Phone
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="Enter phone number"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Owner
                    </label>
                    <select
                      value={form.owner}
                      onChange={(e) =>
                        setForm({ ...form, owner: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                      <option>Anjum</option>
                      <option>Sonam</option>
                      <option>Pawan</option>
                      <option>Shanu</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Status
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <CheckCircle2 size={16} />
                    {selectedLead ? "Save Changes" : "Create Lead"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {viewLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    Lead details
                  </p>
                  <h2 className="mt-2 text-xl font-bold">
                    {viewLead.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {viewLead.company}
                  </p>
                </div>

                <button
                  onClick={() => setViewLead(null)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  ["Email", viewLead.email],
                  ["Phone", viewLead.phone],
                  ["Owner", viewLead.owner],
                  ["Status", viewLead.status],
                  ["Last updated", viewLead.updated],
                  ["Update date", viewLead.updatedDate],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-b border-slate-100 pb-3"
                  >
                    <span className="text-sm text-slate-500">
                      {label}
                    </span>
                    <span className="break-all text-right text-sm font-medium text-slate-800">
                      {value || "Not provided"}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setViewLead(null)}
                className="mt-6 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className="fixed bottom-5 right-5 z-[60] flex max-w-sm items-center gap-3 rounded-xl bg-slate-900 px-5 py-4 text-sm text-white shadow-xl">
            <CheckCircle2 size={19} className="text-emerald-400" />
            <span>{message}</span>
            <button
              onClick={() => setMessage("")}
              className="ml-2 text-slate-400 hover:text-white"
            >
              <X size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
