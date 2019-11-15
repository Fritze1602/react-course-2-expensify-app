import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, altFilters} from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(()=>{
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters = {filters}
            setTextFilter = {setTextFilter}
            sortByDate = {sortByDate}
            sortByAmount = {sortByAmount}
            setStartDate = {setStartDate} 
            setEndDate = {setEndDate} 
        />
    )
})

test('Should Render ExpenseListFilters correctly', ()=>{
    expect(wrapper).toMatchSnapshot();
})

test('Should Render Expense List filters altFilters correctly', ()=>{
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot();
})

// should handle a text Change 

test('should handle a text change', () => {
    const value = 'bill'
    wrapper.find('input').simulate('change', {
        target:{value}
    });  
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
})

test('should sort by Amount', () => {
    wrapper.find('select').simulate('change', {
        target:{value:'amount'}
    });
     expect(sortByAmount).toHaveBeenCalled();
})

test('should sort by Date', () => {
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', {
        target:{value:'date'}
    });
     expect(sortByDate).toHaveBeenCalled();
})


test('Should handle Date Changes', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({
        startDate: startDate, 
        endDate: endDate
    });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
})

test('should handle Date focus changes', () => {
    const calenderFocused = 'endDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calenderFocused);
    expect(wrapper.state('calenderFocused')).toBe(calenderFocused);
})