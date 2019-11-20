import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses'
import { get } from 'http';

test('Should correctly add up single expense', ()=>{
   const result = getExpensesTotal([]);
    expect(result).toBe(0);
})

test('Should correctly add up single expense', ()=>{
    const result = getExpensesTotal([expenses[1]]);
    expect(getExpensesTotal([expenses[1]])).toBe(expenses[1].amount);
})

test('Should correctly add up multiple expenses', ()=>{
    const expectedResult = (expenses[1].amount + expenses[2].amount + expenses[0].amount);
    const result = getExpensesTotal(expenses)
    expect(result).toBe(expectedResult);
})




