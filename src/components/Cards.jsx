import "../css/cards.css";

const Cards = ({ balance, income, expenses }) => {
  return (
    <div className="cards-container">

      <div className="card">
        <p>Total Balance</p>
        <h3>₹{balance}</h3>
      </div>

      <div className="card">
        <p>Current Income</p>
        <h3>₹{income}</h3>
      </div>

      <div className="card">
        <p>Current Expenses</p>
        <h3>₹{expenses}</h3>
      </div>

    </div>
  );
};

export default Cards;