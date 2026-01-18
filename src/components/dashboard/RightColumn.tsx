import React from 'react';
import { CreditCardsWidget } from './CreditCardsWidget';
import { UpcomingExpensesWidget } from './UpcomingExpensesWidget';

interface RightColumnProps {
    onAddCard: () => void;
    onCardClick: (id: string, type: 'account' | 'card') => void;
}

export function RightColumn({ onAddCard, onCardClick }: RightColumnProps) {
    return (
        <div className="flex flex-col gap-6 h-full min-w-0">
            {/* Credit Cards Section */}
            <CreditCardsWidget onAdd={onAddCard} onCardClick={onCardClick} />

            {/* Upcoming Expenses Section */}
            <UpcomingExpensesWidget />
        </div>
    );
}
