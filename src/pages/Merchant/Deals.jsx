
import { useState } from "react";

const initialDeals = [
  { id: 1, name: "Apex Systems", company: "Apex Systems", amount: 450000, stage: "New", status: "New", priority: "Normal", assignedTeam: "Sales", visibility: "Team", owner: "", expectedClose: "" },
  { id: 2, name: "Finserve Ltd.", company: "Finserve Ltd.", amount: 450000, stage: "New", status: "New", priority: "Normal", assignedTeam: "Sales", visibility: "Team", owner: "", expectedClose: "" },
  { id: 3, name: "GreenTech", company: "GreenTech Ltd.", amount: 450000, stage: "Qualified", status: "Qualified", priority: "Normal", assignedTeam: "Sales", visibility: "Team", owner: "", expectedClose: "" },
  { id: 4, name: "Nova Services", company: "Nova Services", amount: 450000, stage: "Qualified", status: "Qualified", priority: "Normal", assignedTeam: "Sales", visibility: "Team", owner: "", expectedClose: "" },
  { id: 5, name: "Northstar Academy", company: "Northstar Academy", amount: 450000, stage: "Proposal", status: "Proposal sent", priority: "Normal", assignedTeam: "Sales", visibility: "Team", owner: "", expectedClose: "" },
  { id: 6, name: "BluePeak", company: "BluePeak", amount: 450000, stage: "Won", status: "Won", priority: "Normal", assignedTeam: "Sales", visibility: "Team", owner: "", expectedClose: "" },
];

const stages = ["New", "Qualified", "Proposal", "Won"];

const emptyForm = {
  name: "",
  company: "",
  amount: "",
  stage: "",
  expectedClose: "",
  status: "New",
  priority: "Normal",
  assignedTeam: "Sales",
  visibility: "Team",
  owner: "",
};

const fieldClass =
  "mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass = "text-sm font-medium text-gray-700";

function readDeals() {
  try {
    const saved = localStorage.getItem("growth-crm-deals");
    return saved ? JSON.parse(saved) : initialDeals;
  } catch {
    return initialDeals;
  }
}

function formatAmount(amount) {
  return Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
}

