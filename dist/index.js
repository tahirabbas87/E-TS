"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expenseService_1 = require("./service/expenseService");
function main() {
    console.log("Welcome to the Expense Tracker!");
    const expenseService = new expenseService_1.ExpenseService();
    // Add some expenses
    try {
        expenseService.addExpense(50, 'Groceries', 'Food', new Date('2026-06-01'));
        console.log("Expense Groceries of 50 added successfully!");
        expenseService.addExpense(100, 'Concert tickets', 'Entertainment', new Date('2026-06-05'));
        console.log("Expense Concert tickets of 100 added successfully!");
        expenseService.addExpense(200, 'Flight to WonderLand', 'Travel', new Date('2026-06-10'));
        console.log("Expense Flight to WonderLand of 200 added successfully!");
        expenseService.addExpense(75, 'New shoes', 'Clothes', new Date('2026-06-15'));
        console.log("Expense New shoes of 75 added successfully!");
    }
    catch (error) {
        console.error(error);
    }
    // List all expenses
    console.log('All Expenses:', expenseService.listExpenses());
    // Find an expense by ID
    const expenseId = expenseService.listExpenses()[0].id;
    const foundExpense = expenseService.findExpenseById(expenseId);
    console.log('Found Expense:', foundExpense);
    // Filter expenses by category
    const foodExpenses = expenseService.filterByCategory('Food');
    console.log('Food Expenses:', foodExpenses);
    // Calculate total expenses
    const totalExpenses = expenseService.calculateTotalExpenses();
    console.log('Total Expenses:', totalExpenses);
    // Delete an expense
    const deleteSuccess = expenseService.deleteExpense(expenseId);
    console.log(`Expense with ID ${expenseId} deleted:`, deleteSuccess);
    // List all expenses after deletion
    console.log('All Expenses after deletion:', expenseService.listExpenses());
    console.log('FareWell! Thank you for using the Expense Tracker.');
}
main();
