import React from 'react';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses'

import {ExpenseList} from '../../components/ExpenseList';

test('Should render List with expenses (fixtures)', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses}/>);
    expect(wrapper).toMatchSnapshot();
})

test('Should render Expense List withe empty Message', () => {
    const wrapper = shallow(<ExpenseList expenses={[]}/>);
    expect(wrapper).toMatchSnapshot();
})