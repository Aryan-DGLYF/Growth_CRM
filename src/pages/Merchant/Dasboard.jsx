
// import { useState } from "react";
// import {
//   Users,
//   Wallet,
//   Trophy,
//   Clock3,
//   ArrowUpRight,
//   ArrowDownRight,
//   Plus,
//   Download,
//   CheckCircle2,
//   CalendarDays,
//   MoreHorizontal,
//   TrendingUp,
//   Target,
//   Phone,
//   Mail,
//   Building2,
// } from "lucide-react";

// const stats = [
//   {
//     title: "New Leads",
//     value: "248",
//     change: "+12.8%",
//     description: "vs. last month",
//     icon: Users,
//     color: "blue",
//     positive: true,
//   },
//   {
//     title: "Open Pipeline",
//     value: "₹42.8L",
//     change: "+8.4%",
//     description: "vs. last month",
//     icon: Wallet,
//     color: "violet",
//     positive: true,
//   },
//   {
//     title: "Deals Won",
//     value: "32",
//     change: "+5.2%",
//     description: "vs. last month",
//     icon: Trophy,
//     color: "green",
//     positive: true,
//   },
//   {
//     title: "Tasks Due",
//     value: "18",
//     change: "Needs focus",
//     description: "Pending activities",
//     icon: Clock3,
//     color: "amber",
//     positive: false,
//   },
// ];

// const chartData = [
//   { label: "W1", leads: 38, deals: 24 },
//   { label: "W2", leads: 55, deals: 34 },
//   { label: "W3", leads: 43, deals: 29 },
//   { label: "W4", leads: 72, deals: 46 },
//   { label: "W5", leads: 58, deals: 37 },
//   { label: "W6", leads: 88, deals: 61 },
//   { label: "W7", leads: 67, deals: 49 },
//   { label: "W8", leads: 79, deals: 56 },
// ];

// const initialTasks = [
//   {
//     id: 1,
//     title: "Follow up with Apex Systems",
//     category: "Sales call",
//     time: "10:30 AM",
//   },
//   {
//     id: 2,
//     title: "Review GreenTech proposal",
//     category: "Deal review",
//     time: "12:00 PM",
//   },
//   {
//     id: 3,
//     title: "Prepare client meeting",
//     category: "Meeting",
//     time: "02:30 PM",
//   },
//   {
//     id: 4,
//     title: "Approve campaign draft",
//     category: "Marketing",
//     time: "04:00 PM",
//   },
// ];

// const activities = [
//   {
//     initials: "AN",
//     name: "Arjun",
//     action: "created a new lead",
//     target: "Acme Corporation",
//     time: "2 min ago",
//     color: "blue",
//   },
//   {
//     initials: "SD",
//     name: "Sanjana",
//     action: "sent a proposal to",
//     target: "GreenTech Solutions",
//     time: "18 min ago",
//     color: "violet",
//   },
//   {
//     initials: "PA",
//     name: "Priya",
//     action: "closed a deal with",
//     target: "Bright Future Ltd.",
//     time: "1 hr ago",
//     color: "green",
//   },
// ];

// const colorStyles = {
//   blue: {
//     icon: "bg-blue-50 text-blue-600",
//     badge: "bg-blue-50 text-blue-700",
//   },
//   violet: {
//     icon: "bg-violet-50 text-violet-600",
//     badge: "bg-violet-50 text-violet-700",
//   },
//   green: {
//     icon: "bg-emerald-50 text-emerald-600",
//     badge: "bg-emerald-50 text-emerald-700",
//   },
//   amber: {
//     icon: "bg-amber-50 text-amber-600",
//     badge: "bg-amber-50 text-amber-700",
//   },
// };

// function StatCard({ stat }) {
//   const Icon = stat.icon;
//   const styles = colorStyles[stat.color];

//   return (
//     <div className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-sm font-medium text-slate-500">{stat.title}</p>
//           <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-800">
//             {stat.value}
//           </h3>
//         </div>

//         <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.icon}`}>
//           <Icon size={21} />
//         </div>
//       </div>

