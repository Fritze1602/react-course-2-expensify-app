import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('default setup to default state - empty array', () => {
    const state = expensesReducer(undefined, {type:'@@INIT'});
    expect(state).toEqual([]);
})

test('Should remove expense by ID', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses , action);
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('Should remove expense by ID if ID not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id:'-Bratwurst'
    }
    const state = expensesReducer(expenses , action);
    expect(state).toEqual([expenses[0],expenses[1], expenses[2]])
})

//Should add an expense

test('Should add expense', () => {
    const expense = {
        id: '4',
        description: 'added Expense',
        node:'node for added expense',
        amount: 666000,
        createdAt: moment()
    }
    const action= {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense])
})

// Should edit an expens
test('should edit an expense', () => {
    const action = {
        type:'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount: 295,
            node: 'Bremen'
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], {...expenses[1], ...action.updates}, expenses[2]]) 
})

// Should not edit an expens if expens not found
test('should edit an expense', () => {
    const action = {
        type:'EDIT_EXPENSE',
        id: 'Bremen',
        updates: {

            amount: 295,
            createdAt: moment(0).add(12, 'days').valueOf()
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses) 
})

test('should set expenses', () => {
    const action = {
        type:'SET_EXPENSES',
        expenses: [expenses[1]] 
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]])
})
