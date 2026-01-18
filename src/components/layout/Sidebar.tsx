import React from 'react';
import { Home, CreditCard, User, ChevronLeft, ChevronRight, PieChart, ArrowRightLeft, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
    activeView: string;
    onNavigate: (view: string) => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

const NAV_ITEMS = [
    { icon: Home, label: 'Home', view: 'home' },
    { icon: CreditCard, label: 'Cartões', view: 'cards' },
    { icon: ArrowRightLeft, label: 'Transações', view: 'transactions' },
    { icon: PieChart, label: 'Relatórios', view: 'reports' },
    { icon: User, label: 'Perfil', view: 'profile' },
];

export function Sidebar({ isCollapsed, toggleCollapse, activeView, onNavigate, isMobileOpen, onMobileClose }: SidebarProps) {
    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={twMerge(
                    "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 backdrop-blur-sm",
                    isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                )}
                onClick={onMobileClose}
            />

            {/* Sidebar */}
            <aside
                className={twMerge(
                    "fixed left-0 top-0 z-50 h-screen bg-surface border-r border-border transition-all duration-300 ease-in-out flex flex-col",
                    isCollapsed ? "lg:w-[80px]" : "lg:w-[280px]",
                    "w-[280px]", // Mobile width
                    isMobileOpen ? "translate-x-0 bg-white" : "-translate-x-full lg:translate-x-0 shadow-none"
                )}
            >
                {/* Logo Area */}
                {/* Logo Area */}
                <div className={clsx(
                    "h-20 flex items-center px-6 transition-all duration-300 relative shrink-0",
                    isCollapsed ? "lg:justify-center lg:px-2" : "justify-between"
                )}>
                    <div className="flex items-center min-w-max">
                        {(!isCollapsed || isMobileOpen) ? (
                            <h1 className="text-2xl font-black tracking-tighter text-text-main">
                                My<span className="text-text-secondary">cash+</span>
                            </h1>
                        ) : (
                            <div className="w-10 h-10 bg-text-main rounded-xl flex items-center justify-center text-white font-black text-xl">
                                M
                            </div>
                        )}
                    </div>

                    {/* Desktop Toggle Button */}
                    <button
                        onClick={toggleCollapse}
                        className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-text-secondary hover:text-text-main hover:bg-gray-50 shadow-md z-50 transition-all hover:scale-110 active:scale-95"
                    >
                        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>

                    {/* Mobile Close Button */}
                    <button
                        onClick={onMobileClose}
                        className="lg:hidden p-2 -mr-2 text-text-secondary hover:text-text-main"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => {
                                onNavigate(item.view);
                                onMobileClose?.();
                            }}
                            className={twMerge(
                                "w-full flex items-center gap-4 py-3.5 rounded-2xl transition-all duration-200 group relative",
                                isCollapsed && !isMobileOpen ? "justify-center px-0" : "px-4",
                                activeView === item.view
                                    ? "bg-text-main text-white shadow-lg shadow-black/10"
                                    : "text-text-secondary hover:bg-gray-50 hover:text-text-main"
                            )}
                        >
                            <item.icon
                                size={22}
                                className={clsx(
                                    "shrink-0 transition-colors",
                                    activeView === item.view ? "text-primary" : "group-hover:text-text-main"
                                )}
                            />

                            {(!isCollapsed || 'mobile') && (
                                <span className={clsx(
                                    "font-semibold whitespace-nowrap opacity-100 transition-opacity duration-300 delay-100",
                                    isCollapsed && "lg:hidden"
                                )}>
                                    {item.label}
                                </span>
                            )}

                            {/* Tooltip for collapsed state (Desktop only) */}
                            {isCollapsed && (
                                <div className="hidden lg:block absolute left-[calc(100%+12px)] bg-text-main text-white text-xs font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl translate-x-1 group-hover:translate-x-0 invisible group-hover:visible delay-150">
                                    {item.label}
                                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-text-main rotate-45" />
                                </div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* User Profile Area */}
                <div className={twMerge(
                    "p-4 border-t border-border mt-auto transition-all duration-300 shrink-0",
                    isCollapsed ? "lg:items-center" : ""
                )}>
                    <div className={twMerge(
                        "flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group",
                        isCollapsed ? "lg:justify-center" : ""
                    )}>
                        <div className="relative shrink-0">
                            <img
                                src="https://i.pravatar.cc/150?u=mycash"
                                alt="User"
                                className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success border-2 border-surface rounded-full" />
                        </div>

                        {(!isCollapsed || 'mobile') && (
                            <div className={clsx("flex-1 min-w-0", isCollapsed && "lg:hidden")}>
                                <p className="text-sm font-bold text-text-main truncate">Alex Silva</p>
                                <p className="text-[12px] text-text-secondary truncate">Plano Premium</p>
                            </div>
                        )}

                        {/* Collapsed Logout Tooltip */}
                        {isCollapsed && (
                            <div className="hidden lg:block absolute left-[calc(100%+12px)] bg-text-main text-white text-xs font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl translate-x-1 group-hover:translate-x-0 invisible group-hover:visible delay-150">
                                Perfil & Sair
                                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-text-main rotate-45" />
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
