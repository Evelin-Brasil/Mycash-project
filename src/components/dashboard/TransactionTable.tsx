import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpLeft, ArrowDownRight, MoreHorizontal, Filter } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { format, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import type { Transaction, FamilyMember } from '../../types';

export function TransactionTable() {
    const {
        getFilteredTransactions,
        searchText,
        setFilterSearch,
        transactionType,
        setFilterType,
        familyMembers,
        bankAccounts,
        creditCards
    } = useFinance();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const tableRef = useRef<HTMLDivElement>(null);

    // Get sorted transactions (Date DESC)
    const transactions = useMemo(() => {
        return getFilteredTransactions().sort((a, b) => {
            const dateA = typeof a.date === 'string' ? parseISO(a.date) : a.date;
            const dateB = typeof b.date === 'string' ? parseISO(b.date) : b.date;
            return dateB.getTime() - dateA.getTime();
        });
    }, [getFilteredTransactions]);

    // Reset to page 1 when any filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchText, transactionType, transactions.length]);

    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = transactions.slice(startIndex, startIndex + itemsPerPage);

    const getTransactionStyle = (amount: number, type: 'income' | 'expense') => {
        const value = formatCurrency(amount);
        const prefix = type === 'income' ? '+' : '-';
        return { value, prefix, color: type === 'income' ? 'text-emerald-500' : 'text-text-main' };
    };

    const getMember = (id?: string) => familyMembers.find(m => m.id === id);

    const getAccountName = (id?: string) => {
        if (!id) return 'Desconhecido';
        const account = bankAccounts.find(a => a.id === id);
        if (account) return account.name;
        const card = creditCards.find(c => c.id === id);
        if (card) return card.name;
        return 'Desconhecido';
    };

    const scrollToTop = () => {
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        scrollToTop();
    };

    return (
        <div ref={tableRef} className="bg-white rounded-[32px] border border-border/50 shadow-sm overflow-hidden mt-8 animate-in fade-in duration-700">
            {/* Table Header Controls */}
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-border/50">
                <h3 className="text-xl font-black text-text-main tracking-tight">Extrato Detalhado</h3>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Local Search */}
                    <div className="relative w-full sm:w-64 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-text-main transition-colors" size={18} />
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setFilterSearch(e.target.value)}
                            placeholder="Buscar lançamentos..."
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-full outline-none focus:bg-white focus:border-border transition-all text-sm font-medium"
                        />
                    </div>

                    {/* Type Select */}
                    <div className="relative w-full sm:w-[140px]">
                        <select
                            value={transactionType}
                            onChange={(e) => setFilterType(e.target.value as any)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-full outline-none appearance-none focus:bg-white focus:border-border transition-all text-sm font-bold text-text-main cursor-pointer pr-10"
                        >
                            <option value="all">Todos</option>
                            <option value="income">Receitas</option>
                            <option value="expense">Despesas</option>
                        </select>
                        <Filter size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto overflow-y-hidden">
                <table className="w-full min-w-[850px] border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50">
                            <th className="px-8 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest w-[80px]">Membro</th>
                            <th className="px-4 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest w-[120px]">Data</th>
                            <th className="px-4 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest">Descrição</th>
                            <th className="px-4 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest w-[150px]">Categoria</th>
                            <th className="px-4 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest w-[150px]">Conta/Cartão</th>
                            <th className="px-4 py-4 text-left text-[11px] font-black text-gray-400 uppercase tracking-widest w-[100px]">Parcelas</th>
                            <th className="px-8 py-4 text-right text-[11px] font-black text-gray-400 uppercase tracking-widest w-[150px]">Valor</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {paginatedItems.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="h-24 text-center text-sm font-medium text-text-secondary">
                                    Nenhum lançamento encontrado
                                </td>
                            </tr>
                        ) : (
                            paginatedItems.map((t, idx) => {
                                const member = getMember(t.memberId);
                                const { value, prefix, color } = getTransactionStyle(t.amount, t.type);
                                return (
                                    <tr
                                        key={t.id}
                                        className={twMerge(
                                            "group transition-colors hover:bg-gray-50/80 cursor-default",
                                            idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                                        )}
                                    >
                                        <td className="px-8 py-4">
                                            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                                <img
                                                    src={member?.avatarUrl || 'https://i.pravatar.cc/150?u=default'}
                                                    alt={member?.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-sm font-bold text-gray-400">
                                                {formatDate(t.date)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={twMerge(
                                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                                    t.type === 'income' ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"
                                                )}>
                                                    {t.type === 'income' ? <ArrowDownRight size={16} /> : <ArrowUpLeft size={16} />}
                                                </div>
                                                <span className="text-sm font-black text-text-main truncate max-w-[200px]">
                                                    {t.description}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-[11px] font-black text-text-secondary uppercase">
                                                {t.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-sm font-bold text-text-secondary">
                                                {getAccountName(t.accountId)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-sm font-bold text-gray-400">
                                                {t.installments && t.installments > 1 ? `${t.installments}x` : '-'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <span className={twMerge("text-base font-black tracking-tight", color)}>
                                                {prefix} {value.replace('R$', '').trim()}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Table Footer - Pagination */}
            <div className="p-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white">
                <p className="text-sm font-bold text-text-main">
                    Mostrando <span className="text-gray-400">{startIndex + 1}</span> a <span className="text-gray-400">{Math.min(startIndex + itemsPerPage, transactions.length)}</span> de <span className="text-gray-400">{transactions.length}</span>
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-border text-text-secondary hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                            // Simple pagination window logic can be added here if many pages exist
                            const pageNum = i + 1;
                            const isActive = currentPage === pageNum;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={twMerge(
                                        "w-10 h-10 rounded-xl text-sm font-black transition-all",
                                        isActive
                                            ? "bg-text-main text-white shadow-lg shadow-black/10"
                                            : "text-text-secondary hover:bg-gray-50 border border-transparent"
                                    )}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-border text-text-secondary hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
