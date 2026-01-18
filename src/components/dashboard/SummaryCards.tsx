import React, { useMemo } from 'react';
import { useFinance } from '../../hooks/useFinance';
import { formatCurrency } from '../../utils/formatters';

const COLORS = ['#CCFF00', '#000000', '#AAAAAA', '#E5E5E5'];

export function SummaryCards() {
    const { calculateExpensesByCategory, calculateCategoryPercentage } = useFinance();

    // Get top 4 categories
    const categories = useMemo(() => {
        const cats = calculateExpensesByCategory();
        return cats.slice(0, 4).map((cat: { category: string; value: number }) => ({
            label: cat.category,
            value: formatCurrency(cat.value),
            percent: Math.round(calculateCategoryPercentage(cat.category)),
            color: '#CCFF00' // Fixed color as requested
        }));
    }, [calculateExpensesByCategory, calculateCategoryPercentage]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {categories.map((card: any, idx: number) => (
                <div
                    key={idx}
                    className="bg-surface p-6 rounded-2xl shadow-sm border border-transparent hover:border-primary/50 transition-all cursor-pointer group hover:shadow-md"
                >
                    <div className="flex flex-col items-center">
                        {/* Simple CSS Gauge simulation */}
                        <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                {/* Background Track */}
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="text-gray-200"
                                />
                                {/* Progress Circle */}
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
                                    className="transition-all duration-300"
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
