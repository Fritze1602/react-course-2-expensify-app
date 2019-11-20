import React from 'react';
import {shallow} from 'enzyme';

import {ExpenseSummary} from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';


test('Should render Summary for multiple specific expense', () => {
    const wrapper = shallow( 
    <ExpenseSummary 
        expensesCount = {4}
        expensesTotal = {278}  /> );
    expect(wrapper).toMatchSnapshot();
})

test('Should render Summary for one expense', () => {
    const wrapper = shallow( <ExpenseSummary 
        expensesCount = {1} 
        expensesTotal = {2555}  /> );
    expect(wrapper).toMatchSnapshot();
})

