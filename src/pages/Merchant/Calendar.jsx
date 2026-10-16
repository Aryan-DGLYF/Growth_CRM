
import { useState } from "react";

const initialEvents = [
  { id: 1, date: 2, title: "Client call", type: "Meeting" },
  { id: 2, date: 11, title: "Court hearing", type: "Appointment" },
  { id: 3, date: 15, title: "Follow-up", type: "Follow-up" },
  { id: 4, date: 20, title: "Deadline", type: "Deadline" },
  { id: 5, date: 24, title: "Demo", type: "Meeting" },
];

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const inputClass =
  "mt-2 w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function readEvents() {
  try {
    const saved = localStorage.getItem("growth-crm-calendar-events");
    return saved ? JSON.parse(saved) : initialEvents;
  } catch {
    return initialEvents;
  }
}

function monthLabel(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function Calendar() {
  const [events, setEvents] = useState(readEvents);
  const [currentMonth, setCurrentMonth] = useState(
    () => new Date(2026, 9, 1)
  );
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [showViewOptions, setShowViewOptions] = useState(false);
  const [calendarView, setCalendarView] = useState("Week");

  const emptyForm = {
    title: "",
    date: "1",
    type: "Meeting",
  };

  const [form, setForm] = useState({ ...emptyForm });

  function persistEvents(nextEvents) {
    setEvents(nextEvents);

    try {
      localStorage.setItem(
        "growth-crm-calendar-events",
        JSON.stringify(nextEvents)
      );
    } catch {
      setNotice("Unable to save event in browser storage.");
    }
  }

  function previousMonth() {
    setCurrentMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() - 1,
          1
        )
    );
  }

  function nextMonth() {
    setCurrentMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          1
        )
    );
  }

  function goToToday() {
    const today = new Date();

    setCurrentMonth(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );
  }

  function openSchedule() {
    setForm({ ...emptyForm });
    setEditingId(null);
    setErrors({});
    setNotice("");
    setShowForm(true);
  }

  function openEditEvent(event) {
    setForm({
      title: event.title,
      date: String(event.date),
      type: event.type,
    });

    setEditingId(event.id);
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
    const dateNumber = Number(form.date);

    if (!form.title.trim()) {
      nextErrors.title = "Event title is required.";
    }

    if (
      !Number.isInteger(dateNumber) ||
      dateNumber < 1 ||
      dateNumber > 28
    ) {
      nextErrors.date = "Please select a valid calendar date.";
    }

    if (!form.type) {
      nextErrors.type = "Please select an event type.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const savedEvent = {
      id: editingId ?? Date.now(),
      title: form.title.trim(),
      date: dateNumber,
      type: form.type,
    };

    const nextEvents = editingId
      ? events.map((item) =>
          item.id === editingId ? savedEvent : item
        )
      : [...events, savedEvent];

    persistEvents(nextEvents);
    closeForm();
    setNotice(
      editingId
        ? "Event updated successfully."
        : "Event scheduled successfully."
    );
  }

  function handleDelete() {
    if (!editingId) return;

    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    persistEvents(events.filter((item) => item.id !== editingId));
    closeForm();
    setNotice("Event deleted successfully.");
  }

  const dates = Array.from({ length: 28 }, (_, index) => index + 1);

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
            onClick={() => setNotice("")}
            className="float-right font-medium"
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
                Calendar &amp; appointments
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Meetings, follow-ups and team availability
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowViewOptions(!showViewOptions)}
                  className="rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
                >
                  {calendarView} ▾
                </button>

                {showViewOptions && (
                  <div className="absolute right-0 z-20 mt-2 w-32 rounded-md border border-gray-200 bg-white p-1 shadow-lg">
                    {["Week", "Month"].map((view) => (
                      <button
                        type="button"
                        key={view}
                        onClick={() => {
                          setCalendarView(view);
                          setShowViewOptions(false);
                        }}
                        className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-50"
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={openSchedule}
                className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                + Schedule
              </button>
            </div>
          </div>

          {/* Calendar panel */}
          <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {monthLabel(currentMonth)}
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToToday}
                  className="rounded-md px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  Today
                </button>

                <button
                  type="button"
                  onClick={previousMonth}
                  aria-label="Previous month"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={nextMonth}
                  aria-label="Next month"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {weekdays.map((day) => (
                <div
                  key={day}
                  className="px-1 py-3 text-center text-xs font-semibold tracking-wide text-gray-500"
                >
                  {day}
                </div>
              ))}

              {dates.map((date) => {
                const dateEvents = events.filter(
                  (event) => event.date === date
                );

                return (
                  <div
                    key={date}
                    className="min-h-[78px] rounded-md border border-gray-200 p-1.5 sm:min-h-[100px] sm:p-2"
                  >
                    <div className="mb-2 text-xs text-gray-600">
                      {date}
                    </div>

                    <div className="space-y-1">
                      {dateEvents.map((event) => (
                        <button
                          type="button"
                          key={event.id}
                          title={`Edit ${event.title}`}
                          onClick={() => openEditEvent(event)}
                          className="block w-full rounded-sm bg-blue-50 px-1.5 py-1 text-left text-[10px] font-medium leading-4 text-blue-700 hover:bg-blue-100 sm:text-xs"
                        >
                          {event.title}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      ) : (
        /* Schedule event form */
        <form onSubmit={handleSave} noValidate>
          <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                {editingId ? "Edit event" : "Schedule event"}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Meetings, follow-ups and team appointments
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
                Save event
              </button>
            </div>
          </div>

          <div className="max-w-3xl rounded-lg border border-gray-200 bg-white p-5 sm:p-7">
            <h2 className="mb-6 text-base font-semibold text-gray-800">
              Basic information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="event-title" className="text-sm font-medium">
                  Event title
                </label>

                <input
                  id="event-title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
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
                <label htmlFor="event-date" className="text-sm font-medium">
                  Date
                </label>

                <select
                  id="event-date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className={inputClass}
                  aria-invalid={Boolean(errors.date)}
                >
                  {dates.map((date) => (
                    <option key={date} value={date}>
                      {date} {monthLabel(currentMonth)}
                    </option>
                  ))}
                </select>

                {errors.date && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="event-type" className="text-sm font-medium">
                  Event type
                </label>

                <select
                  id="event-type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Meeting</option>
                  <option>Appointment</option>
                  <option>Follow-up</option>
                  <option>Deadline</option>
                  <option>Demo</option>
                </select>

                {errors.type && (
                  <p role="alert" className="mt-1 text-xs text-red-600">
                    {errors.type}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save event
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
                  className="ml-auto rounded-md border border-red-200 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete event
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
