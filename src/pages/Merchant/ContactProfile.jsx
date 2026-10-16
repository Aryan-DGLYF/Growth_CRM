
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, Mail, Phone, MessageSquare, Plus,
  CheckCircle2, CalendarDays, FileText, ListTodo,
  Clock3, X, Send, UserRound
} from "lucide-react";

const initialActivity = [
  { id: 1, title: "Record created", detail: "Imported from website form", date: "Oct 12, 2026", type: "record" },
  { id: 2, title: "Owner assigned", detail: "Assigned to Anjum", date: "Oct 12, 2026", type: "owner" },
  { id: 3, title: "Follow-up scheduled", detail: "Call planned for tomorrow", date: "Oct 14, 2026", type: "task" },
  { id: 4, title: "Note added", detail: "Budget and next steps discussed", date: "Oct 16, 2026", type: "note" },
];

export default function ContactProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const contacts = (() => {
    try {
      return JSON.parse(localStorage.getItem("crm_contacts") || "[]");
    } catch {
      return [];
    }
  })();

  const contact = contacts.find(c => String(c.id) === String(id)) || {
    id,
    name: "Sara Khan",
    company: "Northstar Academy",
    email: "sara@northstar.com",
    phone: "9876543210",
    owner: "Anjum",
    status: "Qualified",
    source: "Website",
    priority: "High",
    updated: "Today",
  };

  const [tab, setTab] = useState("Timeline");
  const [activities, setActivities] = useState(initialActivity);
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [taskText, setTaskText] = useState("");
  const [showTask, setShowTask] = useState(false);
  const [notice, setNotice] = useState("");

  function addNote(event) {
    event.preventDefault();
    if (!noteText.trim()) return;

    const note = {
      id: Date.now(),
      title: "Note added",
      detail: noteText.trim(),
      date: new Date().toLocaleDateString(),
      type: "note",
    };

    setNotes(previous => [note, ...previous]);
    setActivities(previous => [note, ...previous]);
    setNoteText("");
    setShowNote(false);
    setTab("Notes");
    setNotice("Note added successfully.");
  }

  function addTask(event) {
    event.preventDefault();
    if (!taskText.trim()) return;

    const task = {
      id: Date.now(),
      title: "Task created",
      detail: taskText.trim(),
      date: new Date().toLocaleDateString(),
      type: "task",
    };

    setActivities(previous => [task, ...previous]);
    setTaskText("");
    setShowTask(false);
    setTab("Tasks");
    setNotice("Task added successfully.");
  }

  function sendMessage(event) {
    event.preventDefault();
    if (!messageText.trim()) return;
    setNotice("Demo message prepared. Connect a messaging API to send it.");
    setMessageText("");
    setShowMessage(false);
  }

  const tabs = [
    { name: "Timeline", icon: Clock3 },
    { name: "Details", icon: UserRound },
    { name: "Tasks", icon: ListTodo },
    { name: "Files", icon: FileText },
    { name: "Notes", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fc] p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <button onClick={() => navigate("/contacts")} className="mb-3 flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600">
              <ArrowLeft size={15} /> Back to contacts
            </button>
            <h1 className="text-2xl font-bold sm:text-3xl">Contact profile</h1>
            <p className="mt-2 text-sm text-slate-500">{contact.name} · Decision maker · {contact.company}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => setShowMessage(true)} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50">
              <Mail size={16} /> Send message
            </button>
            <button onClick={() => setShowNote(true)} className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              <Plus size={17} /> Add note
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-12">
          <div className="space-y-5 xl:col-span-8">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-700">
                  {contact.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <span className="inline-flex rounded bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">Active</span>
                  <h2 className="mt-2 text-lg font-bold">{contact.name} · {contact.company}</h2>
                  <p className="mt-1 text-sm text-slate-500">{contact.email}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
                    <Mail size={15} /> Email
                  </a>
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
                    <Phone size={15} /> Call
                  </a>
                </div>
              </div>
            </section>

            <section className="min-h-[380px] rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
              <h2 className="mb-5 text-lg font-bold">Activity & related records</h2>

              <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-100 pb-4">
                {tabs.map(({ name, icon: Icon }) => (
                  <button key={name} onClick={() => setTab(name)} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${tab === name ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"}`}>
                    <Icon size={14} /> {name}
                  </button>
                ))}
              </div>

              {tab === "Timeline" && (
                <div className="space-y-6">
                  {[...activities].map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        {item.type === "task" ? <ListTodo size={16} /> : item.type === "note" ? <FileText size={16} /> : <CheckCircle2 size={16} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row">
                          <p className="text-sm font-semibold">{item.title}</p>
                          <span className="text-xs text-slate-400">{item.date}</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === "Details" && (
                <div className="grid gap-5 sm:grid-cols-2">
                  {[["Full name", contact.name], ["Company", contact.company], ["Email", contact.email], ["Phone", contact.phone], ["Lead source", contact.source || "Website"], ["Assigned owner", contact.owner]].map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="mt-2 break-words text-sm font-semibold">{value || "Not provided"}</p>
                    </div>
                  ))}
                </div>
              )}

              {tab === "Tasks" && (
                <div>
                  <button onClick={() => setShowTask(true)} className="mb-5 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                    <Plus size={16} /> Add task
                  </button>
                  {activities.filter(a => a.type === "task").map(task => (
                    <div key={task.id} className="mb-3 rounded-xl border border-slate-100 p-4">
                      <p className="text-sm font-semibold">{task.detail}</p>
                      <p className="mt-1 text-xs text-slate-400">{task.date}</p>
                    </div>
                  ))}
                </div>
              )}

              {tab === "Files" && (
                <div className="rounded-xl border border-dashed border-slate-200 p-10 text-center">
                  <FileText className="mx-auto mb-3 text-slate-400" size={28} />
                  <p className="font-semibold">No files attached</p>
                  <p className="mt-2 text-sm text-slate-400">File upload can be connected to your backend.</p>
                </div>
              )}

              {tab === "Notes" && (
                <div>
                  <button onClick={() => setShowNote(true)} className="mb-5 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                    <Plus size={16} /> Add note
                  </button>
                  {notes.length === 0 ? (
                    <p className="py-10 text-center text-sm text-slate-400">No notes yet. Add a note to record important information.</p>
                  ) : notes.map(note => (
                    <div key={note.id} className="mb-3 rounded-xl border border-slate-100 p-4">
                      <p className="text-sm font-semibold">{note.detail}</p>
                      <p className="mt-2 text-xs text-slate-400">{note.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-5 xl:col-span-4">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="mb-5 text-sm font-bold uppercase tracking-wide text-slate-600">Quick actions</h2>
              <div className="space-y-1">
                <button onClick={() => setShowTask(true)} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-blue-600 hover:bg-blue-50">
                  <ListTodo size={16} /> Add task
                </button>
                <button onClick={() => setShowMessage(true)} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-blue-600 hover:bg-blue-50">
                  <Send size={16} /> Send message
                </button>
                <button onClick={() => setShowNote(true)} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-blue-600 hover:bg-blue-50">
                  <Plus size={16} /> Add note
                </button>
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-blue-600 hover:bg-blue-50">
                  <Phone size={16} /> Call contact
                </a>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="mb-5 text-lg font-bold">Key details</h2>
              {[
                ["Owner", contact.owner || "Anjum"],
                ["Created", "Oct 12, 2026"],
                ["Source", contact.source || "Website"],
                ["Priority", contact.priority || "High"],
                ["Last contacted", contact.updated || "Today"],
                ["Status", contact.status || "Qualified"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3 border-b border-slate-200 py-4 last:border-0">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className="text-right text-xs font-semibold">{value}</span>
                </div>
              ))}
            </section>

            <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
              <div className="flex items-center gap-3">
                <CalendarDays size={19} className="text-blue-600" />
                <h3 className="text-sm font-bold">Next follow-up</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">Review the contact's next steps and schedule a follow-up task.</p>
              <button onClick={() => setShowTask(true)} className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800">Schedule follow-up →</button>
            </section>
          </div>
        </div>

        {showNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <form onSubmit={addNote} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Add contact note</h2>
                <button type="button" onClick={() => setShowNote(false)}><X size={20} /></button>
              </div>
              <textarea required rows={5} value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Write your note..." className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500" />
              <button className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">Save note</button>
            </form>
          </div>
        )}

        {showTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <form onSubmit={addTask} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Create follow-up task</h2>
                <button type="button" onClick={() => setShowTask(false)}><X size={20} /></button>
              </div>
              <label className="text-sm font-medium">Task description</label>
              <input required value={taskText} onChange={e => setTaskText(e.target.value)} placeholder="e.g. Call customer tomorrow" className="mt-2 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500" />
              <button className="mt-5 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">Create task</button>
            </form>
          </div>
        )}

        {showMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <form onSubmit={sendMessage} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Send message</h2>
                <button type="button" onClick={() => setShowMessage(false)}><X size={20} /></button>
              </div>
              <p className="mb-3 text-sm text-slate-500">To: {contact.email}</p>
              <textarea required rows={5} value={messageText} onChange={e => setMessageText(e.target.value)} placeholder="Write your message..." className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500" />
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                <Send size={16} /> Prepare message
              </button>
            </form>
          </div>
        )}

        {notice && (
          <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl">
            {notice}
            <button onClick={() => setNotice("")}><X size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
}
