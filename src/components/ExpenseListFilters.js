import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../actions/filters';
import {DateRangePicker} from 'react-dates';

export class ExpenseListFilters extends React.Component{
    state = {
        calenderFocused: null
    }
    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }
    onFocusChange = (calenderFocused) => {
        this.setState(()=>({
            calenderFocused
        }))
    }
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);        
    }
    onSortChange = (e) => {
        e.target.value === 'amount' ? this.props.sortByAmount() : this.props.sortByDate();
    }
    render () {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">  
                        <input 
                            className ="text-input"
                            placeholder="Search expenses"
                            type="text" 
                            value={this.props.filters.text} 
                            onChange={this.onTextChange}/>
                    </div>
                    <div className="input-group__item">
                        <select 
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={this.onSortChange}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
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
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    filters:state.filters
})

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (textFilter) => dispatch(setTextFilter(textFilter)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);