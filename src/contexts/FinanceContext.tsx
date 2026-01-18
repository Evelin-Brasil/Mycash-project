import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type {
    Transaction,
    FamilyMember,
    BankAccount,
    CreditCard,
    Goal,
    DateRange,
    TransactionType
} from '../types';
import { startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

// --- MOCK DATA ---
const MOCK_MEMBERS: FamilyMember[] = [
    { id: '1', name: 'Carlos Silva', role: 'Pai', monthlyIncome: 8500, avatarUrl: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Ana Silva', role: 'Mãe', monthlyIncome: 9200, avatarUrl: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Pedro Silva', role: 'Filho', monthlyIncome: 0, avatarUrl: 'https://i.pravatar.cc/150?u=3' },
];

const MOCK_ACCOUNTS: BankAccount[] = [
    { id: 'acc1', name: 'Conta Nubank', balance: 3500.50, holderId: '1' },
    { id: 'acc2', name: 'Conta Itaú', balance: 12500.00, holderId: '2' },
];

const MOCK_CARDS: CreditCard[] = [
    { id: 'card1', name: 'Nubank', limit: 10000, currentBill: 120, closingDay: 5, dueDay: 10, theme: 'black', holderId: '1', lastDigits: '5897' },
    { id: 'card2', name: 'Inter', limit: 5000, currentBill: 2300, closingDay: 15, dueDay: 21, theme: 'lime', holderId: '2', lastDigits: '9921' },
    { id: 'card3', name: 'Picpay', limit: 8000, currentBill: 7000, closingDay: 5, dueDay: 12, theme: 'green', holderId: '1', lastDigits: '1122' }, // Fixed value
] as CreditCard[]; // Cast theme because 'green' isn't in type, should probably be 'lime' or 'black' but aiming for mock variety, strictly type says black/lime/white. Adjusting later if needed. Let's stick to type.

// Correcting theme for type safety
MOCK_CARDS[2].theme = 'lime';

const MOCK_TRANSACTIONS: Transaction[] = [
    // Income
    { id: 't1', description: 'Salário Carlos', amount: 4500, type: 'income', category: 'Salário', date: '2026-01-05', isPaid: true, memberId: '1', accountId: 'acc1', installments: 1 },
    { id: 't2', description: 'Salário Ana', amount: 4000, type: 'income', category: 'Salário', date: '2026-01-05', isPaid: true, memberId: '2', accountId: 'acc2', installments: 1 },
    { id: 't3', description: 'Freelance Design', amount: 500, type: 'income', category: 'Extra', date: '2026-01-15', isPaid: true, memberId: '1', accountId: 'acc1', installments: 1 },

    // Expenses
    { id: 't4', description: 'Aluguel', amount: 2800, type: 'expense', category: 'Aluguel', date: '2026-01-10', isPaid: true, memberId: '1', accountId: 'acc1', installments: 1 },
    { id: 't5', description: 'Supermercado Mensal', amount: 1450.40, type: 'expense', category: 'Mercado', date: '2026-01-12', isPaid: true, memberId: '2', accountId: 'card2', installments: 1 },
    { id: 't6', description: 'Uber', amount: 24.90, type: 'expense', category: 'Transporte', date: '2026-01-14', isPaid: true, memberId: '1', accountId: 'card1', installments: 1 },
    { id: 't7', description: 'Netflix', amount: 55.90, type: 'expense', category: 'Lazer', date: '2026-01-15', isPaid: true, memberId: '3', accountId: 'card1', installments: 1, isRecurring: true },
    { id: 't8', description: 'Escola Pedro', amount: 1800, type: 'expense', category: 'Educação', date: '2026-01-08', isPaid: true, memberId: '2', accountId: 'acc2', installments: 1 },
    { id: 't9', description: 'Gasolina', amount: 250, type: 'expense', category: 'Automóvel', date: '2026-01-18', isPaid: true, memberId: '1', accountId: 'card3', installments: 1 },
    { id: 't10', description: 'Jantar Fora', amount: 320, type: 'expense', category: 'Lazer', date: '2026-01-20', isPaid: false, memberId: '2', accountId: 'card2', installments: 1 },
    { id: 't11', description: 'Farmácia', amount: 85.50, type: 'expense', category: 'Saúde', date: '2026-01-22', isPaid: false, memberId: '1', accountId: 'card1', installments: 1 },
    { id: 't12', description: 'Compra Tenis', amount: 600, type: 'expense', category: 'Compras', date: '2026-01-10', isPaid: true, memberId: '3', accountId: 'card3', installments: 3 },
    { id: 't13', description: 'Internet', amount: 120, type: 'expense', category: 'Serviços', date: '2026-01-15', isPaid: true, memberId: '1', accountId: 'acc1', installments: 1, isRecurring: true },
    { id: 't14', description: 'Spotify', amount: 21.90, type: 'expense', category: 'Lazer', date: '2026-01-01', isPaid: true, memberId: '3', accountId: 'card1', installments: 1, isRecurring: true },
    { id: 't15', description: 'Academia', amount: 110, type: 'expense', category: 'Saúde', date: '2026-01-01', isPaid: true, memberId: '1', accountId: 'card1', installments: 1, isRecurring: true },
];

const MOCK_GOALS: Goal[] = [
    { id: 'g1', name: 'Viagem Disney', targetAmount: 25000, currentAmount: 8500, deadline: '2026-12-31', icon: 'plane' },
    { id: 'g2', name: 'Reserva Emergência', targetAmount: 50000, currentAmount: 12000, deadline: '2026-06-30', icon: 'shield' },
];

// --- CONTEXT DEFINITION ---

interface FinanceState {
    transactions: Transaction[];
    familyMembers: FamilyMember[];
    bankAccounts: BankAccount[];
    creditCards: CreditCard[];
    goals: Goal[];

    // Filters
    selectedMember: string | null;
    dateRange: DateRange;
    transactionType: 'all' | TransactionType;
    searchText: string;
}

export interface FinanceContextType extends FinanceState {
    // Actions - Entities
    addTransaction: (t: Omit<Transaction, 'id'>) => void;
    updateTransaction: (id: string, t: Partial<Transaction>) => void;
    deleteTransaction: (id: string) => void;

    addMember: (m: Omit<FamilyMember, 'id'>) => void;
    addAccount: (a: Omit<BankAccount, 'id'>) => void;
    addCard: (c: Omit<CreditCard, 'id'>) => void;

    // Actions - Filters
    setFilterMember: (id: string | null) => void;
    setFilterDateRange: (range: DateRange) => void;
    setFilterType: (type: 'all' | TransactionType) => void;
    setFilterSearch: (text: string) => void;

    // Derived Calculations
    getFilteredTransactions: () => Transaction[];
    calculateTotalBalance: () => number;
    calculateIncomeForPeriod: () => number;
    calculateExpensesForPeriod: () => number;
    calculateExpensesByCategory: () => { category: string; value: number }[];
    calculateCategoryPercentage: (category: string) => number;
}

export const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
    // --- STATE ---
    // --- STATE WITH PERSISTENCE ---
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const saved = localStorage.getItem('mycash_transactions');
        return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
    });
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
        const saved = localStorage.getItem('mycash_members');
        return saved ? JSON.parse(saved) : MOCK_MEMBERS;
    });
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(() => {
        const saved = localStorage.getItem('mycash_accounts');
        return saved ? JSON.parse(saved) : MOCK_ACCOUNTS;
    });
    const [creditCards, setCreditCards] = useState<CreditCard[]>(() => {
        const saved = localStorage.getItem('mycash_cards');
        return saved ? JSON.parse(saved) : MOCK_CARDS;
    });
    const [goals, setGoals] = useState<Goal[]>(() => {
        const saved = localStorage.getItem('mycash_goals');
        return saved ? JSON.parse(saved) : MOCK_GOALS;
    });

    // --- EFFECTS FOR PERSISTENCE ---
    useEffect(() => { localStorage.setItem('mycash_transactions', JSON.stringify(transactions)); }, [transactions]);
    useEffect(() => { localStorage.setItem('mycash_members', JSON.stringify(familyMembers)); }, [familyMembers]);
    useEffect(() => { localStorage.setItem('mycash_accounts', JSON.stringify(bankAccounts)); }, [bankAccounts]);
    useEffect(() => { localStorage.setItem('mycash_cards', JSON.stringify(creditCards)); }, [creditCards]);
    useEffect(() => { localStorage.setItem('mycash_goals', JSON.stringify(goals)); }, [goals]);

    // Filters State
    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: startOfMonth(new Date("2026-01-01")), // Mocking consistent date with data
        endDate: endOfMonth(new Date("2026-01-31"))
    });
    const [transactionType, setTransactionType] = useState<'all' | TransactionType>('all');
    const [searchText, setSearchText] = useState('');

    // --- ACTIONS ---
    const addTransaction = useCallback((t: Omit<Transaction, 'id'>) => {
        const newTransaction = { ...t, id: crypto.randomUUID() };
        setTransactions(prev => [newTransaction, ...prev]);
    }, []);

    const updateTransaction = useCallback((id: string, t: Partial<Transaction>) => {
        setTransactions(prev => prev.map(item => item.id === id ? { ...item, ...t } : item));
    }, []);

    const deleteTransaction = useCallback((id: string) => {
        setTransactions(prev => prev.filter(item => item.id !== id));
    }, []);

    const addMember = useCallback((m: Omit<FamilyMember, 'id'>) => {
        setFamilyMembers(prev => [...prev, { ...m, id: crypto.randomUUID() }]);
    }, []);

    const addAccount = useCallback((a: Omit<BankAccount, 'id'>) => {
        setBankAccounts(prev => [...prev, { ...a, id: crypto.randomUUID() }]);
    }, []);

    const addCard = useCallback((c: Omit<CreditCard, 'id'>) => {
        setCreditCards(prev => [...prev, { ...c, id: crypto.randomUUID() }]);
    }, []);

    const setFilterMember = setSelectedMember;
    const setFilterDateRange = setDateRange;
    const setFilterType = setTransactionType;
    const setFilterSearch = setSearchText;

    // --- DERIVED CALCULATIONS ---
    const getFilteredTransactions = useCallback(() => {
        return transactions.filter(t => {
            // Filter by Member
            if (selectedMember && t.memberId !== selectedMember) return false;

            // Filter by Type
            if (transactionType !== 'all' && t.type !== transactionType) return false;

            // Filter by Date
            const tDate = typeof t.date === 'string' ? parseISO(t.date) : t.date;
            if (!isWithinInterval(tDate, { start: dateRange.startDate, end: dateRange.endDate })) return false;

            // Filter by Search
            if (searchText) {
                const searchLower = searchText.toLowerCase();
                const matchesDesc = t.description.toLowerCase().includes(searchLower);
                const matchesCat = t.category.toLowerCase().includes(searchLower);
                if (!matchesDesc && !matchesCat) return false;
            }

            return true;
        }).sort((a, b) => {
            const dateA = typeof a.date === 'string' ? parseISO(a.date).getTime() : a.date.getTime();
            const dateB = typeof b.date === 'string' ? parseISO(b.date).getTime() : b.date.getTime();
            return dateB - dateA; // Descending
        });
    }, [transactions, selectedMember, transactionType, dateRange, searchText]);

    const calculateTotalBalance = useCallback(() => {
        // Simple logic: Sum of account balances - Sum of CURRENT card bills
        // In a real app this might be more complex
        const totalAccounts = bankAccounts.reduce((acc, curr) => acc + curr.balance, 0);
        const totalCreditBills = creditCards.reduce((acc, curr) => acc + curr.currentBill, 0);
        return totalAccounts - totalCreditBills;
    }, [bankAccounts, creditCards]);

    const calculateIncomeForPeriod = useCallback(() => {
        const filtered = getFilteredTransactions();
        return filtered
            .filter(t => t.type === 'income')
            .reduce((acc, curr) => acc + curr.amount, 0);
    }, [getFilteredTransactions]);

    const calculateExpensesForPeriod = useCallback(() => {
        const filtered = getFilteredTransactions();
        return filtered
            .filter(t => t.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);
    }, [getFilteredTransactions]);

    const calculateExpensesByCategory = useCallback(() => {
        const filtered = getFilteredTransactions();
        const expenses = filtered.filter(t => t.type === 'expense');

        const grouped = expenses.reduce((acc, curr) => {
            const cat = curr.category;
            acc[cat] = (acc[cat] || 0) + curr.amount;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(grouped)
            .map(([category, value]) => ({ category, value }))
            .sort((a, b) => b.value - a.value);
    }, [getFilteredTransactions]);

    const calculateCategoryPercentage = useCallback((category: string) => {
        const totalExpenses = calculateExpensesForPeriod();
        if (totalExpenses === 0) return 0;

        const categoryData = calculateExpensesByCategory().find(c => c.category === category);
        if (!categoryData) return 0;

        return (categoryData.value / totalExpenses) * 100;
    }, [calculateExpensesForPeriod, calculateExpensesByCategory]);

    return (
        <FinanceContext.Provider value={{
            transactions,
            familyMembers,
            bankAccounts,
            creditCards,
            goals,
            selectedMember,
            dateRange,
            transactionType,
            searchText,
            addTransaction,
            updateTransaction,
            deleteTransaction,
            addMember,
            addAccount,
            addCard,
            setFilterMember,
            setFilterDateRange,
            setFilterType,
            setFilterSearch,
            getFilteredTransactions,
            calculateTotalBalance,
            calculateIncomeForPeriod,
            calculateExpensesForPeriod,
            calculateExpensesByCategory,
            calculateCategoryPercentage
        }}>
            {children}
        </FinanceContext.Provider>
    );
}
