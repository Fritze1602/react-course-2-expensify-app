import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test ('should setup default filter values', () => {
    const state = filtersReducer(undefined, {type:'@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date', // date or amount
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
}) 

test ('should set sortby to amount', () => {
    const state = filtersReducer(undefined,{ type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount')
}) 

test ('should set sortby to date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const action = {type: 'SORT_BY_DATE'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date')
}) 

// should set text filter

test('should set text filter', () => {
    const text = 'bill';
    const action = {
        type:'SET_TEXT_FILTER', 
        text
    }
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
})

// should set startDate filter
test('should set startDate filter', () => {
    const action =  {
        type:'SET_START_DATE', 
        startDate:moment(1000)
    }
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(moment(1000));
})

test('should set endDate filter', () => {
    const action = {
        type:'SET_END_DATE', 
        endDate: moment(2000)
    }
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(moment(2000));
})