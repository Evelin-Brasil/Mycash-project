import React, { useState, useMemo } from 'react';
import { Plus, Search, Download, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';
import { formatCurrency, formatDate, formatDateShort } from '../../utils/formatters';
import type { Transaction } from '../../types';

interface TransactionsViewProps {
    onNewTransaction: () => void;
}

type SortField = 'date' | 'amount' | 'description';
type SortOrder = 'asc' | 'desc';

export function TransactionsView({ onNewTransaction }: TransactionsViewProps) {
    const {
        getFilteredTransactions,
        familyMembers,
        bankAccounts,
        creditCards
    } = useFinance();

    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterSource, setFilterSource] = useState('all');
    const [filterMember, setFilterMember] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortField, setSortField] = useState<SortField>('date');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const categories = ['Aluguel', 'Alimentação', 'Automóvel', 'Mercado', 'Saúde', 'Lazer', 'Educação', 'Serviços', 'Compras', 'Transporte', 'Outros', 'Salário', 'Investimento', 'Extra'];
    const allSources = [...bankAccounts.map(a => ({ id: a.id, name: a.name, type: 'account' as const })), ...creditCards.map(c => ({ id: c.id, name: c.name, type: 'card' as const }))];

    const filteredAndSortedTransactions = useMemo(() => {
        let transactions = getFilteredTransactions();

        // Apply local filters
        if (searchText) {
            const search = searchText.toLowerCase();
            transactions = transactions.filter(t =>
                t.description.toLowerCase().includes(search) ||
                t.category.toLowerCase().includes(search)
            );
        }

        if (filterType !== 'all') {
            transactions = transactions.filter(t => t.type === filterType);
        }

        if (filterCategory !== 'all') {
            transactions = transactions.filter(t => t.category === filterCategory);
        }

        if (filterSource !== 'all') {
            transactions = transactions.filter(t => t.accountId === filterSource);
        }

        if (filterMember !== 'all') {
            transactions = transactions.filter(t => t.memberId === filterMember);
        }

        if (filterStatus !== 'all') {
            const isPaid = filterStatus === 'paid';
            transactions = transactions.filter(t => t.isPaid === isPaid);
        }

        // Sort
        transactions.sort((a, b) => {
            let comparison = 0;
            if (sortField === 'date') {
                const dateA = typeof a.date === 'string' ? new Date(a.date).getTime() : a.date.getTime();
                const dateB = typeof b.date === 'string' ? new Date(b.date).getTime() : b.date.getTime();
                comparison = dateA - dateB;
            } else if (sortField === 'amount') {
                comparison = a.amount - b.amount;
            } else if (sortField === 'description') {
                comparison = a.description.localeCompare(b.description);
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return transactions;
    }, [getFilteredTransactions, searchText, filterType, filterCategory, filterSource, filterMember, filterStatus, sortField, sortOrder]);

    const stats = useMemo(() => {
        const income = filteredAndSortedTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expenses = filteredAndSortedTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        return {
            income,
            expenses,
            difference: income - expenses,
            count: filteredAndSortedTransactions.length
        };
    }, [filteredAndSortedTransactions]);

    const paginatedTransactions = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedTransactions.slice(start, start + itemsPerPage);
    }, [filteredAndSortedTransactions, currentPage]);

    const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage);



    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('desc');
        }
    };

    const handleExport = () => {
        // Simple CSV export
        const headers = ['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor', 'Status'];
        const rows = filteredAndSortedTransactions.map(t => [
            formatDate(t.date),
            t.description,
            t.category,
            t.type === 'income' ? 'Receita' : 'Despesa',
            t.amount.toString(),
            t.isPaid ? 'Pago' : 'Pendente'
        ]);
        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transacoes_${format(new Date(), 'yyyy-MM-dd')}.csv`;
        a.click();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tighter">
                    Transações
                </h1>
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="hidden md:flex items-center gap-2 bg-gray-100 text-text-main px-4 py-3 rounded-full font-bold hover:bg-gray-200 transition-all"
                    >
                        <Download size={18} />
                        Exportar
                    </button>
                    <button
                        onClick={onNewTransaction}
                        className="flex items-center gap-2 bg-text-main text-white px-6 py-3 rounded-full font-black shadow-xl shadow-black/10 hover:bg-gray-800 transition-all active:scale-95"
                    >
                        <Plus size={20} />
                        <span className="hidden md:inline">Nova Transação</span>
                    </button>
                </div>
            </div>

            {/* Advanced Filters */}
            <div className="bg-white p-6 rounded-[32px] border border-border shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <div className="relative">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Buscar transações..."
                                className="w-full bg-gray-50 border border-transparent rounded-2xl py-3 pl-12 pr-4 font-bold text-sm text-text-main outline-none focus:bg-white focus:border-primary transition-all"
                            />
                        </div>
                    </div>

                    {/* Type */}
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as any)}
                        className="bg-gray-50 border border-transparent rounded-2xl py-3 px-4 font-bold text-sm text-text-main outline-none focus:bg-white focus:border-primary appearance-none transition-all"
                    >
                        <option value="all">Todos os Tipos</option>
                        <option value="income">Receitas</option>
                        <option value="expense">Despesas</option>
                    </select>

                    {/* Category */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="bg-gray-50 border border-transparent rounded-2xl py-3 px-4 font-bold text-sm text-text-main outline-none focus:bg-white focus:border-primary appearance-none transition-all"
                    >
                        <option value="all">Todas Categorias</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>

                    {/* Source */}
                    <select
                        value={filterSource}
                        onChange={(e) => setFilterSource(e.target.value)}
                        className="bg-gray-50 border border-transparent rounded-2xl py-3 px-4 font-bold text-sm text-text-main outline-none focus:bg-white focus:border-primary appearance-none transition-all"
                    >
                        <option value="all">Todas Origens</option>
                        {allSources.map(src => <option key={src.id} value={src.id}>{src.name}</option>)}
                    </select>

                    {/* Member */}
                    <select
                        value={filterMember}
                        onChange={(e) => setFilterMember(e.target.value)}
                        className="bg-gray-50 border border-transparent rounded-2xl py-3 px-4 font-bold text-sm text-text-main outline-none focus:bg-white focus:border-primary appearance-none transition-all"
                    >
                        <option value="all">Todos Membros</option>
                        {familyMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>

                    {/* Status */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-gray-50 border border-transparent rounded-2xl py-3 px-4 font-bold text-sm text-text-main outline-none focus:bg-white focus:border-primary appearance-none transition-all"
                    >
                        <option value="all">Todos Status</option>
                        <option value="paid">Concluído</option>
                        <option value="pending">Pendente</option>
                    </select>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-border">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Receitas</p>
                    <p className="text-xl font-black text-success">{formatCurrency(stats.income)}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-border">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Despesas</p>
                    <p className="text-xl font-black text-rose-500">{formatCurrency(stats.expenses)}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-border">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Diferença</p>
                    <p className={twMerge("text-xl font-black", stats.difference >= 0 ? "text-success" : "text-rose-500")}>
                        {formatCurrency(stats.difference)}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-border">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Total</p>
                    <p className="text-xl font-black text-text-main">{stats.count} transações</p>
                </div>
            </div>

            {/* Transactions Table */}
            {filteredAndSortedTransactions.length === 0 ? (
                <div className="bg-white p-12 rounded-[32px] border border-border flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Search size={40} className="text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-black text-text-main mb-2">Nenhuma transação encontrada</h3>
                    <p className="text-sm font-bold text-text-secondary mb-6">Ajuste os filtros ou adicione uma nova transação</p>
                    <button
                        onClick={onNewTransaction}
                        className="flex items-center gap-2 bg-text-main text-white px-8 py-4 rounded-full font-black shadow-xl shadow-black/10 hover:bg-gray-800 transition-all active:scale-95"
                    >
                        <Plus size={20} />
                        Adicionar Primeira Transação
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-[32px] border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-border">
                                <tr>
                                    <th className="text-left p-4">
                                        <button onClick={() => handleSort('date')} className="flex items-center gap-2 font-black text-[11px] text-text-secondary uppercase tracking-widest hover:text-text-main transition-colors">
                                            Data
                                            {sortField === 'date' && (sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                                            {sortField !== 'date' && <ArrowUpDown size={14} className="opacity-30" />}
                                        </button>
                                    </th>
                                    <th className="text-left p-4">
                                        <button onClick={() => handleSort('description')} className="flex items-center gap-2 font-black text-[11px] text-text-secondary uppercase tracking-widest hover:text-text-main transition-colors">
                                            Descrição
                                            {sortField === 'description' && (sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                                            {sortField !== 'description' && <ArrowUpDown size={14} className="opacity-30" />}
                                        </button>
                                    </th>
                                    <th className="text-left p-4 hidden md:table-cell">
                                        <span className="font-black text-[11px] text-text-secondary uppercase tracking-widest">Categoria</span>
                                    </th>
                                    <th className="text-right p-4">
                                        <button onClick={() => handleSort('amount')} className="flex items-center gap-2 ml-auto font-black text-[11px] text-text-secondary uppercase tracking-widest hover:text-text-main transition-colors">
                                            Valor
                                            {sortField === 'amount' && (sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                                            {sortField !== 'amount' && <ArrowUpDown size={14} className="opacity-30" />}
                                        </button>
                                    </th>
                                    <th className="text-center p-4 hidden lg:table-cell">
                                        <span className="font-black text-[11px] text-text-secondary uppercase tracking-widest">Status</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-b border-border/50 hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <span className="text-sm font-bold text-text-main">
                                                {typeof transaction.date === 'string'
                                                    ? formatDateShort(new Date(transaction.date))
                                                    : formatDateShort(transaction.date)}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm font-bold text-text-main">{transaction.description}</p>
                                        </td>
                                        <td className="p-4 hidden md:table-cell">
                                            <span className="text-xs font-bold text-text-secondary bg-gray-100 px-3 py-1 rounded-full">
                                                {transaction.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className={twMerge(
                                                "text-sm font-black",
                                                transaction.type === 'income' ? "text-success" : "text-rose-500"
                                            )}>
                                                {transaction.type === 'income' ? '+ ' : '- '}
                                                {formatCurrency(transaction.amount)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center hidden lg:table-cell">
                                            <span className={twMerge(
                                                "text-xs font-bold px-3 py-1 rounded-full",
                                                transaction.isPaid ? "bg-success/10 text-success" : "bg-amber-500/10 text-amber-600"
                                            )}>
                                                {transaction.isPaid ? 'Concluído' : 'Pendente'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="p-4 border-t border-border flex items-center justify-between">
                            <p className="text-sm font-bold text-text-secondary">
                                Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedTransactions.length)} de {filteredAndSortedTransactions.length}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    className="px-4 py-2 bg-gray-100 rounded-xl font-bold text-sm text-text-main disabled:opacity-30 hover:bg-gray-200 transition-colors"
                                >
                                    Anterior
                                </button>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    className="px-4 py-2 bg-gray-100 rounded-xl font-bold text-sm text-text-main disabled:opacity-30 hover:bg-gray-200 transition-colors"
                                >
                                    Próxima
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
