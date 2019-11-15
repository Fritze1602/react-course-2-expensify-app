import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

// 3 Testcases should render (snapshot)
// Should handle Edit Expense (spys)
// Should handle Remove Expense (spys)


let editExpense, removeExpense, history, wrapper;
beforeEach(()=>{
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(
        <EditExpensePage 
        editExpense={editExpense} 
        removeExpense = {removeExpense}
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
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
})

test('Should handle Edit Expense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith(expenses[2].id);
})
