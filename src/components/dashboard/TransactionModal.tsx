import React, { useState, useEffect } from 'react';
import { X, ArrowDownLeft, ArrowUpRight, Plus, Check } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { twMerge } from 'tailwind-merge';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CATEGORIES_INCOME = ['Salário', 'Investimentos', 'Freelance', 'Extra', 'Presente'];
const CATEGORIES_EXPENSE = ['Aluguel', 'Mercado', 'Transporte', 'Lazer', 'Educação', 'Saúde', 'Automóvel', 'Assinaturas', 'Outros'];

export function TransactionModal({ isOpen, onClose }: TransactionModalProps) {
    const { addTransaction, familyMembers, bankAccounts, creditCards } = useFinance();

    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [memberId, setMemberId] = useState<string>('');
    const [accountId, setAccountId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [installments, setInstallments] = useState(1);
    const [isRecurring, setIsRecurring] = useState(false);

    // Reset form when opening
    useEffect(() => {
        if (isOpen) {
            setType('expense');
            setAmount('');
            setDescription('');
            setCategory('');
            setMemberId('');
            setAccountId('');
            setDate(new Date().toISOString().split('T')[0]);
            setInstallments(1);
            setIsRecurring(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!amount || !description || !category || !accountId) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        addTransaction({
            type,
            amount: parseFloat(amount),
            description,
            category,
            memberId: memberId || undefined,
            accountId,
            date: new Date(date),
            installments: type === 'expense' ? installments : 1,
            isRecurring: type === 'expense' ? isRecurring : false,
            isPaid: false // Defaults to unpaid for new transactions
        });

        onClose();
    };

    const isCardSelected = creditCards.some(card => card.id === accountId);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-white animate-in slide-in-from-bottom duration-500">
            {/* Fixed Header */}
            <header className="px-8 py-10 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-6">
                    {/* Icon Circle */}
                    <div className={twMerge(
                        "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg",
                        type === 'income' ? "bg-primary text-text-main shadow-primary/20" : "bg-text-main text-white shadow-black/20"
                    )}>
                        {type === 'income' ? <ArrowDownLeft size={32} /> : <ArrowUpRight size={32} />}
                    </div>

                    <div>
                        <h2 className="text-4xl font-black text-text-main tracking-tighter">Nova Transação</h2>
                        <p className="text-text-secondary font-bold text-lg">Adicione um novo lançamento ao seu extrato</p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary hover:bg-gray-100 transition-colors"
                >
                    <X size={24} />
                </button>
            </header>

            {/* Scrollable Content */}
            <main className="flex-1 bg-gray-50/50 overflow-y-auto px-8 py-12">
                <div className="max-w-[700px] mx-auto flex flex-col gap-10">

                    {/* Type Toggle */}
                    <div className="bg-white p-2 rounded-2xl flex border border-border/50 shadow-sm">
                        <button
                            onClick={() => setType('expense')}
                            className={twMerge(
                                "flex-1 py-4 px-6 rounded-xl font-black transition-all",
                                type === 'expense' ? "bg-text-main text-white shadow-xl" : "text-text-secondary hover:bg-gray-50"
                            )}
                        >
                            Despesa
                        </button>
                        <button
                            onClick={() => setType('income')}
                            className={twMerge(
                                "flex-1 py-4 px-6 rounded-xl font-black transition-all",
                                type === 'income' ? "bg-primary text-text-main shadow-xl" : "text-text-secondary hover:bg-gray-50"
                            )}
                        >
                            Receita
                        </button>
                    </div>

                    {/* Value & Description */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Valor do lançamento</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-text-main">R$</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0,00"
                                    className="w-full bg-white border border-border/50 rounded-[24px] py-6 pl-16 pr-6 text-3xl font-black text-text-main outline-none focus:border-primary transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Descrição</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ex: Supermercado Semanal..."
                                className="w-full bg-white border border-border/50 rounded-[24px] py-6 px-6 text-xl font-bold text-text-main outline-none focus:border-primary transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Grid Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Categoria</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-white border border-border/50 rounded-2xl py-4 px-4 font-bold text-text-main outline-none focus:border-primary appearance-none shadow-sm"
                            >
                                <option value="">Selecione...</option>
                                {(type === 'income' ? CATEGORIES_INCOME : CATEGORIES_EXPENSE).map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Data</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-white border border-border/50 rounded-2xl py-4 px-4 font-bold text-text-main outline-none focus:border-primary shadow-sm"
                            />
                        </div>

                        {/* Member */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Membro responsável</label>
                            <select
                                value={memberId}
                                onChange={(e) => setMemberId(e.target.value)}
                                className="w-full bg-white border border-border/50 rounded-2xl py-4 px-4 font-bold text-text-main outline-none focus:border-primary appearance-none shadow-sm"
                            >
                                <option value="">Família (Geral)</option>
                                {familyMembers.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Account/Card */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Conta ou Cartão</label>
                            <select
                                value={accountId}
                                onChange={(e) => setAccountId(e.target.value)}
                                className="w-full bg-white border border-border/50 rounded-2xl py-4 px-4 font-bold text-text-main outline-none focus:border-primary appearance-none shadow-sm"
                            >
                                <option value="">Selecione...</option>
                                <optgroup label="Contas Bancárias">
                                    {bankAccounts.map(a => (
                                        <option key={a.id} value={a.id}>{a.name}</option>
                                    ))}
                                </optgroup>
                                <optgroup label="Cartões de Crédito">
                                    {creditCards.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>
                    </div>

                    {/* Conditional Fields: Installments & Recurring */}
                    {type === 'expense' && (
                        <div className="flex flex-col gap-6">
                            {isCardSelected && (
                                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                                    <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Número de parcelas</label>
                                    <select
                                        value={installments}
                                        onChange={(e) => setInstallments(parseInt(e.target.value))}
                                        className="w-full bg-white border border-border/50 rounded-2xl py-4 px-4 font-bold text-text-main outline-none focus:border-primary appearance-none shadow-sm"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 10, 12].map(n => (
                                            <option key={n} value={n}>{n}x</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div
                                className={twMerge(
                                    "p-6 rounded-[24px] transition-all duration-500 flex items-center justify-between cursor-pointer border",
                                    isRecurring
                                        ? "bg-[#3247FF] border-transparent text-white shadow-xl shadow-blue-500/20"
                                        : "bg-white border-border/50 text-text-main shadow-sm"
                                )}
                                onClick={() => setIsRecurring(!isRecurring)}
                            >
                                <div className="flex flex-col">
                                    <span className="font-black text-lg">Lançamento recorrente?</span>
                                    <p className={twMerge(
                                        "text-sm font-bold opacity-70",
                                        isRecurring ? "text-white" : "text-text-secondary"
                                    )}>
                                        A transação se repetirá todos os meses
                                    </p>
                                </div>
                                <div className={twMerge(
                                    "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
                                    isRecurring ? "bg-white border-white text-[#3247FF]" : "border-gray-200"
                                )}>
                                    {isRecurring && <Check size={20} strokeWidth={4} />}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Fixed Footer */}
            <footer className="px-8 py-8 flex items-center justify-end gap-4 border-t border-gray-100 bg-white">
                <button
                    onClick={onClose}
                    className="px-10 py-4 rounded-full font-black text-text-secondary hover:bg-gray-50 transition-all"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleSave}
                    className="px-12 py-4 rounded-full bg-text-main text-white font-black shadow-lg shadow-black/20 hover:scale-105 active:scale-95 transition-all"
                >
                    Salvar Transação
                </button>
            </footer>
        </div>
    );
}
