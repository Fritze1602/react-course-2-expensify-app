import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';


// 3 Testcases should render (snapshot)
// Should handle Edit Expense (spys)
// Should handle Remove Expense (spys)

let startEditExpense, startRemoveExpense, history, wrapper;
beforeEach(()=>{
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(
        <EditExpensePage 
        startEditExpense={startEditExpense} 
        startRemoveExpense = {startRemoveExpense}
        history={history} 
        expense = {expenses[2]}/> 
        );
})

test('Should render Edit Page correctly', () => {
     expect(wrapper).toMatchSnapshot();
})

test('Should handle Edit Expense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
})

test('Should handle startRemvoeExpense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[2].id);
})
