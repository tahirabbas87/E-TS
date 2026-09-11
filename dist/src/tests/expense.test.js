"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpenseService_1 = require("../services/ExpenseService");
// Mocking Date for predictable testing of monthly summaries
const mockDate = new Date('2026-09-15T00:00:00.000Z');
describe('ExpenseService', () => {
    let service;
    beforeEach(() => {
        // Reinitialize the service before each test to ensure isolation
        service = new ExpenseService_1.ExpenseService();
    });
    // --- Test Case 1: Add Expense & Validation ---
    test('should successfully add a valid expense', () => {
        const amount = 50.0;
        const description = "Test purchase";
        const category = 'Food';
        const date = new Date();
        const expense = service.addExpense(amount, description, category, date);
        expect(expense).toBeDefined();
        expect(typeof (expense === null || expense === void 0 ? void 0 : expense.id)).toBe('string');
    });
    test('should throw error if amount is zero or negative', () => {
        const date = new Date();
        // Test zero
        expect(() => service.addExpense(0, "Desc", 'Food', date)).toThrow("Amount must be greater than zero.");
        // Test negative
        expect(() => service.addExpense(-10, "Desc", 'Food', date)).toThrow("Amount must be greater than zero.");
    });
    test('should throw error if description is missing', () => {
        const date = new Date();
        expect(() => service.addExpense(10, "", 'Food', date)).toThrow("Description is required.");
    });
    // --- Test Case 2: List and Find ---
    test('should list all added expenses correctly', () => {
        service.addExpense(10, "A", 'Food', new Date());
        service.addExpense(20, "B", 'Travel', new Date());
        const expenses = service.listExpenses();
        expect(expenses).toHaveLength(2);
    });
    test('should find an expense by ID if it exists', () => {
        const date = new Date();
        const expense = service.addExpense(10, "Test Find", 'Food', date);
        const found = service.findExpenseById(expense.id);
        expect(found).toBeDefined();
        expect(found === null || found === void 0 ? void 0 : found.description).toBe("Test Find");
    });
    test('should return null for non-existent ID', () => {
        const found = service.findExpenseById("nonExistentId12345");
        expect(found).toBeNull();
    });
    // --- Test Case 3: Delete Expense ---
    test('should delete an existing expense and return true', () => {
        const date = new Date();
        const expense = service.addExpense(10, "To be deleted", 'Food', date);
        const success = service.deleteExpense(expense.id);
        expect(success).toBe(true);
        // Verify deletion
        const foundAfterDelete = service.findExpenseById(expense.id);
        expect(foundAfterDelete).toBeNull();
    });
    test('should return false when attempting to delete a non-existent expense', () => {
        const success = service.deleteExpense("definitelyNotHere");
        expect(success).toBe(false);
    });
    // --- Test Case 4: Filter, Total, Summary ---
    test('should filter expenses correctly by category', () => {
        service.addExpense(10, "Food item", 'Food', new Date());
        service.addExpense(50, "Travel item", 'Travel', new Date());
        service.addExpense(20, "Another food item", 'Food', new Date());
        const foodExpenses = service.filterByCategory('Food');
        expect(foodExpenses).toHaveLength(2);
    });
    test('should calculate total spending accurately', () => {
        service.addExpense(10.50, "A", 'Food', new Date());
        service.addExpense(9.50, "B", 'Travel', new Date());
        service.addExpense(20.00, "C", 'Entertainment', new Date());
        const total = service.calculateTotalSpending();
        expect(total).toBeCloseTo(40.00); // 10.5 + 9.5 + 20.0
    });
    test('should generate correct monthly summary for the target month', () => {
        // Setup expenses spanning two months (Sept and Oct)
        service.addExpense(100, "Sep expense", 'Food', new Date('2026-09-05'));
        service.addExpense(50, "Sep expense 2", 'Travel', new Date('2026-09-25'));
        service.addExpense(10, "Oct expense", 'Food', new Date('2026-10-01'));
        // Test for September (Target Month)
        const summarySept = service.generateMonthlySummary(new Date('2026-09-15T00:00:00.000Z'));
        expect(summarySept.monthYear).toBe("2026-09");
        expect(summarySept.totalSpending).toBe(150.00); // 100 + 50
        expect(summarySept.expenseCount).toBe(2);
        // Test for October (Different Month)
        const summaryOct = service.generateMonthlySummary(new Date('2026-10-15T00:00:00.000Z'));
        expect(summaryOct.monthYear).toBe("2026-10");
        expect(summaryOct.totalSpending).toBe(10.00);
        expect(summaryOct.expenseCount).toBe(1);
    });
});
