import { Modal, Form, Button } from "react-bootstrap"
import { useRef } from 'react'
import { useBudgets } from "../contexts/BudgetsContext"

//useRef needed to directly access the current value of the input fields
//(nameRef.current.value) and (maxRef.current.value) when the form is 
//submitted, without needing useSTate. This avoids triggering extra re-renders
//useState would cause on every input change 

//In short, used to grab the values of the inputs ONLY when needed (on form
//submission), making form more efficient

export default function AddBudgetModal({ show, handleClose }) {
    const { addBudget } = useBudgets() //useContext prop 
    const nameRef= useRef() //get current input value field
    const maxRef=useRef() //get current input value field 
    function handleSubmit(e) {
        e.preventDefault(); 
        addBudget({ //use this prop function to add new budget with the input ref values name and max
            name: nameRef.current.value, 
            max: parseFloat(maxRef.current.value)
        })
        handleClose() //after user adds, close the form too 
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="max">
                    <Form.Label>Maximum Spending</Form.Label>
                    <Form.Control ref={maxRef} type="number" required min={0} step={.01}/>
                </Form.Group>
            </Modal.Body>
            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">Add</Button>
            </div>
        </Form>
    </Modal>
  )
}
