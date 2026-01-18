import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FiltersMobileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FiltersMobileModal({ isOpen, onClose }: FiltersMobileModalProps) {
    const {
        transactionType,
        setFilterType,
        selectedMember,
        setFilterMember,
        familyMembers,
        dateRange,
        setFilterDateRange
    } = useFinance();

    // Local temporary states
    const [tempType, setTempType] = useState(transactionType);
    const [tempMember, setTempMember] = useState(selectedMember);
    // DateRange is a string in App.tsx but a range object in FinanceContext
    // Actually FinanceContext has dateRange as { startDate: Date, endDate: Date }

    useEffect(() => {
        if (isOpen) {
            setTempType(transactionType);
            setTempMember(selectedMember);
        }
    }, [isOpen, transactionType, selectedMember]);

    if (!isOpen) return null;

    const handleApply = () => {
        setFilterType(tempType);
        setFilterMember(tempMember);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[120] flex items-end justify-center lg:hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="bg-white w-full rounded-t-[40px] shadow-2xl relative z-10 flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300">

                {/* Fixed Header */}
                <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100 shrink-0">
                    <h2 className="text-2xl font-black text-text-main tracking-tighter">Filtros</h2>
                    <button
                        onClick={onClose}
                        className="w-11 h-11 flex items-center justify-center bg-gray-50 rounded-full text-text-secondary active:scale-90 transition-transform"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 pb-12">

                    {/* Transaction Type Section */}
                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Tipo de Transação</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['all', 'income', 'expense'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setTempType(type as any)}
                                    className={twMerge(
                                        "py-4 rounded-2xl font-black text-[10px] uppercase tracking-wider transition-all border-2",
                                        tempType === type
                                            ? "bg-text-main text-white border-text-main shadow-lg shadow-black/10"
                                            : "bg-gray-50 text-text-secondary border-transparent"
                                    )}
                                >
                                    {type === 'all' ? 'Todos' : type === 'income' ? 'Receitas' : 'Despesas'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Family Member Section */}
                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Membro da Família</label>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setTempMember(null)}
                                className={twMerge(
                                    "px-6 py-3 rounded-full font-bold text-xs transition-all flex items-center gap-2 border-2",
                                    tempMember === null
                                        ? "bg-text-main text-white border-text-main"
                                        : "bg-gray-50 text-text-secondary border-transparent"
                                )}
                            >
                                Todos
                            </button>
                            {familyMembers.map((member) => (
                                <button
                                    key={member.id}
                                    onClick={() => setTempMember(member.id)}
                                    className={twMerge(
                                        "px-4 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-2 border-2",
                                        tempMember === member.id
                                            ? "bg-text-main text-white border-text-main"
                                            : "bg-gray-50 text-text-secondary border-transparent"
                                    )}
                                >
                                    <img src={member.avatarUrl} alt={member.name} className="w-6 h-6 rounded-full object-cover" />
                                    {member.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Period Section */}
                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Período Selecionado</label>
                        <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 flex flex-col items-center justify-center gap-2 text-center">
                            <span className="text-xl font-black text-text-main tracking-tight">Seleção Mensal</span>
                            <span className="text-sm font-bold text-text-secondary">Atualmente filtrando dados de Janeiro de 2026</span>
                            <p className="text-[10px] font-bold text-gray-400 mt-2">O ajuste de data detalhado pode ser feito via widget de calendário desktop.</p>
                        </div>
                    </div>
                </div>

                {/* Fixed Footer */}
                <div className="p-8 border-t border-gray-50 shrink-0">
                    <button
                        onClick={handleApply}
                        className="w-full h-14 bg-text-main text-white font-black rounded-3xl shadow-xl shadow-black/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Check size={20} /> Aplicar Filtros
                    </button>
                </div>
            </div>
        </div>
    );
}
