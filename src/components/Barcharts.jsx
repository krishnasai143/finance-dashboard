import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const BarChartComponent = ({ data, dataKey, title, color }) => {
  return (
    <div style={{ flex: 1 }}>
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>

      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid stroke="#2d3748" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />

            {/* ✅ FIXED BAR */}
            <Bar
              dataKey={dataKey}
              fill={color}
              activeBar={false}   // ❌ removes click highlight
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;