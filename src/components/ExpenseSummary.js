import React from 'react';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral'
import {connect} from 'react-redux';

export const ExpenseSummary = ({expensesCount, expensesTotal}) => {
    const expensesWord = expensesCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal/100).format('$0,0.00');
    return (
        <div>
            <p>Viewing {expensesCount} {expensesWord} with amount of {formattedExpensesTotal}.</p>
        </div>
    )
}

const mapStateToProps = (state)=>{
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expensesCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpenseSummary);

