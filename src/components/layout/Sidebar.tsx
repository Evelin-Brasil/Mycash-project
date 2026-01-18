import React from 'react';
import { Home, CreditCard, User, ChevronLeft, ChevronRight, PieChart, ArrowRightLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
    isMobileOpen: boolean;
    closeMobile: () => void;
}

const NAV_ITEMS = [
    { icon: Home, label: 'Home', active: true },
    { icon: CreditCard, label: 'Cartões', active: false },
    { icon: ArrowRightLeft, label: 'Transações', active: false }, // Ícone genérico para ilustrar
    { icon: PieChart, label: 'Relatórios', active: false }, // Ícone genérico para ilustrar
    { icon: User, label: 'Perfil', active: false }, // Ícone genérico para ilustrar
];

export function Sidebar({ isCollapsed, toggleCollapse, isMobileOpen, closeMobile }: SidebarProps) {
    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeMobile}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={twMerge(
                    "fixed lg:static inset-y-0 left-0 z-50 bg-surface border-r border-border flex flex-col transition-all duration-300 ease-in-out",
                    // Mobile state
                    isMobileOpen ? "translate-x-0 w-[280px]" : "-translate-x-full lg:translate-x-0",
                    // Desktop collapsed state
                    !isMobileOpen && (isCollapsed ? "lg:w-[80px]" : "lg:w-[280px]")
                )}
            >
                {/* Logo Area */}
                <div className={clsx(
                    "h-20 flex items-center px-6 overflow-hidden transition-all duration-300",
                    isCollapsed ? "justify-center px-2" : "justify-between"
                )}>
                    <div className="flex items-center gap-2 min-w-max">
                        {isCollapsed ? (
                            <img src="/collapsed-logo.png" alt="MyCash+" className="w-8 h-8 object-contain" />
                        ) : (
                            <h1 className="text-2xl font-bold tracking-tight text-text-main">
                                My<span className="font-extrabold">cash+</span>
                            </h1>
                        )}
                    </div>

                    {/* Toggle Button (Desktop Only) */}
                    <button
                        onClick={toggleCollapse}
                        className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 border border-border text-text-secondary hover:text-text-main hover:bg-gray-100 absolute -right-4 top-9 shadow-sm z-50"
                    >
                        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.label}
                            className={twMerge(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden",
                                item.active
                                    ? "bg-primary text-text-main font-semibold shadow-sm"
                                    : "text-text-secondary hover:bg-gray-50 hover:text-text-main"
                            )}
                        >
                            <item.icon
                                size={22}
                                className={clsx(
                                    "shrink-0",
                                    item.active ? "text-text-main" : "group-hover:text-text-main"
                                )}
                            />

                            <span className={clsx(
                                "whitespace-nowrap transition-opacity duration-200",
                                isCollapsed && !isMobileOpen ? "opacity-0 w-0 hidden" : "opacity-100"
                            )}>
                                {item.label}
                            </span>

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && !isMobileOpen && (
                                <div className="absolute left-[70px] bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer/Logout Area could go here */}
                <div className="p-4 border-t border-border">
                    {/* Opcional */}
                </div>
            </aside>
        </>
    );
}
