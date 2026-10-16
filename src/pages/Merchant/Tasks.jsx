import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Apex Systems",
    relatedRecord: "Enterprise software",
    owner: "Anjum",
    status: "Qualified",
    dueDate: "Today",
  },
  {
    id: 2,
    title: "GreenTech Ltd.",
    relatedRecord: "Fintech platform",
    owner: "Sonam",
    status: "Proposal sent",
    dueDate: "Today",
  },
  {
    id: 3,
    title: "Northstar Academy",
    relatedRecord: "Education",
    owner: "Pawan",
    status: "In progress",
    dueDate: "Yesterday",
  },
  {
    id: 4,
    title: "Rahman Legal",
    relatedRecord: "Law firm",
    owner: "Shanu",
    status: "New",
    dueDate: "Yesterday",
  },
  {
    id: 5,
    title: "Nova Services",
    relatedRecord: "Consulting",
    owner: "Anjum",
    status: "Contacted",
    dueDate: "Oct 14",
  },
];

const statuses = [
  "New",
  "Qualified",
  "Proposal sent",
  "In progress",
  "Contacted",
  "Completed",
];

const inputClass =
  "mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function readTasks() {
  try {
    const saved = localStorage.getItem("growth-crm-tasks");
    return saved ? JSON.parse(saved) : initialTasks;
  } catch {
    return initialTasks;
  }
}

