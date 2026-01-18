import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { twMerge } from 'tailwind-merge';
import { formatCurrency } from '../../utils/formatters';

const ROTATING_COLORS = ['#CCFF00', '#111827', '#6B7280', '#9CA3AF', '#E5E7EB'];

interface CategoryDonutCardProps {
    category: string;
    value: number;
    percentage: number;
}

function CategoryDonutCard({ category, value, percentage }: CategoryDonutCardProps) {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const color = '#CCFF00'; // Hardcoded unified color



    return (
        <div className="flex-shrink-0 w-[160px] bg-white border border-border rounded-[24px] p-5 flex flex-col items-center group hover:border-primary transition-all duration-300">
            {/* Donut Chart */}
            <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    {/* Background Track */}
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        stroke="#F3F4F6"
                        strokeWidth="6"
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        stroke={color}
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-out"
                    />
                </svg>
                <span className="absolute text-[10px] font-bold text-text-main">
                    {percentage.toFixed(1)}%
                </span>
            </div>

            <h4 className="text-xs font-medium text-text-secondary mb-1 w-full text-center truncate px-1">
                {category}
            </h4>
            <p className="text-sm font-bold text-text-main">
                {formatCurrency(value)}
            </p>
        </div>
    );
}

export function ExpensesByCategoryCarousel() {
    const { calculateExpensesByCategory, calculateCategoryPercentage } = useFinance();
    const categories = calculateExpensesByCategory();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showArrows, setShowArrows] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -200 : 200;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Mouse Wheel Scroll (horizontal)
    const handleWheel = (e: React.WheelEvent) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY;
        }
    };

    // Drag to scroll
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        setShowArrows(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2;
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    return (
        <div
            className="relative mb-8 group"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-lg font-bold text-text-main">Gastos por Categoria</h3>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#F5F7FA] to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F5F7FA] to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Arrows */}
                {showArrows && (
                    <>
                        <button
                            onClick={() => scroll('left')}
                            className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center text-text-main hover:bg-gray-50 transition-all border border-border/50 active:scale-90"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center text-text-main hover:bg-gray-50 transition-all border border-border/50 active:scale-90"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}

                {/* Cards Scroll Area */}
                <div
                    ref={scrollRef}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className={twMerge(
                        "flex gap-4 overflow-x-auto custom-scrollbar-hide pb-4 select-none cursor-grab active:cursor-grabbing",
                        isDragging ? "scroll-auto" : "scroll-smooth"
                    )}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {categories.map((cat) => (
                        <CategoryDonutCard
                            key={cat.category}
                            category={cat.category}
                            value={cat.value}
                            percentage={calculateCategoryPercentage(cat.category)}
                        />
                    ))}
                    {categories.length === 0 && (
                        <div className="w-full py-10 text-center text-text-secondary text-sm bg-white rounded-3xl border border-dashed border-border">
                            Nenhuma despesa registrada para o período selecionado.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
