import React, { useState } from 'react';
import { Wallet, Plus, Check, CheckCircle2 } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { format, parseISO, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatCurrency, formatDate } from '../../utils/formatters';
import type { Transaction, CreditCard, BankAccount } from '../../types';
import { twMerge } from 'tailwind-merge';

export function UpcomingExpensesWidget() {
    const {
        getFilteredTransactions,
        updateTransaction,
        addTransaction,
        bankAccounts,
        creditCards
    } = useFinance();

    const [removingIds, setRemovingIds] = useState<string[]>([]);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const upcomingExpenses = getFilteredTransactions()
        .filter((t: Transaction) => t.type === 'expense' && !t.isPaid)
        .sort((a: Transaction, b: Transaction) => {
            const dateA = typeof a.date === 'string' ? parseISO(a.date) : a.date;
            const dateB = typeof b.date === 'string' ? parseISO(b.date) : b.date;
            return dateA.getTime() - dateB.getTime();
        });

    const handleMarkPaid = async (transaction: Transaction) => {
        // Trigger animation
        setRemovingIds(prev => [...prev, transaction.id]);

        // Wait for animation
        setTimeout(() => {
            // Update status
            updateTransaction(transaction.id, { isPaid: true });

            // Handle Recurrence
            if (transaction.isRecurring) {
                const nextDate = addMonths(
                    typeof transaction.date === 'string' ? parseISO(transaction.date) : transaction.date,
                    1
                );
                const { id, ...transactionData } = transaction;
                addTransaction({
                    ...transactionData,
                    date: nextDate,
                    isPaid: false
                });
            }

            // Handle Installments (mock logic - decrementing or checking)
            // In a real system we'd check if there are more installments to create

            setRemovingIds(prev => prev.filter(id => id !== transaction.id));
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 3000);
        }, 500);
    };

    const getSourceText = (transaction: Transaction) => {
        if (!transaction.accountId) return 'Não especificado';

        const card = creditCards.find(c => c.id === transaction.accountId);
        if (card) {
            return `Crédito ${card.name} •••• ${card.lastDigits || '0000'}`;
        }

        const account = bankAccounts.find(a => a.id === transaction.accountId);
        if (account) {
            return `${account.name} conta`;
        }

        return 'Conta principal';
    };



    return (
        <div className="bg-white p-6 rounded-[32px] border border-border/50 flex flex-col h-full relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <Wallet size={20} className="text-text-main" />
                    <h3 className="font-black text-xl text-text-main tracking-tight">Próximas despesas</h3>
                </div>
                <button className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-text-main hover:bg-gray-50 transition-colors shadow-sm">
                    <Plus size={20} />
                </button>
            </div>

            {/* List */}
            <div className="flex-1 space-y-0 overflow-y-auto custom-scrollbar -mx-2 px-2">
                {upcomingExpenses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-6 border-2 border-dashed border-gray-100 rounded-[24px]">
                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 size={24} className="text-emerald-500" />
                        </div>
                        <p className="text-sm font-medium text-text-secondary text-center">Nenhuma despesa pendente</p>
                    </div>
                ) : (
                    upcomingExpenses.map((expense) => {
                        const isRemoving = removingIds.includes(expense.id);
                        return (
                            <div
                                key={expense.id}
                                className={twMerge(
                                    "flex items-center justify-between py-5 border-b border-gray-100 last:border-0 transition-all duration-500",
                                    isRemoving ? "opacity-0 translate-x-4 scale-95" : "opacity-100"
                                )}
                            >
                                {/* Left Info */}
                                <div className="flex flex-col gap-0.5">
                                    <h4 className="font-bold text-text-main text-sm">{expense.description}</h4>
                                    <p className="text-[11px] font-bold text-text-secondary">
                                        Vence dia {formatDate(expense.date).substring(0, 5)}
                                    </p>
                                    <p className="text-[10px] text-gray-400 font-medium">{getSourceText(expense)}</p>
                                </div>

                                {/* Right Value & Action */}
                                <div className="flex flex-col items-end gap-2">
                                    <span className="font-black text-base text-text-main">{formatCurrency(expense.amount)}</span>
                                    <button
                                        onClick={() => handleMarkPaid(expense)}
                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-300 hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-500 transition-all active:scale-90"
                                    >
                                        <Check size={16} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Success Toast (Basic implementation) */}
            {showSuccessToast && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-text-main text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300 z-50">
                    Despesa marcada como paga!
                </div>
            )}
        </div>
    );
}
