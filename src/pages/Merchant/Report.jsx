
import { useEffect, useState } from "react";
import {
  Download,
  TrendingUp,
  Users,
  Target,
  IndianRupee,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Format numbers using Indian numbering style
const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(value ?? 0);

// Local demo report data — no API/backend required
const demoReports = {
  "7d": {
    visitors: 1250,
    leads: 320,
    qualified: 145,
    customers: 48,
    revenue: 185000,
    conversionRate: 3.8,
    trend: [
      { day: "Mon", value: 120 },
      { day: "Tue", value: 165 },
      { day: "Wed", value: 140 },
      { day: "Thu", value: 210 },
      { day: "Fri", value: 185 },
      { day: "Sat", value: 245 },
      { day: "Sun", value: 190 },
    ],
  },
  "30d": {
    visitors: 5200,
    leads: 1280,
    qualified: 590,
    customers: 186,
    revenue: 745000,
    conversionRate: 3.6,
    trend: [
      { day: "Week 1", value: 620 },
      { day: "Week 2", value: 780 },
      { day: "Week 3", value: 710 },
      { day: "Week 4", value: 940 },
    ],
  },
  "90d": {
    visitors: 14800,
    leads: 3650,
    qualified: 1720,
    customers: 530,
    revenue: 2180000,
    conversionRate: 3.6,
    trend: [
      { day: "Month 1", value: 3100 },
      { day: "Month 2", value: 3850 },
      { day: "Month 3", value: 4200 },
    ],
  },
  "12m": {
    visitors: 62500,
    leads: 15400,
    qualified: 7300,
    customers: 2280,
    revenue: 9240000,
    conversionRate: 3.6,
    trend: [
      { day: "Jan", value: 3800 },
      { day: "Feb", value: 4200 },
      { day: "Mar", value: 4500 },
      { day: "Apr", value: 4900 },
      { day: "May", value: 5200 },
      { day: "Jun", value: 4800 },
      { day: "Jul", value: 5500 },
      { day: "Aug", value: 5800 },
      { day: "Sep", value: 6100 },
      { day: "Oct", value: 5900 },
      { day: "Nov", value: 6400 },
      { day: "Dec", value: 7200 },
    ],
  },
};

export default function Reports() {
  const [range, setRange] = useState("30d");
  const [report, setReport] = useState(demoReports["30d"]);
  const [loading, setLoading] = useState(false);

  // Load demo data locally whenever the selected range changes
  useEffect(() => {
    setLoading(true);

    const selectedReport = demoReports[range] || demoReports["30d"];
    setReport(selectedReport);
    setLoading(false);
  }, [range]);

  // Refresh local demo data
  function loadReport() {
    setLoading(true);

    const selectedReport = demoReports[range] || demoReports["30d"];
    setReport({ ...selectedReport });
    setLoading(false);
  }

  // Export report as CSV
  function exportCSV() {
    if (!report) return;

    const rows = [
      ["Metric", "Value"],
      ["Reporting period", range],
      ["Visitors", report.visitors],
      ["Leads", report.leads],
      ["Qualified", report.qualified],
      ["Customers", report.customers],
      ["Revenue (INR)", report.revenue],
      ["Conversion rate (%)", report.conversionRate],
      [],
      ["Period", "Performance"],
      ...(report.trend || []).map((item) => [
        item.day,
        item.value,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => {
            const text = String(value ?? "");
            return `"${text.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `universal-growth-report-${range}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  const metrics = report
    ? [
        {
          label: "Total visitors",
          value: formatNumber(report.visitors),
          icon: Users,
        },
        {
          label: "Total leads",
          value: formatNumber(report.leads),
          icon: Target,
        },
        {
          label: "Customers",
          value: formatNumber(report.customers),
          icon: TrendingUp,
        },
        {
          label: "Revenue",
          value: `₹${formatNumber(report.revenue)}`,
          icon: IndianRupee,
        },
      ]
    : [];

  const funnel = report
    ? [
        { label: "Visitors", value: report.visitors },
        { label: "Leads", value: report.leads },
        { label: "Qualified", value: report.qualified },
        { label: "Customers", value: report.customers },
      ]
    : [];

  const maxFunnel = Math.max(
    ...funnel.map((item) => item.value),
    1
  );

  return (
    <div className="min-h-full bg-[#f5f7fb] p-4 text-slate-800 sm:p-7">
      {/* Header */}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs text-slate-400">
            Core / Reports &amp; analytics
          </p>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Reports &amp; analytics
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Pipeline health, conversion, activity and revenue
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={loadReport}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm hover:bg-slate-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={exportCSV}
            disabled={!report}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Date range filter */}
      <div className="mb-5 flex justify-end">
        <select
          value={range}
          onChange={(event) => setRange(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="12m">Last 12 months</option>
        </select>
      </div>

      {/* Report content */}
      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          Loading reports...
        </div>
      ) : report ? (
        <>
          {/* Metric cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    {label}
                  </span>

                  <span className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <Icon size={19} />
                  </span>
                </div>

                <p className="text-2xl font-bold">{value}</p>

                <p className="mt-2 text-xs text-slate-400">
                  Selected reporting period
                </p>
              </div>
            ))}
          </div>

          {/* Chart and conversion funnel */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <div className="mb-6">
                <h2 className="font-semibold">
                  Performance overview
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Performance trend for the selected period
                </p>
              </div>

              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={report.trend || []}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e8edf5"
                    />

                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />

                    <Tooltip
                      cursor={{ fill: "#eff6ff" }}
                      contentStyle={{
                        borderRadius: 10,
                        border: "1px solid #e2e8f0",
                      }}
                    />

                    <Bar
                      dataKey="value"
                      name="Performance"
                      fill="#3970e8"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={34}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <h2 className="font-semibold">Conversion funnel</h2>

              <p className="mb-7 mt-1 text-xs text-slate-500">
                Progress from visitors to customers
              </p>

              <div className="space-y-7">
                {funnel.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between gap-3 text-sm">
                      <span className="text-slate-500">
                        {item.label}
                      </span>

                      <span className="font-semibold">
                        {formatNumber(item.value)}
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-sm bg-slate-100">
                      <div
                        className="h-full rounded-sm bg-blue-600 transition-all duration-500"
                        style={{
                          width: `${(item.value / maxFunnel) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-9 rounded-xl bg-blue-50 p-4">
                <p className="text-sm text-slate-600">
                  Visitor-to-customer conversion
                </p>

                <p className="mt-1 text-2xl font-bold text-blue-700">
                  {Number(report.conversionRate || 0).toFixed(1)}%
                </p>
              </div>
            </section>
          </div>

          <p className="mt-5 text-xs text-slate-400">
            Universal Growth CRM · Reports &amp; analytics
          </p>
        </>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          No report data available.
        </div>
      )}
    </div>
  );
}
