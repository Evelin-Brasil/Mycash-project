import React, { useState, useMemo } from 'react';
import { X, ArrowRight, Plus, Edit2, CreditCard, Landmark, Calendar, ShoppingBag } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { twMerge } from 'tailwind-merge';
import { CountUp } from '../ui/CountUp';
import { formatCurrency, formatDateShort } from '../../utils/formatters';

interface CardDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    sourceId: string | null;
    sourceType: 'account' | 'card';
    onAddExpense: (sourceId: string) => void;
    onViewFullStatement: (sourceId: string) => void;
}

export function CardDetailsModal({
    isOpen,
    onClose,
    sourceId,
    sourceType,
    onAddExpense,
    onViewFullStatement
}: CardDetailsModalProps) {
    const {
        bankAccounts,
        creditCards,
        transactions
    } = useFinance();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const source = useMemo(() => {
        if (!sourceId) return null;
        if (sourceType === 'account') {
            return bankAccounts.find(a => a.id === sourceId);
        }
        return creditCards.find(c => c.id === sourceId);
    }, [sourceId, sourceType, bankAccounts, creditCards]);

    const sourceTransactions = useMemo(() => {
        if (!sourceId) return [];
        return transactions
            .filter(t => t.accountId === sourceId)
            .sort((a, b) => {
                const dateA = typeof a.date === 'string' ? new Date(a.date).getTime() : a.date.getTime();
                const dateB = typeof b.date === 'string' ? new Date(b.date).getTime() : b.date.getTime();
                return dateB - dateA;
            });
    }, [sourceId, transactions]);

    const paginatedTransactions = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return sourceTransactions.slice(start, start + itemsPerPage);
    }, [sourceTransactions, currentPage]);

    const totalPages = Math.ceil(sourceTransactions.length / itemsPerPage);

    if (!isOpen || !source) return null;

    const isCard = sourceType === 'card';
    const cardSource = source as any;



    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-[650px] relative z-10 overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-8 flex items-center justify-between border-b border-gray-50 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className={twMerge(
                            "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
                            isCard ? "bg-text-main" : "bg-primary text-text-main"
                        )}>
                            {isCard ? <CreditCard size={24} /> : <Landmark size={24} />}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-text-main tracking-tighter leading-tight">{source.name}</h2>
                            <p className="text-sm font-bold text-text-secondary">
                                {isCard
                                    ? `Final •••• ${cardSource.lastDigits || '0000'}`
                                    : cardSource.institution || 'Conta Bancária'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-text-secondary">
                        <X size={24} />
                    </button>
                </div>

                {/* Main Content - Scrollable */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-6">
                    {/* Summary Info */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 p-6 rounded-[32px] border border-border/50">
                            <p className="text-xs font-black text-text-secondary uppercase tracking-widest mb-2 px-1">
                                {isCard ? 'Fatura Atual' : 'Saldo Atual'}
                            </p>
                            <CountUp
                                value={isCard ? cardSource.currentBill : cardSource.balance}
                                formatter={formatCurrency}
                                className="text-2xl font-black text-text-main tracking-tight"
                            />
                        </div>
                        {isCard && (
                            <div className="bg-gray-50 p-6 rounded-[32px] border border-border/50">
                                <p className="text-xs font-black text-text-secondary uppercase tracking-widest mb-2 px-1">
                                    Limite Disponível
                                </p>
                                <CountUp
                                    value={cardSource.limit - cardSource.currentBill}
                                    formatter={formatCurrency}
                                    className="text-2xl font-black text-success tracking-tight"
                                />
                            </div>
                        )}
                    </div>

                    {/* Recent Transactions Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-lg font-black text-text-main tracking-tight">Transações Recentes</h3>
                            <span className="text-xs font-bold text-text-secondary bg-gray-100 px-3 py-1 rounded-full">
                                {sourceTransactions.length} lançamentos
                            </span>
                        </div>

                        <div className="space-y-2">
                            {sourceTransactions.length === 0 ? (
                                <div className="py-12 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-[32px] border border-dashed border-gray-200">
                                    <ShoppingBag size={48} className="text-gray-300 mb-4" />
                                    <p className="text-sm font-bold text-text-secondary max-w-[200px]">
                                        Nenhuma despesa registrada neste cartão ainda.
                                    </p>
                                </div>
                            ) : (
                                paginatedTransactions.map((t) => (
                                    <div
                                        key={t.id}
                                        className="flex items-center justify-between p-4 bg-white border border-border/40 rounded-2xl hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-text-secondary group-hover:bg-white transition-colors">
                                                < ShoppingBag size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-text-main leading-tight">{t.description}</p>
                                                <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                                                    {typeof t.date === 'string'
                                                        ? formatDateShort(new Date(t.date))
                                                        : formatDateShort(t.date)}
                                                </p>
                                            </div>
                                        </div>
                                        <p className={twMerge(
                                            "text-sm font-black",
                                            t.type === 'income' ? "text-success" : "text-rose-500"
                                        )}>
                                            {t.type === 'income' ? '+ ' : '- '}
                                            {formatCurrency(t.amount)}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-6">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    className="p-2 text-text-secondary hover:text-text-main disabled:opacity-30 transition-colors"
                                >
                                    <ArrowRight size={20} className="rotate-180" />
                                </button>
                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={twMerge(
                                                "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                                                currentPage === i + 1
                                                    ? "bg-text-main text-white shadow-lg shadow-black/10"
                                                    : "text-text-secondary hover:bg-gray-100"
                                            )}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    className="p-2 text-text-secondary hover:text-text-main disabled:opacity-30 transition-colors"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 bg-gray-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-full font-black text-sm text-text-secondary hover:bg-gray-200 transition-all active:scale-95"
                        >
                            Fechar
                        </button>
                        <button
                            onClick={() => onViewFullStatement(sourceId!)}
                            className="flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm text-text-main hover:bg-white hover:shadow-md transition-all active:scale-95"
                        >
                            Ver Extrato <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            className="p-3 bg-white border border-border/60 rounded-full text-text-secondary hover:text-text-main hover:shadow-md transition-all active:scale-90"
                            title="Editar"
                        >
                            <Edit2 size={20} />
                        </button>
                        <button
                            onClick={() => onAddExpense(sourceId!)}
                            className="flex items-center gap-2 px-8 py-3 rounded-full bg-text-main text-white font-black shadow-xl shadow-black/10 hover:bg-gray-800 transition-all active:scale-95"
                        >
                            <Plus size={20} /> Adicionar Despesa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
