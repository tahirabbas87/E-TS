/*
 * Expense model
 */

export type Category = 'Food' |  'Entertainment' | 'Travel' | 'Clothes';

/*
    * Expense interface
 */
export interface Expense {
  id: string;
  amount: number;
  category: Category;
  date: Date;
  description?: string;
}
/*
Monthly summary interface
*/
export interface MonthlySummary {
  month: string;
  totalExpenses: number;
  expenseCount: number;
}
