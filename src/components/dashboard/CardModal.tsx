import React, { useState, useEffect } from 'react';
import { X, CreditCard, Building2, Check, Landmark, User } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { twMerge } from 'tailwind-merge';

interface CardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const INSTITUTIONS = [
    { name: 'Nubank', color: '#8A05BE', icon: Landmark },
    { name: 'Inter', color: '#FF7A00', icon: Landmark },
    { name: 'Bradesco', color: '#CC092F', icon: Landmark },
    { name: 'Itaú', color: '#EC7000', icon: Landmark },
    { name: 'Santander', color: '#CC0000', icon: Landmark },
    { name: 'PicPay', color: '#21C25E', icon: Landmark },
    { name: 'Caixa', color: '#005CA9', icon: Landmark },
    { name: 'C6 Bank', color: '#000000', icon: Landmark },
];

const THEMES = [
    { id: 'black', label: 'Dark Mode', classes: 'bg-text-main text-white shadow-black/30' },
    { id: 'lime', label: 'Neon Lime', classes: 'bg-primary text-text-main shadow-primary/30' },
    { id: 'white', label: 'Classic White', classes: 'bg-white text-text-main border border-border shadow-gray-200/50' },
];

export function CardModal({ isOpen, onClose }: CardModalProps) {
    const { addAccount, addCard, familyMembers } = useFinance();

    const [type, setType] = useState<'account' | 'card'>('account');
    const [institution, setInstitution] = useState('');
    const [name, setName] = useState('');
    const [holderId, setHolderId] = useState('');
    const [balance, setBalance] = useState(''); // Only for Account
    const [limit, setLimit] = useState(''); // Only for Card
    const [closingDay, setClosingDay] = useState(''); // Only for Card
    const [dueDay, setDueDay] = useState(''); // Only for Card
    const [lastDigits, setLastDigits] = useState(''); // Only for Card
    const [theme, setTheme] = useState('black'); // Only for Card

    useEffect(() => {
        if (isOpen) {
            setType('account');
            setInstitution('');
            setName('');
            setHolderId('');
            setBalance('');
            setLimit('');
            setClosingDay('');
            setDueDay('');
            setLastDigits('');
            setTheme('black');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!institution || !name || !holderId) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (type === 'account') {
            if (!balance) return alert('Informe o saldo inicial.');
            addAccount({
                name,
                institution,
                balance: parseFloat(balance),
                holderId
            });
        } else {
            if (!limit || !closingDay || !dueDay) return alert('Preencha os dados do cartão.');
            addCard({
                name,
                institution,
                limit: parseFloat(limit),
                currentBill: 0,
                closingDay: parseInt(closingDay),
                dueDay: parseInt(dueDay),
                lastDigits: lastDigits || '0000',
                theme: theme as any,
                holderId
            });
        }

        onClose();
    };

    const selectedInst = INSTITUTIONS.find(i => i.name === institution);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

            {/* Modal Container */}
            <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-[600px] relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="p-8 flex items-center justify-between border-b border-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-text-main flex items-center justify-center text-primary">
                            <Landmark size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-text-main tracking-tighter leading-tight">Nova Origem</h2>
                            <p className="text-sm font-bold text-text-secondary">Adicione uma conta ou cartão à sua carteira</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-text-secondary">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">

                    {/* Toggle */}
                    <div className="bg-gray-100 p-2 rounded-[28px] flex gap-2">
                        <button
                            onClick={() => setType('account')}
                            className={twMerge(
                                "flex-1 py-4 px-6 rounded-[22px] flex items-center justify-center gap-3 font-black text-sm transition-all",
                                type === 'account' ? "bg-white text-text-main shadow-xl" : "text-text-secondary hover:text-text-main"
                            )}
                        >
                            <Building2 size={18} /> Conta Bancária
                        </button>
                        <button
                            onClick={() => setType('card')}
                            className={twMerge(
                                "flex-1 py-4 px-6 rounded-[22px] flex items-center justify-center gap-3 font-black text-sm transition-all",
                                type === 'card' ? "bg-white text-text-main shadow-xl" : "text-text-secondary hover:text-text-main"
                            )}
                        >
                            <CreditCard size={18} /> Cartão de Crédito
                        </button>
                    </div>

                    {/* Common Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Instituição</label>
                            <select
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                                className="w-full bg-gray-50 border border-transparent rounded-[20px] py-4 px-5 font-bold text-text-main outline-none focus:bg-white focus:border-primary appearance-none transition-all shadow-inner"
                            >
                                <option value="">Selecione...</option>
                                {INSTITUTIONS.map(inst => <option key={inst.name} value={inst.name}>{inst.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Nome da exibição</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ex: Principal, Nubank XP..."
                                className="w-full bg-gray-50 border border-transparent rounded-[20px] py-4 px-5 font-bold text-text-main outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                            />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Titular da conta/cartão</label>
                            <select
                                value={holderId}
                                onChange={(e) => setHolderId(e.target.value)}
                                className="w-full bg-gray-50 border border-transparent rounded-[20px] py-4 px-5 font-bold text-text-main outline-none focus:bg-white focus:border-primary appearance-none transition-all shadow-inner"
                            >
                                <option value="">Selecione o membro...</option>
                                {familyMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Conditional Fields */}
                    {type === 'account' ? (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
                            <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Saldo Inicial Atual</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg font-black text-text-main">R$</span>
                                <input
                                    type="number"
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    placeholder="0,00"
                                    className="w-full bg-gray-50 border border-transparent rounded-[24px] py-6 pl-16 pr-6 text-2xl font-black text-text-main outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Limite Total</label>
                                    <input
                                        type="number"
                                        value={limit}
                                        onChange={(e) => setLimit(e.target.value)}
                                        placeholder="R$ 0,00"
                                        className="w-full bg-gray-50 border border-transparent rounded-[20px] py-4 px-5 font-bold text-text-main outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Últimos 4 dígitos</label>
                                    <input
                                        type="text"
                                        maxLength={4}
                                        value={lastDigits}
                                        onChange={(e) => setLastDigits(e.target.value)}
                                        placeholder="5897"
                                        className="w-full bg-gray-50 border border-transparent rounded-[20px] py-4 px-5 font-bold text-text-main outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Dia de Fechamento</label>
                                    <input
                                        type="number"
                                        min={1} max={31}
                                        value={closingDay}
                                        onChange={(e) => setClosingDay(e.target.value)}
                                        className="w-full bg-gray-50 border border-transparent rounded-[20px] py-4 px-5 font-bold text-text-main outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Dia de Vencimento</label>
                                    <input
                                        type="number"
                                        min={1} max={31}
                                        value={dueDay}
                                        onChange={(e) => setDueDay(e.target.value)}
                                        className="w-full bg-gray-50 border border-transparent rounded-[20px] py-4 px-5 font-bold text-text-main outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                                    />
                                </div>
                            </div>

                            {/* Theme Choice */}
                            <div className="space-y-4">
                                <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Tema Visual do Cartão</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {THEMES.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setTheme(t.id)}
                                            className={twMerge(
                                                "h-24 rounded-[20px] p-4 flex flex-col justify-between items-start transition-all relative group overflow-hidden",
                                                t.classes,
                                                theme === t.id ? "ring-4 ring-primary/20 scale-105 z-10" : "opacity-60 grayscale-[0.5] hover:grayscale-0 hover:opacity-100"
                                            )}
                                        >
                                            <Landmark size={18} className="opacity-50" />
                                            <span className="text-[10px] font-black tracking-tight">{t.label}</span>
                                            {theme === t.id && (
                                                <div className="absolute top-2 right-2 w-5 h-5 bg-primary text-text-main rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                                                    <Check size={12} strokeWidth={4} />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 bg-gray-50 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-8 py-4 rounded-full font-black text-text-secondary hover:bg-gray-200 transition-all active:scale-95"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-10 py-4 rounded-full bg-text-main text-white font-black shadow-xl shadow-black/10 hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <Landmark size={18} /> Adicionar Origem
                    </button>
                </div>
            </div>
        </div>
    );
}
