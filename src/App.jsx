import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./components/Navbar.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Transactionpage from './pages/Transactionpage.jsx';
import Dashboard from './pages/Dashboard.jsx';

const API_URL = "https://69d0ecec90cd06523d5da71b.mockapi.io/transactions";

const App = () => {
  const [transactions, settransactions] = useState([]);
  const [role, setRole] = useState("admin");

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        console.log("API DATA:", res.data);
        settransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleadd = (newtrans) => {
    axios.post(API_URL, newtrans)
      .then((res) => {
        settransactions(prev => [res.data, ...prev]); 
      })
      .catch(err => console.log(err));
  };

 const handledelete = async (id) => {
  try {
    const deleteId = String(id);

    console.log("Deleting ID:", deleteId);

    await axios.delete(`${API_URL}/${deleteId}`);

    window.location.reload();

  } catch (err) {
    console.log("DELETE ERROR:", err);
  }
};

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expenses;

  return (
    <BrowserRouter>
      <div style={{
        minHeight: "100vh",
        width: "100%",
        background: "#0f1117",
        color: "white"
      }}>

        <Navbar role={role} setRole={setRole} />

        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                balance={balance}
                income={income}
                expenses={expenses}
                transactions={transactions}
              />
            }
          />

          <Route
            path="/transactions"
            element={
              <Transactionpage
                handleadd={handleadd}
                handledelete={handledelete}
                transactions={transactions}
                role={role}
              />
            }
          />
        </Routes>

      </div>
    </BrowserRouter>
  );
};

export default App;