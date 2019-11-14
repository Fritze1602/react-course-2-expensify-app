import {addExpense, removeExpense, editExpense} from '../../actions/expenses';

test('shoud setup remove expense action object',()=>{
    const action= removeExpense( {id:'123abc'} );
    expect(action).toEqual({
        id:'123abc',
        type: 'REMOVE_EXPENSE'
    })
})

test('should setup edit expense object', () => {
    const action = editExpense('123abc', {node:'my node'})
    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            node:'my node'
        }
    })
})

// ADD EXPENSE
test('should setup add epxpense object with provided values', () => {
    const expenseData = {
          description: 'Bremen Reise',
          amount: '74500',
          createdAt: '1000',
          node: 'this was my Bremen visit'
    }
    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
        ...expenseData,  
        id: expect.any(String)
    }
    })
})

test('should setup add epxpense object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description:'',
            node:'', 
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        } 
    })
})