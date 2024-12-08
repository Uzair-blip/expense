import React from 'react'
import BudgetList from './_components/BudgetList'

const page = () => {
  return (
    <div>
  <h1 className='text-3xl font-bold mt-10 mb-10'>My Budgets
  </h1>
      <BudgetList/>
     
    </div>
  )
}

export default page