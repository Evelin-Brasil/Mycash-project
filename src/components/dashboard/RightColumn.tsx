import React from 'react';
import { CreditCard, Plus, ArrowRight, Check } from 'lucide-react';
import { clsx } from 'clsx';

export function RightColumn() {
    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Cards & Contas */}
            <div className="bg-surface p-5 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-base text-text-main flex items-center gap-2">
                        <CreditCard size={18} />
                        Cards & contas
                    </h3>
                    <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><Plus size={16} /></button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><ArrowRight size={16} /></button>
                    </div>
                </div>

                <div className="space-y-3">
                    {[
                        { bank: 'Nubank', logo: 'bg-purple-600', val: 'R$ 120,00', date: '10' },
                        { bank: 'Inter', logo: 'bg-orange-500', val: 'R$ 2.300,00', date: '21' },
                    ].map((item, i) => (
                        <div key={i} className="group p-2.5 -mx-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                    <div className={`w-6 h-6 rounded ${item.logo}`}></div>
                                    <span className="font-medium text-sm">{item.bank}</span>
                                </div>
                                <span className="text-xs text-text-secondary">**** 5897</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-lg font-bold text-text-main">{item.val}</div>
                                    <div className="text-xs text-text-secondary">Vence dia {item.date}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Próximas Despesas */}
            <div className="bg-surface p-5 rounded-2xl shadow-sm flex-1 min-h-[200px]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-base text-text-main flex items-center gap-2">
                        <CreditCard size={18} /> {/* Ícone Carteira */}
                        Próximas despesas
                    </h3>
                    <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><Plus size={16} /></button>
                </div>

                <div className="space-y-1 overflow-y-auto max-h-[160px] custom-scrollbar">
                    {[1, 2, 3, 4].map((_, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="flex flex-col">
                                    <span className="font-bold text-text-main text-sm">Conta de Luz</span>
                                    <span className="text-xs text-text-secondary mt-0.5">Vence dia 21/01</span>
                                    <span className="text-[10px] text-text-secondary">Crédito Nubank **** 5897</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-sm">R$ 154,00</span>
                                <div className="w-6 h-6 rounded-full border border-emerald-200 text-emerald-500 flex items-center justify-center">
                                    <Check size={12} strokeWidth={3} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
