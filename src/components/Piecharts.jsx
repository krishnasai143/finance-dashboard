import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const COLORS = {
  Rent: "#a78bfa",
  Food: "#22c55e",
  Utilities: "#ef4444",
  Shopping: "#facc15",
  Entertainment: "#38bdf8",
  Savings: "#34d399",
  Travel: "#f97316"
};
const Piecharts = ({ data, range, setRange }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{
      background: "#161b27",
      margin: "20px",
      padding: "20px",
      borderRadius: "10px"
    }}>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px"
      }}>
        <h3 style={{
          color: "#cbd5e1",
          fontSize: "16px",
          fontWeight: "500"
        }}>
          Spending Overview
        </h3>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          style={{
            background: "#1e2535",
            color: "white",
            border: "1px solid #374151",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "13px",
            width: "70px",
            cursor: "pointer",
            outline: "none"
          }}
        >
          <option value="1">1M</option>
          <option value="3">3M</option>
          <option value="6">6M</option>
        </select>
      </div>

      {/* Body — row on desktop, column on mobile */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        gap: isMobile ? "16px" : "20px"
      }}>

        {/* Pie */}
        <div style={{
          width: "100%",
          height: isMobile ? 220 : 250,
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="category"
                outerRadius={isMobile ? 90 : 80}
                innerRadius={0}
                cx="50%"
                cy="50%"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[entry.category]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1e2535",
                  border: "1px solid #374151",
                  borderRadius: "6px",
                  color: "#cbd5e1"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend — row wrap on mobile, column on desktop */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          flexWrap: isMobile ? "wrap" : "nowrap",
          justifyContent: isMobile ? "center" : "flex-start",
          gap: isMobile ? "10px 20px" : "6px",
          width: isMobile ? "100%" : "auto"
        }}>
          {data.map((item, index) => (
            <div key={index} style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <div style={{
                width: "12px",
                height: "12px",
                background: COLORS[item.category],
                borderRadius: "3px",
                flexShrink: 0
              }} />
              <span style={{ color: "#cbd5e1", fontSize: "13px" }}>
                {item.category}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Piecharts;