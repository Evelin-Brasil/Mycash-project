import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { twMerge } from 'tailwind-merge';

interface AppLayoutProps {
    children: React.ReactNode;
    onCalendarClick: () => void;
    dateRange: string;
}

export function AppLayout({ children, onCalendarClick, dateRange }: AppLayoutProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Auto-collapse on smaller desktop screens if needed, or controlled by user
    useEffect(() => {
        const handleResize = () => {
            // Logic for automatic responsive adjustments could go here
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-[#F5F7FA] flex">
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                isMobileOpen={isMobileOpen}
                closeMobile={() => setIsMobileOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                <Header
                    onMenuClick={() => setIsMobileOpen(true)}
                    onCalendarClick={onCalendarClick}
                    dateRange={dateRange}
                />

                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
                    <div className="max-w-[1600px] mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
