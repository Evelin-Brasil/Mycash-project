export type TransactionType = 'income' | 'expense';

export type Category =
    | 'Aluguel'
    | 'Alimentação'
    | 'Automóvel'
    | 'Mercado'
    | 'Saúde'
    | 'Lazer'
    | 'Educação'
    | 'Serviços'
    | 'Compras'
    | 'Transporte'
    | 'Outros'
    | 'Salário'
    | 'Investimento'
    | 'Extra';

export interface FamilyMember {
    id: string;
    name: string;
    role: string;
    avatarUrl?: string; // Optional URL or local path
    monthlyIncome?: number;
}

export interface BankAccount {
    id: string;
    name: string;
    institution?: string;
    balance: number;
    holderId: string; // Link to FamilyMember
}

export interface CreditCard {
    id: string;
    name: string;
    institution?: string;
    limit: number;
    currentBill: number;
    closingDay: number;
    dueDay: number;
    lastDigits?: string;
    holderId: string; // Link to FamilyMember
    theme: 'black' | 'lime' | 'white';
}

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: TransactionType;
    category: Category | string;
    date: Date | string; // Support both for flexibility, usually ISO string
    accountId?: string; // Link to BankAccount or CreditCard
    memberId?: string; // Link to FamilyMember
    isPaid: boolean;
    installments?: number; // 1 for one-time
    isRecurring?: boolean;
}

export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: Date | string;
    icon?: string;
}

export interface DateRange {
    startDate: Date;
    endDate: Date;
}
