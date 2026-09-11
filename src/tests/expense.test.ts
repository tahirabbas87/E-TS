import {ExpenseService} from "../service/expenseService";
import {Category} from "../model/expense";


const mockDate = new Date('2026-06-01');

describe('ExpenseService', () => {
    let expenseService: ExpenseService;

    beforeEach(() => {
        expenseService = new ExpenseService();
    });

    test('should add a valid expense', () => {
        const amount = 50;
        const description = 'Groceries';
        const category: Category = 'Food';

        const expense = expenseService.addExpense(amount, description, category, mockDate);

        expect(expense).toBeDefined();
        expect(typeof expense?.id).toBe('string');

    });

    test('should throw error for amount 0 or negative', () => {
        expect(() => {
            expenseService.addExpense(-10, 'Invalid Amount', 'Food', mockDate);
        }).toThrow('Amount must be greater than 0');
        expect(() => {
            expenseService.addExpense(0, 'Invalid Amount', 'Food', mockDate);
        }).toThrow('Amount must be greater than 0');
    });

    test('should throw error for missing description', () => {
        expect(() => {
            expenseService.addExpense(20, '', 'Food', mockDate);
        }).toThrow('Description is required');
    });

    test('should find and expense by ID if it exists', () => {
        const expense = expenseService.addExpense(50, 'Groceries', 'Food', mockDate);
        const foundExpense = expenseService.findExpenseById(expense.id);
        expect(foundExpense).toBeDefined();
        expect(foundExpense).toEqual(expense);
    });
    test('should return null when searching for a non-existent expense by ID', () => {
        const foundExpense = expenseService.findExpenseById('non-existent-id');
        expect(foundExpense).toBeNull();
    });

    test('should delete an existing expense', () => {
        const expense = expenseService.addExpense(50, 'Groceries', 'Food', mockDate);
        const deleteResult = expenseService.deleteExpense(expense.id);
        expect(deleteResult).toBe(true);
        expect(expenseService.findExpenseById(expense.id)).toBeNull();
    });

    test('should return false when trying to delete a non-existent expense', () => {
        const deleteResult = expenseService.deleteExpense('non-existent-id');
        expect(deleteResult).toBe(false);
    });

    test('should filter expenses by category', () => {
        expenseService.addExpense(50, 'Groceries', 'Food', mockDate);
        expenseService.addExpense(100, 'Concert tickets', 'Entertainment', mockDate);
        const foodExpenses = expenseService.filterByCategory('Food');
        expect(foodExpenses.length).toBe(1);
        expect(foodExpenses[0].description).toBe('Groceries');
    });


    test('should generate correct monthly summary', () => {
        expenseService.addExpense(50, 'Groceries', 'Food', new Date('2026-06-01'));
        expenseService.addExpense(100, 'Concert tickets', 'Entertainment', new Date('2026-06-05'));
        expenseService.addExpense(200, 'Flight to Wonderland', 'Travel', new Date('2026-06-10'));
        expenseService.addExpense(75, 'New shoes', 'Clothes', new Date('2026-06-15'));

        const summary = expenseService.generateMonthlySummary(new Date('2026-06-01'));
        expect(summary).toEqual({
            month: '2026-06',
            totalExpenses: 425,
            expenseCount: 4
        });
    });






});
