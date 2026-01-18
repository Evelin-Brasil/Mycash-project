import React, { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BalanceCards } from './components/dashboard/BalanceCards';
import { FinancialChart } from './components/dashboard/FinancialChart';
import { RightColumn } from './components/dashboard/RightColumn';
import { TransactionTable } from './components/dashboard/TransactionTable';
import { CalendarModal } from './components/ui/CalendarModal';

function App() {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [dateRange, setDateRange] = useState("01 Jan - 31 Jan 2026");

    return (
        <AppLayout
            onCalendarClick={() => setIsCalendarOpen(true)}
            dateRange={dateRange}
        >
            {/* 4 Top Cards */}
            <SummaryCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left/Main Column (2/3 width) */}
                <div className="lg:col-span-2 min-w-0 flex flex-col gap-6">
                    <BalanceCards />
                    <FinancialChart />
                </div>

                {/* Right Column (1/3 width) */}
                <div className="min-w-0 flex flex-col h-full">
                    <RightColumn />
                </div>
            </div>

            {/* Full Width Table */}
            <TransactionTable />

            {/* Modals */}
            <CalendarModal
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                onApply={(range) => setDateRange(range)}
            />
        </AppLayout>
    );
}

export default App;
