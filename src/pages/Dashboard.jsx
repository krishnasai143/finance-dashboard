import React, { useState } from 'react';
import Cards from '../components/Cards.jsx';
import Transactions from '../components/Transactions.jsx';
import Barcharts from '../components/Barcharts.jsx';
import Piecharts from "../components/Piecharts.jsx";
import Insights from '../components/Insights.jsx';

const Dashboard = ({ balance, income, expenses, transactions }) => {

  // ✅ FIXED: useState at top level
  const [range, setRange] = useState("6");

  const getMonthlyData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    return months.map((month, index) => {
      const monthData = transactions.filter((t) => {
        const date = new Date(t.date);
        return date.getMonth() === index;
      });

      const income = monthData
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = monthData
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      return { month, income, expense };
    });
  };

  const getFilteredTransactions = () => {
    const now = new Date();

    return transactions.filter((t) => {
      const date = new Date(t.date);
      const diffMonths =
        (now.getFullYear() - date.getFullYear()) * 12 +
        (now.getMonth() - date.getMonth());

      return diffMonths < Number(range);
    });
  };

  const getCategoryData = () => {
    const filtered = getFilteredTransactions();
    const categoryMap = {};

    filtered.forEach((t) => {
      if (t.type === "expense") {
        categoryMap[t.category] =
          (categoryMap[t.category] || 0) + t.amount;
      }
    });

    return Object.keys(categoryMap).map((key) => ({
      category: key,
      value: categoryMap[key]
    }));
  };

  const pieData = getCategoryData();
  const chartData = getMonthlyData();
  const now = new Date();

const monthlyIncome = transactions
  .filter(t => {
    const d = new Date(t.date);
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear() &&
      t.type === "income"
    );
  })
  .reduce((sum, t) => sum + t.amount, 0);

const monthlyExpenses = transactions
  .filter(t => {
    const d = new Date(t.date);
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear() &&
      t.type === "expense"
    );
  })
  .reduce((sum, t) => sum + t.amount, 0);

 return (
  <div>

    <Cards 
  balance={balance} 
  income={monthlyIncome} 
  expenses={monthlyExpenses} 
/>

    {/* 🔹 BAR CHARTS */}
    <div className="charts-row">
      <Barcharts
        data={chartData}
        dataKey="income"
        title="Income (Last 6 Months)"
        color="#22c55e"
      />

      <Barcharts
        data={chartData}
        dataKey="expense"
        title="Expenses (Last 6 Months)"
        color="#ef4444"
      />
    </div>

    {/* 🔹 PIE + INSIGHTS */}
    <div className="pie-insights-row">

      <div className="flex-box">
        <Piecharts 
          data={pieData} 
          range={range} 
          setRange={setRange} 
        />
      </div>

      <div className="flex-box">
        <Insights 
          transactions={transactions} 
          balance={balance} 
          pieData={pieData} 
        />
      </div>

    </div>

    {/* 🔹 TRANSACTIONS */}
    <Transactions 
      transactions={transactions.slice(0,5)} 
      role="viewer" 
    />

  </div>
);
};

export default Dashboard;