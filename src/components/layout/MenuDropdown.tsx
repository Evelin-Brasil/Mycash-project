import React from 'react';
import { Home, CreditCard, User, PieChart, ArrowRightLeft, LogOut, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface MenuDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    activeSection?: string;
}

const NAV_ITEMS = [
    { icon: Home, label: 'Home', active: true },
    { icon: CreditCard, label: 'Cartões', active: false },
    { icon: ArrowRightLeft, label: 'Transações', active: false },
    { icon: PieChart, label: 'Relatórios', active: false },
    { icon: User, label: 'Perfil', active: false },
];

export function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Menu Content */}
            <div className="absolute top-0 inset-x-0 bg-white shadow-2xl rounded-b-[32px] overflow-hidden animate-slide-down">
                <div className="p-6 flex flex-col gap-6">
                    {/* Header inside dropdown */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-text-main rounded-lg flex items-center justify-center">
                                <span className="text-primary font-black text-xs italic">M</span>
                            </div>
                            <span className="font-bold text-lg">Mycash+</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 bg-gray-50 rounded-full text-text-secondary"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex flex-col gap-2">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.label}
                                onClick={onClose}
                                className={twMerge(
                                    "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-semibold",
                                    item.active
                                        ? "bg-text-main text-white"
                                        : "text-text-secondary active:bg-gray-50"
                                )}
                            >
                                <item.icon size={22} className={item.active ? "text-primary" : ""} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <button className="flex items-center gap-4 px-4 py-4 mt-2 rounded-2xl text-danger font-bold hover:bg-danger/5 transition-colors">
                        <LogOut size={22} />
                        Sair da Conta
                    </button>
                </div>
            </div>
        </div>
    );
}
