import React, { useMemo } from 'react';
import { TrendingDown, TrendingUp, TrendingUp as IncreaseIcon } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { CountUp } from '../ui/CountUp';
import { formatCurrency } from '../../utils/formatters';

export function BalanceCards() {
    const { calculateTotalBalance, calculateIncomeForPeriod, calculateExpensesForPeriod } = useFinance();

    const balance = calculateTotalBalance();
    const income = calculateIncomeForPeriod();
    const expenses = calculateExpensesForPeriod();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-4 mb-6">
            {/* BalanceCard - Saldo Total */}
            <div className="bg-[#111827] p-8 rounded-[32px] shadow-xl relative overflow-hidden group min-h-[180px] flex flex-col justify-between border border-white/5">
                {/* Decorative Blur Element */}
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/30 transition-colors duration-500" />
                <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative z-10">
                    <p className="text-sm font-medium text-gray-400 mb-2">Saldo Total</p>
                    <div className="flex items-baseline gap-2">
                        <CountUp
                            value={balance}
                            formatter={formatCurrency}
                            className="text-3xl font-black text-white tracking-tight"
                        />
                    </div>
                </div>

                <div className="relative z-10 mt-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/5">
                        <IncreaseIcon size={14} className="text-primary" />
                        <span className="text-xs font-bold text-white">+12% esse mês</span>
                    </div>
                </div>
            </div>

            {/* IncomeCard - Receitas */}
            <div className="bg-surface p-6 rounded-[32px] shadow-sm border border-border flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-base font-bold text-text-main">Receitas</span>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-text-secondary group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <TrendingDown size={20} className="rotate-45" /> {/* Seta para baixo-esquerda mockup */}
                    </div>
                </div>
                <div>
                    <CountUp
                        value={income}
                        formatter={formatCurrency}
                        className="text-2xl font-black text-text-main"
                    />
                </div>
            </div>

            {/* ExpenseCard - Despesas */}
            <div className="bg-surface p-6 rounded-[32px] shadow-sm border border-border flex flex-col justify-between hover:shadow-md transition-all duration-300 group">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-base font-bold text-text-secondary">Despesas</span>
                    <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                        <TrendingUp size={20} className="rotate-45" /> {/* Seta para cima-direita mockup */}
                    </div>
                </div>
                <div>
                    <CountUp
                        value={expenses}
                        formatter={formatCurrency}
                        className="text-2xl font-black text-text-main"
                    />
                </div>
            </div>
        </div>
    );
}
