import "../css/insights.css";

const Insights = ({ transactions, balance, pieData }) => {

  const totalSpent = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const highestCategory = pieData.length
    ? pieData.reduce((max, curr) =>
        curr.value > max.value ? curr : max
      )
    : { category: "N/A" };

  return (
  <div className="insights-container">

    <div className="insights-header">
     <h3 style={{ color: "#cbd5e1" }}>Insights</h3>
    </div>

    <div className="insights-content">

      <p>Remaining balance ₹{balance}</p>

      <p>Total spent ₹{totalSpent}</p>

      <p>Highest spending category {highestCategory.category}</p>

    </div>

  </div>
);
};

export default Insights;