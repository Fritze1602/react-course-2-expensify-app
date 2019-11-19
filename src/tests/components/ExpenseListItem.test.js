import React from 'react';
import {shallow} from 'enzyme';

import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';


test('Should render List Item for specific expense', () => {
    const wrapper = shallow( <ExpenseListItem{...expenses[1]} /> );
    expect(wrapper).toMatchSnapshot();
})