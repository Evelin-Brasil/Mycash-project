import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header'; // Desktop Header
import { HeaderMobile } from './HeaderMobile';
import { twMerge } from 'tailwind-merge';

interface AppLayoutProps {
    children: React.ReactNode;
    onCalendarClick: () => void;
    onNewTransaction: () => void;
    onNewMember: () => void;
    onNewCard: () => void;
    activeView: string;
    onNavigate: (view: string) => void;
    dateRange: string;
}

export function AppLayout({
    children,
    onCalendarClick,
    onNewTransaction,
    onNewMember,
    onNewCard,
    activeView,
    onNavigate,
    dateRange
}: AppLayoutProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F5F7FA] flex flex-col lg:flex-row">
            {/* Mobile Header (Visible only < 1024px) */}
            <HeaderMobile onMenuClick={() => setIsMobileMenuOpen(true)} />

            {/* Sidebar (Visible only >= 1024px) */}
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                activeView={activeView}
                onNavigate={onNavigate}
                isMobileOpen={isMobileMenuOpen}
                onMobileClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Main Content Area */}
            <div
                className={twMerge(
                    "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out",
                    // On desktop, add margin-left to accommodate the fixed sidebar
                    isSidebarCollapsed ? "lg:ml-[80px]" : "lg:ml-[280px]"
                )}
            >
                {/* Desktop Header (Hidden on Mobile) */}
                <div className="hidden lg:block">
                    <Header
                        onCalendarClick={onCalendarClick}
                        onNewTransaction={onNewTransaction}
                        onNewMember={onNewMember}
                        dateRange={dateRange}
                    />
                </div>

                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
                    <div className="max-w-[1600px] mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