export default function Tasks() {
  const [tasks, setTasks] = useState(readTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ownerFilter, setOwnerFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showViews, setShowViews] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  const emptyForm = {
    title: "",
    relatedRecord: "",
    owner: "",
    status: "New",
    dueDate: "",
  };

  const [form, setForm] = useState({ ...emptyForm });

  function persist(nextTasks) {
    setTasks(nextTasks);

    try {
      localStorage.setItem(
        "growth-crm-tasks",
        JSON.stringify(nextTasks)
      );
    } catch {
      setNotice("Unable to save changes in browser storage.");
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const query = search.toLowerCase().trim();

    const matchesSearch =
      task.title.toLowerCase().includes(query) ||
      task.relatedRecord.toLowerCase().includes(query) ||
      task.owner.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesOwner =
      ownerFilter === "All" || task.owner === ownerFilter;

    const matchesDate =
      dateFilter === "All" || task.dueDate === dateFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesOwner &&
      matchesDate
    );
  });

  function openNew() {
    setForm({ ...emptyForm });
    setEditingId(null);
    setErrors({});
    setNotice("");
    setShowForm(true);
  }

  function openEdit(task) {
    setForm({
      title: task.title,
      relatedRecord: task.relatedRecord,
      owner: task.owner,
      status: task.status,
      dueDate: task.dueDate,
    });

    setEditingId(task.id);
    setErrors({});
    setNotice("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setErrors({});
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function handleSave(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = "Task is required.";
    }

    if (!form.relatedRecord.trim()) {
      nextErrors.relatedRecord = "Related record is required.";
    }

    if (!form.owner) {
      nextErrors.owner = "Please select an owner.";
    }

    if (!form.status) {
      nextErrors.status = "Please select a status.";
    }

    if (!form.dueDate) {
      nextErrors.dueDate = "Due date is required.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const savedTask = {
      ...form,
      title: form.title.trim(),
      relatedRecord: form.relatedRecord.trim(),
    };

    const nextTasks = editingId
      ? tasks.map((task) =>
          task.id === editingId
            ? { ...task, ...savedTask }
            : task
        )
      : [
          ...tasks,
          {
            id: Date.now(),
            ...savedTask,
          },
        ];

    persist(nextTasks);
    closeForm();
    setNotice(
      editingId
        ? "Task updated successfully."
        : "Task saved successfully."
    );
  }

  function handleDelete() {
    if (!editingId) return;

    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    persist(tasks.filter((task) => task.id !== editingId));
    closeForm();
    setNotice("Task deleted successfully.");
  }

  function exportCSV() {
    const headers = [
      "Task",
      "Related Record",
      "Owner",
      "Status",
      "Due Date",
    ];

    const rows = filteredTasks.map((task) => [
      task.title,
      task.relatedRecord,
      task.owner,
      task.status,
      task.dueDate,
    ]);

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "tasks.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] text-gray-800">
      {notice && !showForm && (
        <div
          role="status"
          className="mb-4 rounded-md border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800"
        >
          {notice}
          <button
            type="button"
            className="float-right"
            onClick={() => setNotice("")}
          >
            ×
          </button>
        </div>
      )}

      {!showForm ? (
        <>
          {/* Page heading */}
          <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Tasks &amp; work queue
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Assigned tasks, overdue work and next actions
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={exportCSV}
                className="rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
              >
                Export
              </button>

              <button
                type="button"
                onClick={openNew}
                className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                + New
              </button>
            </div>
          </div>

          {/* Search and filters */}
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-3">
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="⌕ Search records..."
                aria-label="Search records"
                className="min-w-[200px] flex-1 rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label="Filter by status"
                className="rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm"
              >
                <option value="All">Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={ownerFilter}
                onChange={(event) => setOwnerFilter(event.target.value)}
                aria-label="Filter by owner"
                className="rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm"
              >
                <option value="All">Owner</option>
                {["Anjum", "Sonam", "Pawan", "Shanu"].map((owner) => (
                  <option key={owner} value={owner}>
                    {owner}
                  </option>
                ))}
              </select>

              <select
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                aria-label="Filter by due date"
                className="rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm"
              >
                <option value="All">Date range</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="Oct 14">Oct 14</option>
              </select>

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
              >
                Filters
              </button>

              <button
                type="button"
                onClick={() => setShowViews(!showViews)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
              >
                Saved views
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-600">
                <p>Filter tasks by status, owner and due date using the controls above.</p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setOwnerFilter("All");
                    setDateFilter("All");
                  }}
                  className="mt-3 font-medium text-blue-600"
                >
                  Clear filters
                </button>
              </div>
            )}

            {showViews && (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter("All");
                    setOwnerFilter("All");
                    setDateFilter("All");
                    setSearch("");
                  }}
                  className="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700"
                >
                  All tasks
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOwnerFilter("Shanu");
                    setStatusFilter("All");
                    setDateFilter("All");
                  }}
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm"
                >
                  My tasks
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter("In progress");
                    setDateFilter("All");
                  }}
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm"
                >
                  In progress
                </button>
              </div>
            )}
          </div>

          {/* Task table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-5 py-4 font-semibold">Task</th>
                    <th className="px-5 py-4 font-semibold">Related Record</th>
                    <th className="px-5 py-4 font-semibold">Owner</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Due Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredTasks.map((task) => (
                    <tr
                      key={task.id}
                      onClick={() => openEdit(task)}
                      className="cursor-pointer transition hover:bg-gray-50"
                      title="Click to edit task"
                    >
                      <td className="px-5 py-5 font-medium text-gray-800">
                        {task.title}
                      </td>

                      <td className="px-5 py-5 text-gray-600">
                        {task.relatedRecord}
                      </td>

                      <td className="px-5 py-5 text-gray-700">
                        {task.owner}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-md px-3 py-1.5 text-xs font-medium ${
                            task.status === "Qualified"
                              ? "bg-emerald-50 text-emerald-700"
                              : task.status === "Proposal sent"
                              ? "bg-amber-50 text-amber-700"
                              : task.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-orange-50 text-orange-700"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-gray-600">
                        {task.dueDate}
                      </td>
                    </tr>
                  ))}

                  {filteredTasks.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-5 py-12 text-center text-sm text-gray-500"
                      >
                        No tasks found. Try another search or filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
              <span>
                Showing {filteredTasks.length} of {tasks.length} records
              </span>

              <span className="text-blue-600">
                ‹ 1 2 3 … ›
              </span>
            </div>
          </div>
        </>
      ) : (
        /* Create/Edit Task form */
        <form onSubmit={handleSave} noValidate>
          <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                {editingId ? "Edit task" : "Create task"}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Assigned tasks, related records and due dates
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2.5 text-sm text-white hover:bg-blue-700"
              >
                Save task
              </button>
            </div>
          </div>

          <div className="max-w-3xl rounded-lg border border-gray-200 bg-white p-5 sm:p-7">
            <h2 className="mb-6 text-base font-semibold">
              Basic information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="task-title" className="text-sm font-medium">
                  Task
                </label>
                <input
                  id="task-title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter task name"
                  className={inputClass}
                  aria-invalid={Boolean(errors.title)}
                />
                {errors.title && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="task-related" className="text-sm font-medium">
                  Related record
                </label>
                <input
                  id="task-related"
                  name="relatedRecord"
                  value={form.relatedRecord}
                  onChange={handleChange}
                  placeholder="Enter related record"
                  className={inputClass}
                  aria-invalid={Boolean(errors.relatedRecord)}
                />
                {errors.relatedRecord && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.relatedRecord}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="task-owner" className="text-sm font-medium">
                  Owner
                </label>
                <select
                  id="task-owner"
                  name="owner"
                  value={form.owner}
                  onChange={handleChange}
                  className={inputClass}
                  aria-invalid={Boolean(errors.owner)}
                >
                  <option value="">Select owner</option>
                  {["Anjum", "Sonam", "Pawan", "Shanu"].map((owner) => (
                    <option key={owner} value={owner}>
                      {owner}
                    </option>
                  ))}
                </select>
                {errors.owner && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.owner}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="task-status" className="text-sm font-medium">
                  Status
                </label>
                <select
                  id="task-status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="task-due" className="text-sm font-medium">
                  Due date
                </label>
                <input
                  id="task-due"
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className={inputClass}
                  aria-invalid={Boolean(errors.dueDate)}
                />
                {errors.dueDate && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.dueDate}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white"
              >
                Save record
              </button>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm"
              >
                Cancel
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="ml-auto rounded-md border border-red-200 px-4 py-2.5 text-sm text-red-600"
                >
                  Delete task
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}