import {
    startAddExpense, 
    addExpense, 
    removeExpense, 
    editExpense, 
    setExpenses, 
    startEditExpense,
    startSetExpenses, 
    startRemoveExpense} 
from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockstore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockstore([thunk]);
const uid ="thisismytestuid";
const defaultAuthState = {auth:{uid}};

beforeEach((done)=>{
    const expensesData = {}
    expenses.forEach(({id, description, note, amount, createdAt})=>{
        expensesData[id] = { description, note, amount, createdAt }
    }) 
    database.ref(`users/${uid}/expenses`).set(expensesData).then(()=>done())
})

test('shoud setup remove expense action object',()=>{
    const action= removeExpense( {id:'123abc'} );
    expect(action).toEqual({
        id:'123abc',
        type: 'REMOVE_EXPENSE'
    })
})

test('should remove expense from database', (done) => {
    const store = createMockStore(defaultAuthState);
    const id=expenses[1].id;
    store.dispatch(startRemoveExpense({id}))
    .then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return (database.ref(`users/${uid}/expenses/${id}`)).once('value')
    }).then((snapshot)=>{
        expect(snapshot.val()).toBeNull()
       done();
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

test('should edit expense in database', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    const updateData = {
        description: 'Update',
        amount: '666',
        createdAt: '6000'
    }
    store.dispatch(startEditExpense(id, updateData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:"EDIT_EXPENSE",
            id,
            updates: updateData});
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual({
            createdAt: expenses[2].description,
            description: expenses[2].description,
            amount: expenses[2].amount,
            note: expenses[2].note,
            ...updateData
        }             
        )
        done();
    })
})

// ADD EXPENSE
test('should setup add epxpense object with provided values', () => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: '3000',
        note: 'This one is far better',
        createdAt: '1000'
    }
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        // following return another promise
       return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
})

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseDefaultData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaultData
            }
        })
        // following return another promise
       return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseDefaultData);
        done();
    });
})

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    })
})

