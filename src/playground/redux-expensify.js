import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

// Action Generators

// ADD EXPENSE
const addExpense = (
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
const removeExpense = ({id} = {}) => (
    {
        type: 'REMOVE_EXPENSE',
        id
})

// EDIT EXPENSE

const editExpense = (id, updates) => (
    {
        type:'EDIT_EXPENSE',
        id,
        updates
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

// SORT BY DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    date: 'date'
})

// SORT BY AMMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
})

// SET START DATE
const setStartDate = (startDate) =>({
    type: 'SET_START_DATE',
    startDate
})

// SET END DATE
const setEndDate = (endDate) =>({
    type: 'SET_END_DATE',
    endDate
})



// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE': 
            return state.filter( ({id}) =>id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            })
        default:
            return state;
    }
}

const filterReducerDefaultState = {
    text: '',
    sortBy: 'date', // date or amount
    startDate: 'undefined',
    endDate: 'undefined'
}

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy:'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy:'amount'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate:action.startDate
            }
        case 'SET_END_DATE':
            return{
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducer
    })
);

//Get visible Expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate , endDate}) => {
    return expenses.filter((expense)=>{
         const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
         const endDateMatch = typeof endDate !== 'number' || expense.createdAt >= endDate;
         const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b)=>{
        if (sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        if (sortBy ==='amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    })    
}

store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

const expenseOne = store.dispatch(addExpense({description: 'Monthly rent', amount: 400, createdAt:-21000}));
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 3000, createdAt:-1000}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, {description:'Coffe Irish', amount: 500} ))
// store.dispatch(setTextFilter('coffee'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-19990));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(0));



const demoState = {
    expenses: [{
        id:"aaöklsdjfaösf",
        description: 'January Rent',
        node: 'This was the final payment for that address',
        amount: '55400',
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: 'undefined',
        endDate: 'undefined'
    }
}

