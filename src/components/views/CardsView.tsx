import React from 'react';
import { CreditCard, Plus, Calendar, TrendingUp, Eye, ShoppingBag } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { twMerge } from 'tailwind-merge';
import { formatCurrency } from '../../utils/formatters';
import type { CreditCard as CreditCardType } from '../../types';

interface CardsViewProps {
    onNewCard: () => void;
    onCardClick: (id: string, type: 'account' | 'card') => void;
    onAddExpense: (cardId: string) => void;
}

export function CardsView({ onNewCard, onCardClick, onAddExpense }: CardsViewProps) {
    const { creditCards } = useFinance();



    // Sort by current bill descending (most spent first)
    const sortedCards = [...creditCards].sort((a, b) => b.currentBill - a.currentBill);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tighter">
                    Cartões de Crédito
                </h1>
                <button
                    onClick={onNewCard}
                    className="flex items-center gap-2 bg-text-main text-white px-6 py-3 rounded-full font-black shadow-xl shadow-black/10 hover:bg-gray-800 transition-all active:scale-95"
                >
                    <Plus size={20} />
                    <span className="hidden md:inline">Novo Cartão</span>
                </button>
            </div>

            {/* Cards Grid */}
            {sortedCards.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-200">
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                        <CreditCard size={48} className="text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-black text-text-main mb-2">Nenhum cartão cadastrado</h3>
                    <p className="text-sm font-bold text-text-secondary mb-6">Adicione seu primeiro cartão para começar</p>
                    <button
                        onClick={onNewCard}
                        className="flex items-center gap-2 bg-text-main text-white px-8 py-4 rounded-full font-black shadow-xl shadow-black/10 hover:bg-gray-800 transition-all active:scale-95"
                    >
                        <Plus size={20} />
                        Cadastrar Primeiro Cartão
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedCards.map((card) => {
                        const usagePercent = Math.round((card.currentBill / card.limit) * 100);
                        const available = card.limit - card.currentBill;
                        const isHighUsage = usagePercent >= 80;

                        return (
                            <div
                                key={card.id}
                                onClick={() => onCardClick(card.id, 'card')}
                                className={twMerge(
                                    "bg-white rounded-[32px] p-6 shadow-lg border-4 transition-all duration-300 cursor-pointer group hover:shadow-2xl hover:-translate-y-2 flex flex-col gap-6",
                                    card.theme === 'black' ? "border-text-main" :
                                        card.theme === 'lime' ? "border-primary" :
                                            "border-gray-200"
                                )}
                            >
                                {/* Card Header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black text-text-main tracking-tight mb-1 leading-tight">
                                            {card.name}
                                        </h3>
                                        {card.institution && (
                                            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                                                {card.institution}
                                            </p>
                                        )}
                                    </div>
                                    <div className={twMerge(
                                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                                        card.theme === 'black' ? "bg-text-main text-white" :
                                            card.theme === 'lime' ? "bg-primary text-text-main" :
                                                "bg-gray-100 text-text-main"
                                    )}>
                                        <CreditCard size={24} />
                                    </div>
                                </div>

                                {/* Values Section */}
                                <div className="space-y-4">
                                    {/* Current Bill - Highlighted */}
                                    <div className="bg-gray-50 p-4 rounded-2xl">
                                        <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">
                                            Fatura Atual
                                        </p>
                                        <p className={twMerge(
                                            "text-3xl font-black tracking-tight",
                                            isHighUsage ? "text-rose-500" : "text-text-main"
                                        )}>
                                            {formatCurrency(card.currentBill)}
                                        </p>
                                    </div>

                                    {/* Limit & Available */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">
                                                Limite Total
                                            </p>
                                            <p className="text-sm font-black text-text-main">
                                                {formatCurrency(card.limit)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">
                                                Disponível
                                            </p>
                                            <p className="text-sm font-black text-success">
                                                {formatCurrency(available)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Usage Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">
                                                Uso do Limite
                                            </span>
                                            <span className={twMerge(
                                                "text-xs font-black",
                                                isHighUsage ? "text-rose-500" : "text-text-main"
                                            )}>
                                                {usagePercent}%
                                            </span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={twMerge(
                                                    "h-full transition-all duration-500 rounded-full",
                                                    isHighUsage ? "bg-rose-500" :
                                                        usagePercent > 50 ? "bg-amber-500" :
                                                            "bg-primary"
                                                )}
                                                style={{ width: `${Math.min(usagePercent, 100)}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-text-secondary" />
                                            <div>
                                                <p className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">
                                                    Fechamento
                                                </p>
                                                <p className="text-xs font-black text-text-main">
                                                    Dia {card.closingDay}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-text-secondary" />
                                            <div>
                                                <p className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">
                                                    Vencimento
                                                </p>
                                                <p className="text-xs font-black text-text-main">
                                                    Dia {card.dueDay}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Last Digits */}
                                    {card.lastDigits && (
                                        <div className="pt-2">
                                            <p className="text-xs font-mono text-text-secondary tracking-widest text-center">
                                                •••• {card.lastDigits}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Actions Footer */}
                                <div className="flex gap-2 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onCardClick(card.id, 'card');
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-2xl font-bold text-xs text-text-main transition-colors"
                                    >
                                        <Eye size={16} />
                                        Ver Detalhes
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onAddExpense(card.id);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-text-main hover:bg-gray-800 text-white rounded-2xl font-bold text-xs transition-colors"
                                    >
                                        <ShoppingBag size={16} />
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
