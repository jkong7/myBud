import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container"; 
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { useState } from 'react'
import { useBudgets } from "./contexts/BudgetsContext";

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(false)

  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }


  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={()=>setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div style={{ display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "1rem", 
          alignItems: "flex-start"}}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense)=>
            total+expense.amount, 0)//getBudgetExpenses returns as a list of expenses so we use reduce to sum up expenses, same as sum for loop
            return (
              <BudgetCard 
                key={budget.id}
                name={budget.name} 
                amount={amount} 
                max={budget.max} 
                onAddExpenseClick={()=>openAddExpenseModal(budget.id)}
              />
            )
          })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}/>
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={()=>
        setShowAddBudgetModal(false)
      }/>
      <AddExpenseModal defaultBudgetId={addExpenseModalBudgetId} show={showAddExpenseModal} handleClose={()=>
        setShowAddExpenseModal(false)
      }/>
  </>
    )
}

export default App;


// React bootstrap container component: layour wrapper
// used to align and center content horizontally in a webpage
// Provides responsive behavior, adapting to diff screen size
// by adjusting the width 

// React bootstrap stack component: used to manage vert 
// or hor arrangement with consistent spacing, default vert, 
// can specify direction="horizontal" (gap 1-5)

//className attribute used to apply bootstrap styles in react

// me auto pushes elem to left in hor layout, auto adjusts margin 
//on right side 