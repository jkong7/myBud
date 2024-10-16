import React, { useContext, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'; 
import useLocalStorage from '../hooks/useLocalStorage';

//1. Create the context using React.createcontext(defaultvalue)
const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

//Shorthand custom hook that gets useContext(BudgetsContext), everything 
//wrapped in the provider component has access to all of the values now through
//useBudgets()
export function useBudgets() {
    return useContext(BudgetsContext)
}

//2. Context provider component wraps around parts of component tree and provides
//a value that can be accessed by ay child component within it
export const BudgetsProvider = ({ children }) => {

    //Define props here, centralizing state management, makes it easy to manage
    //and maintain the shared data, all child components inside prov can access context
    //so defining state and functions here allows you to eff pass down shared data
    //without manually pop drilling 
    //Encapsulation: Encapsulate all related logic, state, functions in one place

    //Could also just use BudgetsContext.Provider in index, but then all of this defining stuff
    //would go there, making it not as neat 
    
    /*
    //budgets
    {
        id: 
        name: 
        max: 
    }

    //expense
    {
        id: 
        budgetId: 
        amount: 
        description: 
    }
    */
    const [budgets, setBudgets] = useLocalStorage("budgets", []) //Instead of useState, use useLocalStorage to persist changes to 
    //localStorage, "budgets" key and [] as default value 
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    function getBudgetExpenses(budgetId) {
        return expenses.filter((expense)=>expense.budgetId===budgetId)
    } //returns only expenses of certain budgetId using filter, for example
      //entertainment expenses 

    function addExpenses({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        })
    } //same as addBudget, no repeat check needed 

    function addBudget ({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name===name)) {
                return prevBudgets
            }
            return [...prevBudgets, {id: uuidV4(), name, max }]
        })
    } //adds a new budget with gen uuid id and passed name and max, spread+new object
      //handles repeat (dont add new budget, same state), .find->callback to find first
      // elem in array that satisfies, undefined if cant find 

    function deleteBudget ({ id }) {
        //delete budget, DONT delete expenses, add to uncat expenses, 
        //To do: deal with expenses 

        setBudgets(previousBudgets => {
            return previousBudgets.filter(budget=>budget.id!==id)
        })
    } //delete budget that DOESNT have current id (deleted id)

    function deleteExpense({ id }) {
        setExpenses(previousExpenses => {
            return previousExpenses.filter(expense=>expense.id!==id)
        }) //Same as deleteBudget
    }



    return <BudgetsContext.Provider value={{
        budgets, 
        expenses, 
        getBudgetExpenses, 
        addExpenses, 
        addBudget, 
        deleteBudget, 
        deleteExpense
    }}>
        {children}
    </BudgetsContext.Provider>
}
