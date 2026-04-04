import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Navbar from "./components/Navbar.jsx";
import {Route,Routes,BrowserRouter} from "react-router-dom"
import "./App.css";
import Transactionpage from './pages/Transactionpage.jsx';
import Dashboard from './pages/Dashboard.jsx';
 const App=()=>{
  const [transactions,settransactions]=useState([]);
  const [role, setRole] = useState("admin");
  useEffect(() => {
        axios.get("http://localhost:3001/transactions")
              .then((res) => {
              console.log("API DATA:", res.data); // 👈 IMPORTANT
              settransactions(res.data);
              })
        .catch((err) => {
              console.log(err);
        });
  }, []);
  const handleadd=(newtrans)=>{
    axios.post("http://localhost:3001/transactions",newtrans)
    .then((res)=>{
      settransactions(prev=>[...prev,res.data]);
    })
    .catch(err=>console.log(err));

  };
  const handledelete=(id)=>{
        axios.delete(`http://localhost:3001/transactions/${id}`)
              .then(()=>{
                settransactions(prev=>prev.filter((t)=>t.id!==id));
              })
              .catch(err=>console.log(err));
  };
  const income= transactions.filter(t=>t.type==="income")
                            .reduce((sum,t)=>sum+t.amount,0);
  const expenses = transactions.filter(t=>t.type==="expense")
                            .reduce((sum,t)=>sum+t.amount,0);
  const balance=income-expenses;
  return (
    <BrowserRouter>
      <div style={{
        minHeight: "100vh",
        width: "100%",
        background: "#0f1117",
        color: "white"
      }}>
      
        <Navbar role={role} setRole={setRole}/>
        <Routes>
          <Route path="/" element={<Dashboard balance={balance} income={income} expenses={expenses} transactions={transactions}/>}/>
          <Route path="/transactions" element={<Transactionpage handleadd={handleadd} handledelete={handledelete} transactions={transactions} role={role}/>}/>
        </Routes>

    </div>
    </BrowserRouter>
    
  );
 }
 export default App;
 