import React, { useState, useRef } from 'react';
import "../css/transactions.css";
import { useNavigate } from 'react-router-dom';

const SwipeRow = ({ t, role, handledelete }) => {
  const [swiped, setSwiped] = useState(false);
  const startX = useRef(null);

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) setSwiped(true);
    if (diff < -20) setSwiped(false);
    startX.current = null;
  };

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    });
  };

  return (
    <div className="swipe-row-wrapper">

      <div
  className="swipe-delete-bg"
  onClick={() => {
    if (!t?.id) return;
    handledelete(t.id);
  }}
>
        <span>Delete</span>
      </div>

      <div
        className={`swipe-row-content ${swiped ? "swiped" : ""}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => { if (swiped) setSwiped(false); }}
      >
        <div className="swipe-row-left">
          <div className="swipe-row-desc">{t.description}</div>
          <div className="swipe-row-meta">
            <span className="swipe-row-date">{formatDate(t.date)}</span>
            <span className="swipe-row-cat">{t.category}</span>
          </div>
        </div>

        <div className="swipe-row-right">
          <div className={`swipe-row-amount ${t.type === "income" ? "income" : "expense"}`}>
            {t.type === "income" ? "+" : "−"}₹{Number(t.amount).toLocaleString("en-IN")}
          </div>
          <div className="swipe-row-type">{t.type}</div>
        </div>

      </div>
    </div>
  );
};


const Transactions = ({ transactions, role, handledelete, handleadd }) => {
  const navigate = useNavigate();
  const [showform, setshowform] = useState(false);
  const [hintSeen, setHintSeen] = useState(false);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    type: "expense",
    amount: ""
  });

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "type") {
    setFormData({
      ...formData,
      type: value,
      category: CATEGORY_MAP[value][0] 
    });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  const handlesubmit = () => {
    if (!formData.date || !formData.description || !formData.amount || !formData.category) {
      alert("Fill all required details");
      return;
    }
    handleadd({ ...formData, amount: Number(formData.amount) });
    setFormData({ date: "", description: "", category: "", type: "expense", amount: "" });
    setshowform(false);
  };

 const filteredTransactions = transactions
  .filter((t) => {
    const matchesSearch = t.description
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      filterType === "all" || t.type === filterType;

    return matchesSearch && matchesType;
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date)); 
  const CATEGORY_MAP = {
  income: ["Salary", "Freelance"],
  expense: [
    "Food",
    "Rent",
    "Utilities",
    "Groceries",
    "Shopping",
    "Entertainment",
    "Travel",
    "Investment",
    "Savings",
    "Other"
  ]
};

  return (
    
    <div className="table-container">

      <div className="table-header">
        <div className="table-title">Transactions</div>
        {role === "admin" && (
          <div className="new-btn" onClick={() => setshowform(!showform)}>
            {showform ? "Cancel" : "New"}
          </div>
        )}
      </div>

     
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="table-wrapper desktop-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>

            {showform && role === "admin" && (
              <tr>
                <td><input type="date" name="date" value={formData.date} onChange={handleChange} /></td>
                <td><input name="description" value={formData.description} onChange={handleChange} /></td>
                <td>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </td>
                <td>
                 <select name="category" value={formData.category} onChange={handleChange}>
  {CATEGORY_MAP[formData.type].map((c) => (
    <option key={c} value={c}>{c}</option>
  ))}
</select>
                </td>
                
                <td><input name="amount" value={formData.amount} onChange={handleChange} /></td>
                <td><button  className="add-btn"onClick={handlesubmit}>Add</button></td>
              </tr>
            )}

            {filteredTransactions.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>
                <td style={{ color: t.type === "income" ? "#22c55e" : "#ef4444" }}>
                  ₹{t.amount}
                </td>
                {role === "admin" && (
                  <td>
                    <button
  onClick={() => {
    if (!t?.id) {
      alert("Invalid transaction (no id)");
      return;
    }
    handledelete(t.id);
  }}
  className="desktop-delete-btn"
>
  Delete
</button>
                  </td>
                )}
              </tr>
            ))}

          </tbody>
        </table>
      </div>

  
      <div className="mobile-list">
        {showform && role === "admin" && (
  <div className="mobile-form">
    <input type="date" name="date" value={formData.date} onChange={handleChange} />
    <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
    <select name="type" value={formData.type} onChange={handleChange}>
      <option value="expense">Expense</option>
      <option value="income">Income</option>
    </select>
   <select name="category" value={formData.category} onChange={handleChange}>
  {CATEGORY_MAP[formData.type].map((c) => (
    <option key={c} value={c}>{c}</option>
  ))}
</select>

    

    <input name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" />

    <button className="add-btn" onClick={handlesubmit}>Add</button>
  </div>
)}
        {filteredTransactions.map((t) => (
          <SwipeRow
            key={t.id}
            t={t}
            role={role}
            handledelete={handledelete}
          />
        ))}

      </div>

      <div className="show-more" onClick={() => navigate("/transactions")}>
        Show more
      </div>

    </div>
  );
};

export default Transactions;