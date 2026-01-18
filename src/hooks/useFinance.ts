import { useContext } from 'react';
import type { FinanceContextType } from '../contexts/FinanceContext';
import { FinanceContext } from '../contexts/FinanceContext';

export function useFinance(): FinanceContextType {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
}
