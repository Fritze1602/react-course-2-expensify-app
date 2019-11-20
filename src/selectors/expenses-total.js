export default (expenses) => {
   return expenses
    .map((expense) => expense.amount)
    .reduce((accum,current) => accum + current,0)
}
