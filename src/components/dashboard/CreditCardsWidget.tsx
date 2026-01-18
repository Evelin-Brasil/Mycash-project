import React, { useState } from 'react';
import { CreditCard as CardIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import type { CreditCard } from '../../types';
import { twMerge } from 'tailwind-merge';
import { formatCurrency } from '../../utils/formatters';

interface CreditCardsWidgetProps {
    onAdd: () => void;
    onCardClick: (id: string, type: 'account' | 'card') => void;
}

export function CreditCardsWidget({ onAdd, onCardClick }: CreditCardsWidgetProps) {
    const { creditCards } = useFinance();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(creditCards.length / itemsPerPage);



    const paginatedCards = creditCards.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <div className="bg-gray-50/50 p-6 rounded-[32px] border border-border/50 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CardIcon size={20} className="text-text-main" />
                    <h3 className="font-bold text-lg text-text-main tracking-tight">Cartões</h3>
                </div>
                <button
                    onClick={onAdd}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-text-main shadow-sm border border-border hover:bg-gray-50 transition-colors"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* List */}
            <div className="flex flex-col gap-4">
                {paginatedCards.map((card: CreditCard) => {
                    const usagePercent = Math.round((card.currentBill / card.limit) * 100);

                    return (
                        <div
                            key={card.id}
                            onClick={() => onCardClick(card.id, 'card')}
                            className="bg-white p-4 rounded-2xl shadow-sm border border-border/50 flex items-center gap-4 group cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            {/* Left: Icon Block */}
                            <div
                                className={twMerge(
                                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                                    card.name.toLowerCase().includes('nubank') ? "bg-[#8A05BE] text-white" :
                                        card.name.toLowerCase().includes('inter') ? "bg-[#FF7A00] text-white" :
                                            card.name.toLowerCase().includes('picpay') ? "bg-[#21C25E] text-white" :
                                                card.theme === 'black' ? "bg-text-main text-white" :
                                                    card.theme === 'lime' ? "bg-primary text-text-main" :
                                                        "bg-white border border-border text-text-main"
                                )}
                            >
                                <CardIcon size={24} className="opacity-80" strokeWidth={1.5} />
                            </div>

                            {/* Center: Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-0.5 truncate">
                                    {card.name}
                                </p>
                                <h4 className="text-lg font-black text-text-main leading-tight mb-0.5">
                                    {formatCurrency(card.currentBill)}
                                </h4>
                                <p className="text-[11px] text-gray-400 font-medium tracking-widest">
                                    •••• {card.lastDigits || '0000'}
                                </p>
                            </div>

                            {/* Right: Usage Badge */}
                            <div
                                className={twMerge(
                                    "px-3 py-1.5 rounded-full text-[10px] font-black tracking-tight",
                                    card.theme === 'black' ? "bg-primary text-text-main" :
                                        card.theme === 'lime' ? "bg-text-main text-white" :
                                            "bg-gray-100 text-text-main"
                                )}
                            >
                                {usagePercent}%
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-2 px-1">
                    <div className="flex gap-1">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <div
                                key={idx}
                                className={twMerge(
                                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                    currentPage === idx ? "w-4 bg-text-main" : "bg-gray-300"
                                )}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                            className="p-1 text-text-secondary hover:text-text-main disabled:opacity-30 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            disabled={currentPage === totalPages - 1}
                            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                            className="p-1 text-text-secondary hover:text-text-main disabled:opacity-30 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
