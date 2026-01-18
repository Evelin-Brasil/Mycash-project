import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// --- Currency Formatters ---

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export const formatCompactCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(value);
};

export const parseCurrencyInput = (value: string): number => {
    const cleanValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    // Basic implementation; for robust parsing considering 'R$' and various inputs, 
    // we might need regex. Assuming standard input format or raw numbers string.
    // If input is "R$ 1.234,56", replace non-digits (except comma) might be safer.

    // Safer approach for "money input" handling (usually handling cents):
    const numbersOnly = value.replace(/\D/g, '');
    return Number(numbersOnly) / 100;
};

// --- Date Formatters ---

export const formatDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return format(d, 'dd/MM/yyyy', { locale: ptBR });
};

export const formatDateLong = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

export const formatDateShort = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return format(d, "dd 'de' MMM", { locale: ptBR });
};

export const formatDateRange = (start: Date, end: Date): string => {
    return `${format(start, 'dd MMM', { locale: ptBR })} - ${format(end, 'dd MMM yyyy', { locale: ptBR })}`;
};

export const formatRelativeDate = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isToday(d)) return 'Hoje';
    if (isYesterday(d)) return 'Ontem';
    return formatDistanceToNow(d, { addSuffix: true, locale: ptBR });
};

// --- Text Formatters ---

export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
