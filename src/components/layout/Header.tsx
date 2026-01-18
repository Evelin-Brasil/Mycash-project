import React from 'react';
import { Search, Plus, Calendar } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';

interface HeaderProps {
    onCalendarClick: () => void;
    onNewTransaction: () => void;
    onNewMember: () => void;
    dateRange: string;
}

export function Header({ onCalendarClick, onNewTransaction, onNewMember, dateRange }: HeaderProps) {
    const { familyMembers, selectedMember, setFilterMember } = useFinance();

    return (
        <header className="h-20 px-4 lg:px-8 border-b border-border bg-surface flex items-center justify-between sticky top-0 z-30">

            {/* Left: Search */}
            <div className="flex items-center gap-4 flex-1">
                <div className="hidden md:flex items-center w-full max-w-md bg-gray-50 rounded-xl px-4 py-2.5 border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all group">
                    <Search size={20} className="text-text-secondary mr-3 group-focus-within:text-text-main transition-colors" />
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className="bg-transparent border-none outline-none w-full text-sm text-text-main placeholder:text-text-secondary/70 font-medium"
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
                    <span className="text-sm font-bold text-text-main">{dateRange}</span>
                </button>

                {/* Avatars Dynamic */}
                <div className="hidden md:flex items-center -space-x-2">
                    {familyMembers.map((member) => (
                        <button
                            key={member.id}
                            onClick={() => setFilterMember(selectedMember === member.id ? null : member.id)}
                            className={`relative w-9 h-9 rounded-full border-2 border-surface transition-transform hover:scale-110 hover:z-10 ${selectedMember === member.id ? 'ring-2 ring-text-main z-10 scale-110' : ''}`}
                            title={member.name}
                        >
                            <img src={member.avatarUrl} alt={member.name} className="w-full h-full rounded-full object-cover" />
                        </button>
                    ))}
                    <button
                        onClick={onNewMember}
                        className="w-9 h-9 rounded-full bg-gray-50 border-2 border-surface flex items-center justify-center text-text-secondary hover:bg-gray-100 hover:text-text-main transition-all z-0"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                {/* Primary Action */}
                <button
                    onClick={onNewTransaction}
                    className="flex items-center gap-2 bg-text-main text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/10"
                >
                    <Plus size={18} />
                    <span className="text-sm font-bold hidden md:inline">Nova Transação</span>
                </button>
            </div>
        </header>
    );
}