//       <div className="mt-4 flex flex-wrap items-center gap-2">
//         <span
//           className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${
//             stat.positive
//               ? "bg-emerald-50 text-emerald-700"
//               : "bg-amber-50 text-amber-700"
//           }`}
//         >
//           {stat.positive ? (
//             <ArrowUpRight size={13} />
//           ) : (
//             <Clock3 size={12} />
//           )}
//           {stat.change}
//         </span>
//         <span className="text-[11px] text-slate-400">
//           {stat.description}
//         </span>
//       </div>
//     </div>
//   );
// }

// function PerformanceChart() {
//   const [period, setPeriod] = useState("8 weeks");

//   return (
//     <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
//       <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
//         <div>
//           <h2 className="text-base font-bold text-slate-800">
//             Performance trend
//           </h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Leads and deals performance over time
//           </p>
//         </div>

//         <select
//           value={period}
//           onChange={(e) => setPeriod(e.target.value)}
//           className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-600 outline-none focus:border-blue-400"
//         >
//           <option>8 weeks</option>
//           <option>Monthly</option>
//           <option>Quarterly</option>
//         </select>
//       </div>

//       <div className="mt-7 flex flex-wrap items-center gap-5">
//         <div className="flex items-center gap-2 text-xs text-slate-500">
//           <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
//           New leads
//         </div>
//         <div className="flex items-center gap-2 text-xs text-slate-500">
//           <span className="h-2.5 w-2.5 rounded-sm bg-violet-400" />
//           Deals
//         </div>
//       </div>

//       <div className="mt-5 flex h-52">
//         <div className="flex flex-col justify-between pb-7 pr-3 text-[10px] text-slate-400">
//           <span>100</span>
//           <span>75</span>
//           <span>50</span>
//           <span>25</span>
//           <span>0</span>
//         </div>

//         <div className="relative flex flex-1 items-end justify-around border-b border-l border-slate-200 pb-0">
//           <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-7">
//             {[0, 1, 2, 3, 4].map((line) => (
//               <div key={line} className="border-t border-dashed border-slate-100" />
//             ))}
//           </div>

//           {chartData.map((item) => (
//             <div
//               key={item.label}
//               className="relative z-10 flex h-full flex-1 flex-col items-center justify-end px-0.5"
//             >
//               <div className="flex h-full w-full items-end justify-center gap-1 pb-7">
//                 <div
//                   title={`Leads: ${item.leads}`}
//                   style={{ height: `${item.leads}%` }}
//                   className="w-[35%] max-w-5 rounded-t-sm bg-blue-500 transition hover:bg-blue-700"
//                 />
//                 <div
//                   title={`Deals: ${item.deals}`}
//                   style={{ height: `${item.deals}%` }}
//                   className="w-[35%] max-w-5 rounded-t-sm bg-violet-400 transition hover:bg-violet-600"
//                 />
//               </div>
//               <span className="absolute bottom-2 text-[10px] text-slate-500">
//                 {item.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function WorkQueue() {
//   const [tasks, setTasks] = useState(initialTasks);

//   const toggleTask = (id) => {
//     setTasks((current) =>
//       current.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   const completedCount = tasks.filter((task) => task.completed).length;

//   return (
//     <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <h2 className="text-base font-bold text-slate-800">My work queue</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Your priorities for today
//           </p>
//         </div>

//         <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
//           {tasks.length - completedCount} remaining
//         </span>
//       </div>

//       <div className="mt-5 space-y-1">
//         {tasks.map((task) => (
//           <label
//             key={task.id}
//             className="flex cursor-pointer items-start gap-3 rounded-lg p-3 transition hover:bg-slate-50"
//           >
//             <input
//               type="checkbox"
//               checked={Boolean(task.completed)}
//               onChange={() => toggleTask(task.id)}
//               className="mt-1 h-4 w-4 accent-blue-600"
//             />

//             <span className="min-w-0 flex-1">
//               <span
//                 className={`block text-xs font-medium ${
//                   task.completed
//                     ? "text-slate-400 line-through"
//                     : "text-slate-700"
//                 }`}
//               >
//                 {task.title}
//               </span>
//               <span className="mt-1.5 block text-[10px] text-slate-400">
//                 {task.category}
//               </span>
//             </span>

//             <span className="whitespace-nowrap text-[10px] text-slate-500">
//               {task.time}
//             </span>
//           </label>
//         ))}
//       </div>

