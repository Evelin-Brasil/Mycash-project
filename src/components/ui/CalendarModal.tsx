import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { clsx } from 'clsx';

interface CalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (range: string) => void;
}

export function CalendarModal({ isOpen, onClose, onApply }: CalendarModalProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7, 17)); // Mockado para bater com a imagem temporariamente
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 7, 17));

    if (!isOpen) return null;

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    // Simple day filler logic for grid
    const startDay = days[0].getDay(); // 0-6
    const empties = Array(startDay).fill(null);

    const handleDateClick = (day: Date) => {
        setSelectedDate(day);
    };

    const handleApply = () => {
        onApply("01 Jan - 31 Jan 2026"); // Mock return for now
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="bg-surface rounded-[24px] shadow-2xl w-full max-w-[360px] relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header Display */}
                <div className="p-6 pb-2">
                    <span className="bg-primary px-2 py-1 text-xs font-bold uppercase tracking-wider text-black mb-1 inline-block">Date</span>
                    <div className="flex items-center justify-between mt-1">
                        <h2 className="text-3xl font-medium text-text-main">{format(selectedDate, 'MM/dd/yyyy')}</h2>
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <CalendarIcon size={20} className="text-text-main" />
                        </div>
                    </div>
                    <p className="text-xs text-text-secondary mt-1 font-medium tracking-wide">MM/DD/YYYY</p>
                </div>

                {/* Calendar Grid Controller */}
                <div className="bg-gray-50/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover:bg-gray-200 rounded-full"><ChevronLeft size={20} /></button>
                        <div className="flex items-center gap-4 text-base font-semibold text-text-main">
                            <span>{format(currentMonth, 'MMM', { locale: ptBR })}</span>
                            <span>{format(currentMonth, 'yyyy')}</span>
                        </div>
                        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover:bg-gray-200 rounded-full"><ChevronRight size={20} /></button>
                    </div>

                    <div className="grid grid-cols-7 mb-2 text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <span key={d} className="text-sm font-medium text-text-main h-8 flex items-center justify-center">{d}</span>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-y-2 text-center">
                        {empties.map((_, i) => <div key={`e-${i}`} />)}
                        {days.map((day) => {
                            const isSelected = isSameDay(day, selectedDate);
                            return (
                                <button
                                    key={day.toISOString()}
                                    onClick={() => handleDateClick(day)}
                                    className={clsx(
                                        "h-10 w-10 mx-auto rounded-full flex items-center justify-center text-sm transition-all",
                                        isSelected
                                            ? "bg-primary text-black font-bold shadow-lg shadow-primary/40 scale-110"
                                            : "text-text-secondary hover:text-text-main hover:bg-gray-200"
                                    )}
                                >
                                    {format(day, 'd')}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex justify-end gap-6 mt-8">
                        <button onClick={onClose} className="text-sm font-bold text-text-secondary hover:text-text-main">Cancel</button>
                        <button onClick={handleApply} className="text-sm font-bold text-text-main hover:text-primary-hover">OK</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
