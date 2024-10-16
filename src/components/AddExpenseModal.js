import { Modal, Form, Button } from "react-bootstrap"
import { useRef } from 'react'
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext"


//VERY SIMILAR TO AddBudgetModal

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    const { addExpenses, budgets } = useBudgets() //useContext prop 
    const descriptionRef= useRef() //get current input value field
    const budgetIdRef=useRef() //get current input value field 
    const amountRef = useRef()

    function handleSubmit(e) {
        e.preventDefault(); 
        addExpenses({ //use this prop function to add new budget with the input ref values name and max
            description: descriptionRef.current.value, 
            amount: parseFloat(amountRef.current.value), 
            budgetId: budgetIdRef.current.value
        })
        handleClose() //after user adds, close the form too 
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionRef} type="text" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control ref={amountRef} type="number" required min={0} step={.01}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="budgetId">
                    <Form.Label>Budget</Form.Label>
                    <Form.Select 
                        defaultValue={defaultBudgetId}
                        ref={budgetIdRef}>
                            <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                        {budgets.map(budget => (
                            <option key={budget.id} value={budget.id}>{budget.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">Add</Button>
            </div>
        </Form>
    </Modal>
  )
}