//       <button
//         onClick={() => {
//           const title = window.prompt("Enter a new task");
//           if (title?.trim()) {
//             setTasks((current) => [
//               ...current,
//               {
//                 id: Date.now(),
//                 title: title.trim(),
//                 category: "General task",
//                 time: "Today",
//               },
//             ]);
//           }
//         }}
//         className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-3 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
//       >
//         <Plus size={15} />
//         Add a task
//       </button>
//     </section>
//   );
// }

// function RecentActivity() {
//   return (
//     <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
//       <div className="flex items-center justify-between gap-3">
//         <div>
//           <h2 className="text-base font-bold text-slate-800">
//             Recent activity
//           </h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Latest updates from your workspace
//           </p>
//         </div>

//         <button
//           onClick={() => window.alert("All activity is displayed below.")}
//           className="text-xs font-semibold text-blue-600 hover:text-blue-800"
//         >
//           View all
//         </button>
//       </div>

//       <div className="mt-5 divide-y divide-slate-100">
//         {activities.map((activity) => {
//           const styles = colorStyles[activity.color];

//           return (
//             <div
//               key={activity.initials}
//               className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
//             >
//               <div
//                 className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${styles.badge}`}
//               >
//                 {activity.initials}
//               </div>

//               <div className="min-w-0 flex-1">
//                 <p className="text-xs text-slate-700">
//                   <span className="font-semibold">{activity.name}</span>{" "}
//                   {activity.action}{" "}
//                   <span className="font-semibold">{activity.target}</span>
//                 </p>
//                 <p className="mt-1.5 text-[11px] text-slate-400">
//                   {activity.time}
//                 </p>
//               </div>

//               <button
//                 aria-label="Activity options"
//                 onClick={() => window.alert(`${activity.name}: ${activity.action}`)}
//                 className="self-end rounded-md p-2 text-slate-400 hover:bg-slate-100 sm:self-auto"
//               >
//                 <MoreHorizontal size={18} />
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// function QuickActions() {
//   const actions = [
//     { label: "Add new lead", icon: Users, color: "blue" },
//     { label: "Add contact", icon: Phone, color: "violet" },
//     { label: "Create deal", icon: Target, color: "green" },
//     { label: "Add company", icon: Building2, color: "amber" },
//   ];

//   return (
//     <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
//       <h2 className="text-base font-bold text-slate-800">Quick actions</h2>
//       <p className="mt-1 text-xs text-slate-500">
//         Common tasks, just one click away
//       </p>

//       <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
//         {actions.map(({ label, icon: Icon, color }) => (
//           <button
//             key={label}
//             onClick={() => window.alert(`${label} form will be added here.`)}
//             className="flex flex-col items-start gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50/50"
//           >
//             <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorStyles[color].icon}`}>
//               <Icon size={19} />
//             </span>
//             <span className="text-xs font-semibold text-slate-700">
//               {label}
//             </span>
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default function Dashboard() {
//   return (
//     <div className="mx-auto max-w-[1600px] space-y-6">
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <p className="mb-1 text-xs text-slate-500">
//             Workspace / Overview
//           </p>
//           <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-[28px]">
//             Workspace overview
//           </h1>
//           <p className="mt-1.5 text-sm text-slate-500">
//             Your team's performance, priorities and activity at a glance.
//           </p>
//         </div>

//         <div className="flex flex-wrap items-center gap-2">
//           <span className="mr-1 flex items-center gap-2 text-xs text-slate-500">
//             <CalendarDays size={15} />
//             Last 30 days
//           </span>

//           <button
//             onClick={() => window.print()}
//             className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
//           >
//             <Download size={15} />
//             Export
//           </button>

//           <button
//             onClick={() =>
//               window.alert("Choose Leads, Contacts, Companies or Deals to create a record.")
//             }
//             className="flex h-10 items-center gap-2 rounded-lg bg-[#3868e8] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
//           >
//             <Plus size={16} />
//             New
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
//         {stats.map((stat) => (
//           <StatCard key={stat.title} stat={stat} />
//         ))}
//       </div>

//       <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[1.55fr_1fr]">
//         <PerformanceChart />
//         <WorkQueue />
//       </div>

//       <QuickActions />

//       <RecentActivity />

//       <footer className="pb-2 text-[11px] text-slate-400">
//         Universal Growth CRM · Overview dashboard · Demo data
//       </footer>
//     </div>
//   );
// }
