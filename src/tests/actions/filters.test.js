import moment from 'moment';
import {setStartDate, setEndDate, setTextFilter, sortByDate,sortByAmount} from '../../actions/filters';

test('should generate set start Date Object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

test('should generate set End Date Object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})

// SET TEXT FILTER
test('should generate set Text Filter Object with provided values', () => {
    const text = 'bill'
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    })
})

test('should generate set Text Filter Object with default', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})

// SORT BY DATE
test('should generate Sort By Date Object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE',
        date: 'date'
    })
})

test('should generate Sort By Amount Object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT',
        amount: 'amount'
    })
})