export default function Deals() {
  const [deals, setDeals] = useState(readDeals);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [pipelineOpen, setPipelineOpen] = useState(false);
  const [pipeline, setPipeline] = useState("Sales pipeline");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [consentCaptured, setConsentCaptured] = useState(false);
  const [notice, setNotice] = useState("");

  function persistDeals(nextDeals) {
    setDeals(nextDeals);

    try {
      localStorage.setItem("growth-crm-deals", JSON.stringify(nextDeals));
    } catch {
      setNotice("Changes could not be saved in browser storage.");
    }
  }

  function openNewDeal() {
    setForm({ ...emptyForm });
    setEditingId(null);
    setErrors({});
    setConsentCaptured(false);
    setNotice("");
    setShowForm(true);
  }

  function openEditDeal(deal) {
    setForm({
      ...emptyForm,
      ...deal,
      name: deal.name,
      amount: String(deal.amount ?? ""),
    });
    setEditingId(deal.id);
    setErrors({});
    setConsentCaptured(false);
    setNotice("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setErrors({});
    setNotice("");
  }

  function updateField(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      form: "",
    }));
  }

  function saveDeal(event) {
    event.preventDefault();

    const nextErrors = {};
    const dealName = form.name.trim().toLowerCase();

    if (!form.name.trim()) {
      nextErrors.name = "Deal name is required.";
    }

    if (!form.company) {
      nextErrors.company = "Please select a company.";
    }

    if (form.amount === "" || !Number.isFinite(Number(form.amount)) || Number(form.amount) <= 0) {
      nextErrors.amount = "Enter an amount greater than 0.";
    }

    if (!form.stage) {
      nextErrors.stage = "Please select a stage.";
    }

    if (!form.expectedClose) {
      nextErrors.expectedClose = "Expected close date is required.";
    } else if (
      !/^\d{4}-\d{2}-\d{2}$/.test(form.expectedClose) ||
      Number.isNaN(new Date(form.expectedClose + "T00:00:00").getTime())
    ) {
      nextErrors.expectedClose = "Please enter a valid date.";
    }

    const duplicate = deals.some(
      (deal) =>
        deal.id !== editingId &&
        deal.name.trim().toLowerCase() === dealName
    );

    if (duplicate) {
      nextErrors.name = "A deal with this name already exists.";
    }

    if (!consentCaptured) {
      nextErrors.consent = "Please confirm that consent has been captured.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const savedDeal = {
      ...form,
      id: editingId ?? Date.now(),
      name: form.name.trim(),
      amount: Number(form.amount),
    };

    const nextDeals = editingId
      ? deals.map((deal) => (deal.id === editingId ? savedDeal : deal))
      : [...deals, savedDeal];

    persistDeals(nextDeals);
    setNotice(editingId ? "Deal updated successfully." : "Deal saved successfully.");
    closeForm();
  }

  function deleteDeal() {
    if (!editingId) return;

    const confirmed = window.confirm("Are you sure you want to delete this deal?");
    if (!confirmed) return;

    persistDeals(deals.filter((deal) => deal.id !== editingId));
    closeForm();
    setNotice("Deal deleted successfully.");
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
            className="float-right font-medium"
            onClick={() => setNotice("")}
          >
            ×
          </button>
        </div>
      )}

      {!showForm ? (
        <>
          <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Sales pipeline board
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Move deals across stages with clear ownership
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPipelineOpen(!pipelineOpen)}
                  className="rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
                >
                  Pipeline ▾
                </button>

                {pipelineOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
                    {["Sales pipeline", "IT account pipeline"].map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => {
                          setPipeline(item);
                          setPipelineOpen(false);
                        }}
                        className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-50"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={openNewDeal}
                className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                ＋ New deal
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stages.map((stage) => {
              const stageDeals = deals.filter((deal) => deal.stage === stage);

              return (
                <section key={stage} className="min-w-0">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-gray-700">
                      {stage}
                    </h2>
                    <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-gray-100 px-2 text-xs font-semibold text-gray-600">
                      {stageDeals.length}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {stageDeals.map((deal) => (
                      <button
                        type="button"
                        key={deal.id}
                        onClick={() => openEditDeal(deal)}
                        className="block w-full rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md"
                        aria-label={`Edit ${deal.name}`}
                      >
                        <div className="text-sm font-semibold text-gray-800">
                          {deal.name}
                        </div>

                        <div className="mt-3 text-xs text-gray-500">
                          {deal.owner || "Owner"} {" • "}{" "}
                          {deal.expectedClose || "due date"}
                        </div>

                        <div className="mt-4 text-sm font-semibold text-gray-800">
                          ₹ {formatAmount(deal.amount)}
                        </div>
                      </button>
                    ))}

                    {stageDeals.length === 0 && (
                      <div className="rounded-lg border border-dashed border-gray-200 bg-white/60 px-3 py-8 text-center text-sm text-gray-400">
                        No deals
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      ) : (
        <form onSubmit={saveDeal} noValidate>
          <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Create / edit deal
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Opportunity value, stage, close date and products
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save deal
              </button>
            </div>
          </div>

          {errors.form && (
            <p role="alert" className="mb-4 text-sm text-red-600">
              {errors.form}
            </p>
          )}

          <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[1.7fr_1fr]">
            <section className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="mb-6 text-base font-semibold text-gray-800">
                Basic information
              </h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="deal-name" className={labelClass}>
                    Deal name
                  </label>
                  <input
                    id="deal-name"
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="Enter opportunity name"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="deal-company" className={labelClass}>
                    Company
                  </label>
                  <select
                    id="deal-company"
                    name="company"
                    value={form.company}
                    onChange={updateField}
                    className={fieldClass}
                    aria-invalid={Boolean(errors.company)}
                  >
                    <option value="">Select account</option>
                    {[
                      "Apex Systems",
                      "Finserve Ltd.",
                      "GreenTech Ltd.",
                      "GreenTech",
                      "Nova Services",
                      "Northstar Academy",
                      "BluePeak",
                    ].map((company) => (
                      <option value={company} key={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                  {errors.company && (
                    <p className="mt-1 text-xs text-red-600">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="deal-amount" className={labelClass}>
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      ₹
                    </span>
                    <input
                      id="deal-amount"
                      type="number"
                      min="0.01"
                      step="0.01"
                      name="amount"
                      value={form.amount}
                      onChange={updateField}
                      placeholder="0.00"
                      className={`${fieldClass} pl-8`}
                      aria-invalid={Boolean(errors.amount)}
                    />
                  </div>
                  {errors.amount && (
                    <p className="mt-1 text-xs text-red-600">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="deal-stage" className={labelClass}>
                    Stage
                  </label>
                  <select
                    id="deal-stage"
                    name="stage"
                    value={form.stage}
                    onChange={updateField}
                    className={fieldClass}
                    aria-invalid={Boolean(errors.stage)}
                  >
                    <option value="">Select stage</option>
                    {stages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                  {errors.stage && (
                    <p className="mt-1 text-xs text-red-600">{errors.stage}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="deal-close" className={labelClass}>
                    Expected close
                  </label>
                  <input
                    id="deal-close"
                    type="date"
                    name="expectedClose"
                    value={form.expectedClose}
                    onChange={updateField}
                    className={fieldClass}
                    aria-invalid={Boolean(errors.expectedClose)}
                  />
                  {errors.expectedClose && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.expectedClose}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="deal-owner" className={labelClass}>
                    Owner
                  </label>
                  <select
                    id="deal-owner"
                    name="owner"
                    value={form.owner}
                    onChange={updateField}
                    className={fieldClass}
                  >
                    <option value="">Select owner</option>
                    {["Anjum", "Sonam", "Pawan", "Shanu"].map((owner) => (
                      <option key={owner} value={owner}>
                        {owner}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
              <h2 className="mb-6 text-base font-semibold text-gray-800">
                Record settings
              </h2>

              <div className="space-y-5">
                <div>
                  <label htmlFor="deal-status" className={labelClass}>
                    Status
                  </label>
                  <select
                    id="deal-status"
                    name="status"
                    value={form.status}
                    onChange={updateField}
                    className={fieldClass}
                  >
                    {["New", "Qualified", "Proposal sent", "In progress", "Won", "Contacted"].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="deal-priority" className={labelClass}>
                    Priority
                  </label>
                  <select
                    id="deal-priority"
                    name="priority"
                    value={form.priority}
                    onChange={updateField}
                    className={fieldClass}
                  >
                    <option>Normal</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="deal-team" className={labelClass}>
                    Assigned team
                  </label>
                  <select
                    id="deal-team"
                    name="assignedTeam"
                    value={form.assignedTeam}
                    onChange={updateField}
                    className={fieldClass}
                  >
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Operations</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="deal-visibility" className={labelClass}>
                    Visibility
                  </label>
                  <select
                    id="deal-visibility"
                    name="visibility"
                    value={form.visibility}
                    onChange={updateField}
                    className={fieldClass}
                  >
                    <option>Team</option>
                    <option>Private</option>
                  </select>
                </div>
              </div>

              <div className="mt-7 border-t border-gray-100 pt-5">
                <h3 className="mb-4 text-sm font-semibold text-gray-800">
                  Checklist
                </h3>

                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400">□</span>
                    Required fields complete
                  </div>

                  <div className="flex items-start gap-2">
                    <span className={errors.name ? "text-red-500" : "text-gray-400"}>
                      {errors.name?.includes("already exists") ? "!" : "□"}
                    </span>
                    Duplicate check
                  </div>

                  <label className="flex cursor-pointer items-start gap-2">
                    <input
                      type="checkbox"
                      checked={consentCaptured}
                      onChange={(event) => {
                        setConsentCaptured(event.target.checked);
                        setErrors((previous) => ({
                          ...previous,
                          consent: "",
                        }));
                      }}
                      className="mt-0.5 h-4 w-4 accent-blue-600"
                    />
                    <span>Consent captured</span>
                  </label>

                  {errors.consent && (
                    <p role="alert" className="text-xs text-red-600">
                      {errors.consent}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save record
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            {editingId && (
              <button
                type="button"
                onClick={deleteDeal}
                className="ml-auto rounded-md border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Delete deal
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
