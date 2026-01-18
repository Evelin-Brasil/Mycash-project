import React from 'react';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

export function BalanceCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-surface p-6 rounded-2xl shadow-sm border border-transparent hover:border-text-main/10 transition-all group">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-text-main group-hover:text-primary transition-colors">
                    <DollarSign size={20} />
                </div>
                <p className="text-sm text-text-secondary mb-1">Saldo Total</p>
                <h3 className="text-3xl font-bold text-text-main">R$ 11.200,00</h3>
            </div>

            <div className="bg-surface p-6 rounded-2xl shadow-sm border border-transparent hover:border-emerald-100 transition-all group">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingDown size={20} /> {/* Seta para baixo visualmente significa entrada na imagem? Na imagem é seta para baixo verde em "Receitas". Geralmente Down é bom ou ruim dependendo do contexto. Vou seguir ícone da imagem. */}
                </div>
                <p className="text-sm text-text-secondary mb-1">Receitas</p>
                <h3 className="text-3xl font-bold text-text-main">R$ 2.800,00</h3>
            </div>

            <div className="bg-surface p-6 rounded-2xl shadow-sm border border-transparent hover:border-red-100 transition-all group">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp size={20} /> {/* Seta para cima vermelha */}
                </div>
                <p className="text-sm text-text-secondary mb-1">Despesa</p>
                <h3 className="text-3xl font-bold text-text-main">R$ 8.200,00</h3>
            </div>
        </div>
    );
}
