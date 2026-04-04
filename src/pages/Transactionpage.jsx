import React from 'react'
import Transactions from '../components/Transactions'

const Transactionpage = ({handleadd,handledelete,transactions,role}) => {
  return (
    <div>
        <Transactions handleadd={handleadd} handledelete={handledelete} transactions={transactions} role={role}/>
    </div>
  )
}

export default Transactionpage