import React from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, PieChart } from 'lucide-react';

const TRANSACTIONS = [
    { id: 1, user: 'https://i.pravatar.cc/150?u=1', date: '17/01/2026', desc: 'Conta da água', type: 'out', cat: 'Manutenção', account: 'Conta corrente', parcels: '-', val: 'R$ 100,00' },
    { id: 2, user: 'https://i.pravatar.cc/150?u=2', date: '17/01/2026', desc: 'Conta da Luz', type: 'out', cat: 'Manutenção', account: 'Conta corrente', parcels: '-', val: 'R$ 150,00' },
    { id: 3, user: 'https://i.pravatar.cc/150?u=3', date: '17/01/2026', desc: 'Passeio no parque', type: 'out', cat: 'Lazer', account: 'Cartão XP', parcels: '1/1', val: 'R$ 750,00' },
];

export function TransactionTable() {
    return (
        <div className="bg-surface p-6 rounded-2xl shadow-sm mt-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <PieChart size={20} />
                    Extrato detalhado
                </h3>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Buscar lançamentos"
                            className="pl-9 pr-4 py-2 rounded-full border border-border text-sm w-full sm:w-64 focus:outline-none focus:border-text-secondary"
                        />
                    </div>
                    <button className="text-sm font-medium text-text-main flex items-center gap-1">
                        Despesas <ArrowDown size={14} />
                    </button>
                </div>
            </div>

            {/* Table - Responsive Scroll */}
            <div className="overflow-x-auto -mx-6 px-6 pb-4">
                <table className="w-full min-w-[800px]">
                    <thead>
                        <tr className="text-left text-sm font-bold text-text-main border-b border-transparent">
                            <th className="pb-4 pl-2">Membro</th>
                            <th className="pb-4">Datas</th>
                            <th className="pb-4">Descrição</th>
                            <th className="pb-4">Categorias</th>
                            <th className="pb-4">Conta/cartão</th>
                            <th className="pb-4">Parcelas</th>
                            <th className="pb-4 text-right pr-2">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TRANSACTIONS.map((t) => (
                            <tr key={t.id} className="group hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 text-sm">
                                <td className="py-4 pl-2">
                                    <img src={t.user} alt="User" className="w-8 h-8 rounded-full" />
                                </td>
                                <td className="py-4 text-text-secondary font-medium">{t.date}</td>
                                <td className="py-4 font-medium text-text-main">
                                    <div className="flex items-center gap-2">
                                        {t.type === 'out' ? <ArrowUp size={14} className="text-rose-500" /> : <ArrowDown size={14} className="text-emerald-500" />}
                                        {t.desc}
                                    </div>
                                </td>
                                <td className="py-4 text-text-secondary">{t.cat}</td>
                                <td className="py-4 text-text-secondary">{t.account}</td>
                                <td className="py-4 text-text-secondary">{t.parcels}</td>
                                <td className="py-4 text-right font-medium text-text-main pr-2">{t.val}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-gray-50 gap-4">
                <span className="text-sm text-text-main font-semibold">Mostrando 1 a 5 de 17</span>

                <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded text-text-secondary"><ChevronLeft size={16} /></button>
                    {[1, 2, 3, 4, 5].map(p => (
                        <button key={p} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === 1 ? 'bg-black text-white' : 'hover:bg-gray-100 text-text-secondary'}`}>
                            {p}
                        </button>
                    ))}
                    <button className="p-1 hover:bg-gray-100 rounded text-text-secondary"><ChevronRight size={16} /></button>
                </div>
            </div>
        </div>
    );
}
