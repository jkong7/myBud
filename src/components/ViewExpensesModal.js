import { Stack, Modal, Form, Button } from "react-bootstrap"
import { useRef } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"

//useRef needed to directly access the current value of the input fields
//(nameRef.current.value) and (maxRef.current.value) when the form is 
//submitted, without needing useSTate. This avoids triggering extra re-renders
//useState would cause on every input change 

//In short, used to grab the values of the inputs ONLY when needed (on form
//submission), making form more efficient

export default function ViewExpensesModal({ budgetId, handleClose }) {
    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID} : budgets.find(b=>b.id===budgetId)

  return (
    <Modal show={budgetId!=null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !==UNCATEGORIZED_BUDGET_ID && (
                            <Button onClick={()=>{
                                deleteBudget(budget)
                                handleClose()
                            }} variant="outline-danger">Delete</Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
    </Modal>
  )
}
