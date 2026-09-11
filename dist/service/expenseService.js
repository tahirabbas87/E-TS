"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
class ExpenseService {
    constructor() {
        this.expenses = new Map();
        this.supportedCategories = ['Food', 'Entertainment', 'Travel', 'Clothes'];
    }
    /*
 1.	The amount must be greater than zero.
2.	Description is required.
3.	Category must be one of the supported categories.
4.	Date must be valid.
5.	An expense that doesn't exist cannot be deleted.

  */
    validateExpense(amount, description, category, date) {
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }
        if (!['Food', 'Entertainment', 'Travel', 'Clothes'].includes(category)) {
            throw new Error('Invalid category');
        }
        if (!description || description.trim() === '') {
            throw new Error('Description is required');
        }
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }
    }
    addExpense(amount, description, category, dateInput) {
        this.validateExpense(amount, description, category, dateInput);
        const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
        const expense = {
            id,
            amount,
            description,
            category,
            date: dateInput
        };
        this.expenses.set(id, expense);
        return expense;
    }
    findExpenseById(id) {
        return this.expenses.get(id) || null;
    }
    listExpenses() {
        return Array.from(this.expenses.values());
    }
    deleteExpense(id) {
        if (!this.expenses.has(id)) {
            console.log('Expense not found');
            return false;
        }
        return this.expenses.delete(id);
    }
    filterByCategory(category) {
        if (!this.supportedCategories.includes(category)) {
            throw new Error('Invalid category');
        }
        return Array.from(this.expenses.values()).filter(expense => expense.category === category);
    }
    calculateTotalExpenses() {
        return Array.from(this.expenses.values()).reduce((total, expense) => total + expense.amount, 0);
    }
    generateMonthlySummary(targetDate) {
        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based  
        const monthYear = `${year}-${month}`;
        const monthlyExpenses = Array.from(this.expenses.values()).filter(expense => {
            const expenseMonthYear = expense.date.toISOString().slice(0, 7);
            return expenseMonthYear === monthYear;
        });
        const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        return {
            month: monthYear,
            totalExpenses,
            expenseCount: monthlyExpenses.length
        };
    }
}
exports.ExpenseService = ExpenseService;
