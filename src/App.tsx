import React, { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BalanceCards } from './components/dashboard/BalanceCards';
import { FinancialChart } from './components/dashboard/FinancialChart';
import { RightColumn } from './components/dashboard/RightColumn';
import { TransactionTable } from './components/dashboard/TransactionTable';
import { CalendarModal } from './components/ui/CalendarModal';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { ExpensesByCategoryCarousel } from './components/dashboard/ExpensesByCategoryCarousel';
import { TransactionModal } from './components/dashboard/TransactionModal';
import { MemberModal } from './components/dashboard/MemberModal';
import { CardModal } from './components/dashboard/CardModal';
import { CardDetailsModal } from './components/dashboard/CardDetailsModal';
import { CardsView } from './components/views/CardsView';
import { TransactionsView } from './components/views/TransactionsView';
import { ProfileView } from './components/views/ProfileView';

function App() {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [selectedSource, setSelectedSource] = useState<{ id: string; type: 'account' | 'card' } | null>(null);
    const [dateRange, setDateRange] = useState("01 Jan - 31 Jan 2026");
    const [activeView, setActiveView] = useState('home');

    const onNewTransaction = () => setIsTransactionModalOpen(true);
    const onNewMember = () => setIsMemberModalOpen(true);
    const onNewCard = () => setIsCardModalOpen(true);
    const onCardClick = (id: string, type: 'account' | 'card') => setSelectedSource({ id, type });
    const onNavigate = (view: string) => setActiveView(view);

    return (
        <AppLayout
            onCalendarClick={() => setIsCalendarOpen(true)}
            onNewTransaction={onNewTransaction}
            onNewMember={onNewMember}
            onNewCard={onNewCard}
            activeView={activeView}
            onNavigate={onNavigate}
            dateRange={dateRange}
        >
            {/* Dashboard Controls & Greeting */}
            {activeView === 'home' && <DashboardHeader />}

            {/* Conditional View Rendering */}
            {activeView === 'home' ? (
                <>
                    {/* Expenses By Category Carousel (Top Row) */}
                    <ExpensesByCategoryCarousel />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left/Main Column (2/3 width) */}
                        <div className="lg:col-span-2 min-w-0 flex flex-col gap-6">
                            <BalanceCards />
                            <FinancialChart />
                        </div>

                        {/* Right Column (1/3 width) */}
                        <div className="min-w-0 flex flex-col h-full">
                            <RightColumn onAddCard={onNewCard} onCardClick={onCardClick} />
                        </div>
                    </div>

                    {/* Full Width Table */}
                    <TransactionTable />
                </>
            ) : activeView === 'cards' ? (
                <CardsView
                    onNewCard={onNewCard}
                    onCardClick={onCardClick}
                    onAddExpense={(cardId) => {
                        setSelectedSource({ id: cardId, type: 'card' });
                        onNewTransaction();
                    }}
                />
            ) : activeView === 'transactions' ? (
                <TransactionsView
                    onNewTransaction={onNewTransaction}
                />
            ) : activeView === 'profile' ? (
                <ProfileView
                    onAddMember={onNewMember}
                />
            ) : (
                <div className="flex items-center justify-center py-24">
                    <div className="text-center">
                        <h2 className="text-3xl font-black text-text-main mb-2">Em Desenvolvimento</h2>
                        <p className="text-text-secondary font-bold">Esta seção será implementada em breve</p>
                    </div>
                </div>
            )}

            {/* Modals */}
            <CalendarModal
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
                onApply={(range) => setDateRange(range)}
            />
            <TransactionModal
                isOpen={isTransactionModalOpen}
                onClose={() => setIsTransactionModalOpen(false)}
            />
            <MemberModal
                isOpen={isMemberModalOpen}
                onClose={() => setIsMemberModalOpen(false)}
            />
            <CardModal
                isOpen={isCardModalOpen}
                onClose={() => setIsCardModalOpen(false)}
            />
            <CardDetailsModal
                isOpen={!!selectedSource}
                onClose={() => setSelectedSource(null)}
                sourceId={selectedSource?.id || null}
                sourceType={selectedSource?.type || 'card'}
                onAddExpense={() => {
                    setSelectedSource(null);
                    onNewTransaction();
                }}
                onViewFullStatement={() => {
                    setSelectedSource(null);
                    // This will be handled when we have the transactions page
                }}
            />
        </AppLayout>
    );
}

export default App;
