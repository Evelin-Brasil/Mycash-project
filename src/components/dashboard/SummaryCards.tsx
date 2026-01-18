import React from 'react';
import { clsx } from 'clsx';

const CARDS = [
    { label: 'Aluguel', percent: 25, value: 'R$ 1.000,00', color: '#CCFF00' }, // Primary
    { label: 'Alimentação', percent: 15, value: 'R$ 600,00', color: '#CCFF00' },
    { label: 'Automóvel', percent: 20, value: 'R$ 900,00', color: '#CCFF00' },
    { label: 'Mercado', percent: 40, value: 'R$ 1.200,00', color: '#CCFF00' },
];

export function SummaryCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {CARDS.map((card, idx) => (
                <div
                    key={idx}
                    className="bg-surface p-6 rounded-2xl shadow-sm border border-transparent hover:border-primary/50 transition-all cursor-pointer group hover:shadow-md"
                >
                    <div className="flex flex-col items-center">
                        {/* Simple CSS Gauge simulation */}
                        <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="text-gray-100"
                                />
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke={card.color}
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={`${251.2}`} // 2 * pi * 40
                                    strokeDashoffset={`${251.2 - (251.2 * card.percent) / 100}`}
                                    strokeLinecap="round"
                                    className="group-hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.6)] transition-all duration-300"
                                />
                            </svg>
                            <span className="absolute text-sm font-bold text-text-main">{card.percent}%</span>
                        </div>

                        <h3 className="text-text-secondary text-sm font-medium mb-1">{card.label}</h3>
                        <p className="text-xl font-bold text-text-main group-hover:text-primary-hover transition-colors">{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
