import React from 'react';
import { Search, Menu, Plus, Bell, Calendar } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
    onMenuClick: () => void;
    onCalendarClick: () => void;
    dateRange: string;
}

export function Header({ onMenuClick, onCalendarClick, dateRange }: HeaderProps) {
    return (
        <header className="h-20 px-4 lg:px-8 border-b border-border bg-surface flex items-center justify-between sticky top-0 z-30">

            {/* Left: Mobile Menu & Search */}
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 -ml-2 text-text-secondary hover:bg-gray-50 rounded-lg"
                >
                    <Menu size={24} />
                </button>

                <div className="hidden md:flex items-center w-full max-w-md bg-gray-50 rounded-xl px-4 py-2.5 border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all">
                    <Search size={20} className="text-text-secondary mr-3" />
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        className="bg-transparent border-none outline-none w-full text-sm text-text-main placeholder:text-text-secondary/70"
                    />
                </div>
            </div>

            {/* Right: Actions, Date, Profile */}
            <div className="flex items-center gap-3 md:gap-6">

                {/* Date Picker Button */}
                <button
                    onClick={onCalendarClick}
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 transition-colors group"
                >
                    <Calendar size={18} className="text-text-secondary group-hover:text-text-main" />
                    <span className="text-sm font-medium text-text-main">{dateRange}</span>
                </button>

                {/* Avatars (Mock) */}
                <div className="hidden md:flex items-center -space-x-2">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User 1" className="w-9 h-9 rounded-full border-2 border-surface" />
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User 2" className="w-9 h-9 rounded-full border-2 border-surface" />
                    <button className="w-9 h-9 rounded-full bg-gray-100 border-2 border-surface flex items-center justify-center text-text-secondary hover:bg-gray-200">
                        <Plus size={16} />
                    </button>
                </div>

                {/* Primary Action */}
                <button className="flex items-center gap-2 bg-text-main text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-transform active:scale-95 shadow-lg shadow-gray-200/50">
                    <Plus size={18} />
                    <span className="text-sm font-semibold hidden md:inline">Nova Transação</span>
                </button>
            </div>
        </header>
    );
}
