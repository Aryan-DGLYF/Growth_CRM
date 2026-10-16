
import { useState } from "react";
import {
  Search,
  Send,
  Paperclip,
  MoreHorizontal,
  MessageSquare,
  Star,
} from "lucide-react";

const initialChats = [
  {
    id: 1,
    name: "Priya Sharma",
    company: "Acme Technologies",
    initials: "PS",
    time: "10:42 AM",
    unread: 2,
    messages: [
      {
        id: 1,
        text: "Hello! We are interested in your services.",
        mine: false,
        time: "10:30 AM",
      },
      {
        id: 2,
        text: "Thanks for reaching out. How can we help?",
        mine: true,
        time: "10:35 AM",
      },
      {
        id: 3,
        text: "Could you share the proposal?",
        mine: false,
        time: "10:42 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Rahul Verma",
    company: "Bright Solutions",
    initials: "RV",
    time: "9:25 AM",
    unread: 1,
    messages: [
      {
        id: 4,
        text: "Thursday works for our team.",
        mine: false,
        time: "9:25 AM",
      },
    ],
  },
  {
    id: 3,
    name: "Ananya Gupta",
    company: "Nova Retail",
    initials: "AG",
    time: "Yesterday",
    unread: 0,
    messages: [
      {
        id: 5,
        text: "Thank you for the information.",
        mine: false,
        time: "Yesterday",
      },
    ],
  },
];

export default function Inbox() {
  const [chats, setChats] = useState(initialChats);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("All");

  const selected = chats.find((chat) => chat.id === selectedId);

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.company.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Unread" && chat.unread > 0);

    return matchesSearch && matchesFilter;
  });

  function selectChat(chat) {
    setSelectedId(chat.id);
    setChats((current) =>
      current.map((item) =>
        item.id === chat.id ? { ...item, unread: 0 } : item
      )
    );
  }

  function sendMessage(event) {
    event.preventDefault();

    const text = message.trim();
    if (!text || !selected) return;

    const newMessage = {
      id: Date.now(),
      text,
      mine: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChats((current) =>
      current.map((chat) =>
        chat.id === selectedId
          ? {
              ...chat,
              time: "Just now",
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );

    setMessage("");
  }

  return (
    <div className="min-h-full bg-[#f5f7fb] p-4 text-slate-800 sm:p-6">
      <div className="mb-6">
        <p className="mb-2 text-xs text-slate-400">Core / Inbox</p>
        <h1 className="text-2xl font-bold sm:text-3xl">Inbox</h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your customer conversations in one place.
        </p>
      </div>

      <div className="grid min-h-[600px] grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 lg:border-b-0 lg:border-r">
          <div className="border-b border-slate-100 p-4">
            <h2 className="mb-4 font-semibold">Conversations</h2>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3">
              <Search size={17} className="text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search conversations..."
                className="min-w-0 flex-1 py-2.5 text-sm outline-none"
              />
            </div>

            <div className="mt-4 flex gap-2">
              {["All", "Unread"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium ${
                    filter === item
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[460px] overflow-y-auto">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => selectChat(chat)}
                className={`flex w-full gap-3 border-b border-slate-100 p-4 text-left hover:bg-slate-50 ${
                  selectedId === chat.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  {chat.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <span className="truncate text-sm font-semibold">
                      {chat.name}
                    </span>
                    <span className="shrink-0 text-[10px] text-slate-400">
                      {chat.time}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {chat.company}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {chat.messages.at(-1)?.text || "No messages yet"}
                  </p>
                </div>

                {chat.unread > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center self-center rounded-full bg-blue-600 px-1 text-[10px] text-white">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}

            {filteredChats.length === 0 && (
              <p className="p-6 text-center text-sm text-slate-400">
                No conversations found.
              </p>
            )}
          </div>
        </aside>

        {selected ? (
          <section className="flex min-h-[500px] min-w-0 flex-col">
            <header className="flex items-center justify-between border-b border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                  {selected.initials}
                </div>
                <div>
                  <h2 className="text-sm font-semibold">
                    {selected.name}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {selected.company}
                  </p>
                </div>
              </div>
              <button
                aria-label="More conversation options"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <MoreHorizontal size={20} />
              </button>
            </header>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-[#f8faff] p-4 sm:p-6">
              <div className="my-2 text-center text-xs text-slate-400">
                Conversation history
              </div>

              {selected.messages.map((item) => (
                <div
                  key={item.id}
                  className={`flex ${
                    item.mine ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                      item.mine
                        ? "rounded-br-sm bg-blue-600 text-white"
                        : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <p className="break-words text-sm">{item.text}</p>
                    <p
                      className={`mt-2 text-right text-[10px] ${
                        item.mine ? "text-blue-100" : "text-slate-400"
                      }`}
                    >
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={sendMessage}
              className="border-t border-slate-200 bg-white p-4"
            >
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-2">
                <button
                  type="button"
                  aria-label="Attachments (demo only)"
                  className="rounded-lg p-2 text-slate-400"
                  title="Attachments are not enabled"
                >
                  <Paperclip size={19} />
                </button>

                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Type your message..."
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none"
                />

                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="rounded-lg bg-blue-600 p-2.5 text-white hover:bg-blue-700 disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="mt-2 text-[10px] text-slate-400">
                Demo mode · Messages are stored in component state only.
              </p>
            </form>
          </section>
        ) : (
          <section className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
            <MessageSquare size={36} className="mb-3 text-slate-300" />
            <h2 className="font-semibold">Select a conversation</h2>
            <p className="mt-2 text-sm text-slate-500">
              Choose a contact to view messages.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
