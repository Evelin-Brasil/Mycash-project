import React, { useState, useEffect } from 'react';
import { X, UserPlus, Upload, Link as LinkIcon, Check } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { twMerge } from 'tailwind-merge';

interface MemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FUNCTIONS = ['Pai', 'Mãe', 'Filho', 'Filha', 'Avô', 'Avó', 'Tio', 'Tia', 'Outro'];

export function MemberModal({ isOpen, onClose }: MemberModalProps) {
    const { addMember } = useFinance();

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setRole('');
            setAvatarUrl('');
            setMonthlyIncome('');
            setActiveTab('url');
        }
    }, [isOpen]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSave = async () => {
        if (name.length < 3) {
            alert('Por favor, insira um nome válido (mínimo 3 caracteres).');
            return;
        }
        if (!role) {
            alert('Por favor, informe a função na família.');
            return;
        }

        try {
            setIsSubmitting(true);
            await addMember({
                name,
                role,
                avatarUrl: avatarUrl || `https://i.pravatar.cc/150?u=${name.replace(/\s/g, '')}`,
                monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : 0
            });
            onClose();
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar membro. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

            {/* Modal Container */}
            <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-[500px] relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="p-8 flex items-center justify-between border-b border-gray-50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <UserPlus size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-text-main tracking-tighter leading-tight">Adicionar Membro</h2>
                            <p className="text-sm font-bold text-text-secondary">Expanda sua rede familiar</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-text-secondary">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Nome Completo</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: João Silva"
                            className="w-full bg-gray-50 border border-transparent rounded-[20px] py-4 px-6 font-bold text-text-main outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                        />
                    </div>

                    {/* Role & Income */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Função</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-gray-50 border border-transparent rounded-[20px] py-4 px-6 font-bold text-text-main outline-none focus:bg-white focus:border-primary appearance-none transition-all shadow-inner"
                            >
                                <option value="">Selecione...</option>
                                {FUNCTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Renda (Opcional)</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-black text-text-main">R$</span>
                                <input
                                    type="number"
                                    value={monthlyIncome}
                                    onChange={(e) => setMonthlyIncome(e.target.value)}
                                    placeholder="0,00"
                                    className="w-full bg-gray-50 border border-transparent rounded-[20px] py-4 pl-12 pr-6 font-bold text-text-main outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Avatar Selection */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-text-secondary uppercase tracking-widest px-1">Foto do Membro</label>
                        <div className="bg-gray-50 p-2 rounded-[24px] flex gap-2">
                            <button
                                onClick={() => setActiveTab('url')}
                                className={twMerge(
                                    "flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-all",
                                    activeTab === 'url' ? "bg-white text-text-main shadow-lg" : "text-text-secondary hover:text-text-main"
                                )}
                            >
                                <LinkIcon size={16} /> URL da Imagem
                            </button>
                            <button
                                onClick={() => setActiveTab('upload')}
                                className={twMerge(
                                    "flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-all",
                                    activeTab === 'upload' ? "bg-white text-text-main shadow-lg" : "text-text-secondary hover:text-text-main"
                                )}
                            >
                                <Upload size={16} /> Upload
                            </button>
                        </div>

                        {activeTab === 'url' ? (
                            <input
                                type="text"
                                value={avatarUrl}
                                onChange={(e) => setAvatarUrl(e.target.value)}
                                placeholder="Pinte ou digite o link da imagem..."
                                className="w-full bg-gray-50 border border-transparent rounded-[20px] py-4 px-6 font-bold text-text-main outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                            />
                        ) : (
                            <div className="border-2 border-dashed border-gray-200 rounded-[24px] p-8 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all group">
                                <Upload size={32} className="text-gray-300 group-hover:text-primary transition-colors" />
                                <span className="text-xs font-black text-gray-400 group-hover:text-primary transition-colors">Arraste ou clique para enviar (Máx 5MB)</span>
                            </div>
                        )}
                    </div>
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
                        disabled={isSubmitting}
                        className="px-8 py-4 rounded-full bg-text-main text-white font-black shadow-xl shadow-black/10 hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>Salvando...</>
                        ) : (
                            <>
                                <Check size={18} /> Adicionar Membro
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
