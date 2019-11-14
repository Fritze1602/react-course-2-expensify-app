import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../actions/filters';
import {DateRangePicker} from 'react-dates'

class ExpenseListFilters extends React.Component{
    state = {
        calenderFocused: null
    }
    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate))
    }
    onFocusChange = (calenderFocused) => {
        this.setState(()=>({
            calenderFocused
        }))
    }
    render () {
        return (
            <div>
                <input 
                    type="text" 
                    value={this.props.filters.text} 
                    onChange={(e)=>{
                        this.props.dispatch(setTextFilter(e.target.value));
                }}/>
                <select 
                    value={this.props.filters.sortBy}
                    onChange={(e) => {
                        e.target.value === 'amount' ? this.props.dispatch(sortByAmount()) : this.props.dispatch(sortByDate());
                }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker 
                    startDate={this.props.filters.startDate}
                    startDateId="your_unique_start_date_id" 
                    endDate={this.props.filters.endDate}
                    endDateId="your_unique_end_date_id" 
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calenderFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={()=>false}
                    minimumNights={0}

                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        filters:state.filters
    }
}

export default connect(mapStateToProps)(ExpenseListFilters);