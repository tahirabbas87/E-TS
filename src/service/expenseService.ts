import {Category, Expense, MonthlySummary} from '../model/expense';

export class ExpenseService {
    private expenses: Map<string, Expense> = new Map();
    private readonly supportedCategories: Category[] = ['Food', 'Entertainment', 'Travel', 'Clothes'];
    constructor() {
    }

    /*
 1.	The amount must be greater than zero.
2.	Description is required.
3.	Category must be one of the supported categories.
4.	Date must be valid.
5.	An expense that doesn't exist cannot be deleted.

  */
    private validateExpense(amount: number, description: string, category: Category, date: Date): void {
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

 
    public addExpense(amount: number, description: string, category: Category, dateInput: Date): Expense {
        this.validateExpense(amount, description, category, dateInput);
        const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
        const expense: Expense = {
            id,
            amount,
            description,
            category,
            date: dateInput
        };
        this.expenses.set(id, expense);
        return expense;
    }

    public findExpenseById(id: string): Expense | null {
        return this.expenses.get(id) || null;
    }
    public listExpenses(): Expense[] {
        return Array.from(this.expenses.values());
    }
    public deleteExpense(id: string): boolean {
        if (!this.expenses.has(id)) {
            console.log('Expense not found');
            return false;
        }
        return this.expenses.delete(id);
        
    }
    public filterByCategory(category: Category): Expense[] {
        if (!this.supportedCategories.includes(category)) {
            throw new Error('Invalid category');
        }
        return Array.from(this.expenses.values()).filter(expense => expense.category === category);
    }
    
    public calculateTotalExpenses(): number {
        return Array.from(this.expenses.values()).reduce((total, expense) => total + expense.amount, 0);
    }
    public generateMonthlySummary(targetDate: Date): MonthlySummary {
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