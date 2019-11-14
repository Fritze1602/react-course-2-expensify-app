import uuid from 'uuid';

// ADD EXPENSE
export const addExpense = (
    {
        description ='',
        node ='', 
        amount = 0,
        createdAt = 0 
    } = {}
    ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        node,
        amount,
        createdAt
    }
})

// REMOVE EXPENSE
export const removeExpense = ({id} = {}) => (
    {
        type: 'REMOVE_EXPENSE',
        id
})

// EDIT EXPENSE
export const editExpense = (id, updates) => (
    {
        type:'EDIT_EXPENSE',
        id,
        updates
})