import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const DATA = [
    { month: 'Jan', receita: 4000, despesa: 2400 },
    { month: 'Fev', receita: 3000, despesa: 1398 },
    { month: 'Mar', receita: 2000, despesa: 9800 },
    { month: 'Abr', receita: 2780, despesa: 3908 },
    { month: 'Mai', receita: 1890, despesa: 4800 },
    { month: 'Jun', receita: 2390, despesa: 3800 },
    { month: 'Jul', receita: 3490, despesa: 4300 },
    { month: 'Ago', receita: 4000, despesa: 2400 },
    { month: 'Set', receita: 3000, despesa: 1398 },
    { month: 'Out', receita: 2000, despesa: 3800 },
    { month: 'Nov', receita: 2780, despesa: 3908 },
    { month: 'Dez', receita: 5890, despesa: 4800 },
];

export function FinancialChart() {
    return (
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-transparent h-full min-h-[320px] max-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                    Fluxo financeiro
                </h3>
                <div className="flex items-center gap-4 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                        Receitas
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        Despesas
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#CCFF00" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorDespesa" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                            tickFormatter={(value) => `R$ ${value}`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="receita"
                            stroke="#CCFF00"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorReceita)"
                        />
                        <Area
                            type="monotone"
                            dataKey="despesa"
                            stroke="#ef4444"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorDespesa)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
