import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const MOCK_DATA = [
    { month: 'Jan', receita: 4500, despesa: 2800 },
    { month: 'Fev', receita: 3200, despesa: 3100 },
    { month: 'Mar', receita: 5100, despesa: 2400 },
    { month: 'Abr', receita: 4000, despesa: 3900 },
    { month: 'Mai', receita: 5800, despesa: 3200 },
    { month: 'Jun', receita: 4900, despesa: 4100 },
    { month: 'Jul', receita: 6200, despesa: 3800 },
    { month: 'Ago', receita: 5400, despesa: 3000 },
    { month: 'Set', receita: 7000, despesa: 4500 },
    { month: 'Out', receita: 6500, despesa: 3800 },
    { month: 'Nov', receita: 7200, despesa: 4200 },
    { month: 'Dez', receita: 8500, despesa: 5000 },
];



const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-[20px] shadow-2xl border border-border/20 backdrop-blur-md">
                <p className="text-sm font-bold text-text-main mb-2">{label}</p>
                <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold text-text-main flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        Receitas: {formatCurrency(payload[0].value)}
                    </p>
                    <p className="text-xs font-bold text-text-main flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        Despesas: {formatCurrency(payload[1].value)}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export function FinancialChart() {
    return (
        <div className="bg-surface p-8 rounded-[32px] shadow-sm border border-border/50 h-full flex flex-col group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-text-main group-hover:bg-primary/10 transition-colors">
                        <TrendingUp size={22} />
                    </div>
                    <h3 className="text-xl font-bold text-text-main tracking-tight">Fluxo Financeiro</h3>
                </div>

                {/* Custom Legend */}
                <div className="flex items-center gap-6 text-xs font-bold text-text-secondary pr-2">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm shadow-primary/40"></span>
                        <span className="text-text-main">Receitas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/40"></span>
                        <span className="text-text-main">Despesas</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={MOCK_DATA}
                        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                    >
                        <defs>
                            <linearGradient id="gradientReceita" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#CCFF00" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="gradientDespesa" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="4 4"
                            stroke="#F1F5F9"
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 600 }}
                            dy={15}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            domain={[0, 10000]}
                            ticks={[0, 2000, 4000, 6000, 8000, 10000]}
                            tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 600 }}
                            tickFormatter={(value) => `R$ ${value >= 1000 ? (value / 1000) + 'k' : value}`}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: '#E2E8F0', strokeWidth: 1 }}
                        />

                        <Area
                            type="monotone"
                            dataKey="receita"
                            stroke="#CCFF00"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#gradientReceita)"
                            animationDuration={1500}
                        />
                        <Area
                            type="monotone"
                            dataKey="despesa"
                            stroke="#F43F5E"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#gradientDespesa)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
