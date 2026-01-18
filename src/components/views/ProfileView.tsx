import React, { useState } from 'react';
import { Mail, DollarSign, UserPlus, LogOut, Edit2, Plus, Download } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { twMerge } from 'tailwind-merge';
import { formatCurrency } from '../../utils/formatters';

interface ProfileViewProps {
    onAddMember: () => void;
}

export function ProfileView({ onAddMember }: ProfileViewProps) {
    const { familyMembers } = useFinance();
    const [activeTab, setActiveTab] = useState<'info' | 'settings'>('info');

    const currentUser = familyMembers[0]; // First member is the main user
    const otherMembers = familyMembers.slice(1);



    const handleLogout = () => {
        // Logout logic here
        alert('Função de logout será implementada');
    };

    return (
        <div className="space-y-6">
            {/* Header with Tabs */}
            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tighter">
                    Perfil
                </h1>

                {/* Tabs */}
                <div className="flex gap-1 border-b border-border">
                    <button
                        onClick={() => setActiveTab('info')}
                        className={twMerge(
                            "px-6 py-3 font-black text-sm tracking-tight transition-all relative",
                            activeTab === 'info'
                                ? "text-text-main"
                                : "text-text-secondary hover:text-text-main"
                        )}
                    >
                        Informações
                        {activeTab === 'info' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-text-main rounded-t-full" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={twMerge(
                            "px-6 py-3 font-black text-sm tracking-tight transition-all relative",
                            activeTab === 'settings'
                                ? "text-text-main"
                                : "text-text-secondary hover:text-text-main"
                        )}
                    >
                        Configurações
                        {activeTab === 'settings' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-text-main rounded-t-full" />
                        )}
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'info' ? (
                <div className="space-y-6">
                    {/* User Profile Card */}
                    <div className="bg-white p-8 rounded-[32px] border border-border shadow-sm">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <img
                                    src={currentUser?.avatarUrl || 'https://i.pravatar.cc/150?u=default'}
                                    alt={currentUser?.name || 'User'}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                                />
                                <button className="absolute bottom-0 right-0 w-10 h-10 bg-text-main text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors">
                                    <Edit2 size={18} />
                                </button>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left space-y-4">
                                <div>
                                    <h2 className="text-3xl font-black text-text-main tracking-tight mb-1">
                                        {currentUser?.name || 'Usuário'}
                                    </h2>
                                    <p className="text-lg font-bold text-text-secondary">
                                        {currentUser?.role || 'Membro'}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 justify-center md:justify-start">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                                            <Mail size={18} className="text-text-secondary" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Email</p>
                                            <p className="text-sm font-bold text-text-main">usuario@mycash.com</p>
                                        </div>
                                    </div>

                                    {currentUser?.monthlyIncome && (
                                        <div className="flex items-center gap-3 justify-center md:justify-start">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                                <DollarSign size={18} className="text-primary" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Renda Mensal</p>
                                                <p className="text-sm font-black text-text-main">{formatCurrency(currentUser.monthlyIncome)}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button className="mt-4 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-2xl font-bold text-sm text-text-main transition-colors">
                                    Editar Perfil
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Family Members Section */}
                    <div className="bg-white p-8 rounded-[32px] border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black text-text-main tracking-tight">Membros da Família</h3>
                            <button
                                onClick={onAddMember}
                                className="flex items-center gap-2 bg-text-main text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition-all active:scale-95"
                            >
                                <UserPlus size={16} />
                                Adicionar
                            </button>
                        </div>

                        {otherMembers.length === 0 ? (
                            <div className="py-12 text-center bg-gray-50/50 rounded-[24px] border-2 border-dashed border-gray-200">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                    <UserPlus size={32} className="text-gray-300" />
                                </div>
                                <h4 className="text-lg font-black text-text-main mb-2">Nenhum membro cadastrado</h4>
                                <p className="text-sm font-bold text-text-secondary mb-4">Adicione membros da família para gerenciar finanças em conjunto</p>
                                <button
                                    onClick={onAddMember}
                                    className="inline-flex items-center gap-2 bg-text-main text-white px-6 py-3 rounded-full font-black hover:bg-gray-800 transition-all active:scale-95"
                                >
                                    <UserPlus size={18} />
                                    Adicionar Membro da Família
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {otherMembers.map((member) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors cursor-pointer group"
                                    >
                                        <img
                                            src={member.avatarUrl || 'https://i.pravatar.cc/150?u=' + member.id}
                                            alt={member.name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-white"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-black text-text-main truncate">{member.name}</p>
                                            <p className="text-xs font-bold text-text-secondary">{member.role}</p>
                                        </div>
                                        {member.monthlyIncome && (
                                            <div className="text-right">
                                                <p className="text-sm font-black text-text-main">{formatCurrency(member.monthlyIncome)}</p>
                                                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Renda</p>
                                            </div>
                                        )}
                                        <Edit2 size={16} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Logout Button */}
                    <div className="pt-4">
                        <button
                            onClick={handleLogout}
                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-lg shadow-rose-500/20"
                        >
                            <LogOut size={20} />
                            Sair da Conta
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Display Preferences */}
                    <div className="bg-white p-8 rounded-[32px] border border-border shadow-sm">
                        <h3 className="text-2xl font-black text-text-main tracking-tight mb-6">Preferências de Exibição</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-text-main">Modo Escuro</span>
                                    <span className="text-xs font-bold text-text-secondary bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                                        Em breve
                                    </span>
                                </div>
                                <div className="w-12 h-6 bg-gray-300 rounded-full opacity-50 cursor-not-allowed" />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <span className="text-sm font-bold text-text-main">Moeda Padrão</span>
                                <select disabled className="bg-white border border-border rounded-xl px-4 py-2 font-bold text-sm text-text-main opacity-50 cursor-not-allowed">
                                    <option>Real Brasileiro (R$)</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <span className="text-sm font-bold text-text-main">Formato de Data</span>
                                <select className="bg-white border border-border rounded-xl px-4 py-2 font-bold text-sm text-text-main">
                                    <option>DD/MM/AAAA</option>
                                    <option>MM/DD/AAAA</option>
                                    <option>AAAA-MM-DD</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white p-8 rounded-[32px] border border-border shadow-sm">
                        <h3 className="text-2xl font-black text-text-main tracking-tight mb-6">Notificações</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Lembrete de vencimento de contas', enabled: true },
                                { label: 'Alerta de aproximação do limite de cartão', enabled: true },
                                { label: 'Resumo mensal por email', enabled: false },
                                { label: 'Notificações de novos objetivos alcançados', enabled: true }
                            ].map((notification, index) => (
                                <NotificationToggle key={index} {...notification} />
                            ))}
                        </div>
                    </div>

                    {/* Categories Management */}
                    <div className="bg-white p-8 rounded-[32px] border border-border shadow-sm">
                        <h3 className="text-2xl font-black text-text-main tracking-tight mb-6">Gerenciar Categorias</h3>

                        <div className="space-y-6">
                            {/* Income Categories */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-black text-text-main">Categorias de Receita</h4>
                                    <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-text-main px-4 py-2 rounded-full font-bold text-sm transition-colors">
                                        <Plus size={16} />
                                        Adicionar
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {['Salário', 'Investimento', 'Extra'].map((cat, i) => (
                                        <CategoryItem key={i} name={cat} color={i === 0 ? '#CDFF5C' : i === 1 ? '#4ADE80' : '#60A5FA'} />
                                    ))}
                                </div>
                            </div>

                            {/* Expense Categories */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-lg font-black text-text-main">Categorias de Despesa</h4>
                                    <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-text-main px-4 py-2 rounded-full font-bold text-sm transition-colors">
                                        <Plus size={16} />
                                        Adicionar
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {['Aluguel', 'Alimentação', 'Mercado', 'Saúde', 'Lazer', 'Educação', 'Transporte'].map((cat, i) => (
                                        <CategoryItem key={i} name={cat} color={['#F87171', '#FB923C', '#FBBF24', '#A78BFA', '#EC4899', '#3B82F6', '#10B981'][i]} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data & Privacy */}
                    <div className="bg-white p-8 rounded-[32px] border border-border shadow-sm">
                        <h3 className="text-2xl font-black text-text-main tracking-tight mb-6">Dados e Privacidade</h3>
                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-text-main px-6 py-4 rounded-2xl font-bold transition-colors">
                                <Download size={20} />
                                Exportar Todos os Dados
                            </button>
                            <div>
                                <button className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 px-6 py-4 rounded-2xl font-bold transition-colors">
                                    <LogOut size={20} />
                                    Limpar Todos os Dados
                                </button>
                                <p className="text-xs font-bold text-text-secondary text-center mt-2">
                                    Esta ação não pode ser desfeita
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    <div className="bg-white p-8 rounded-[32px] border border-border shadow-sm">
                        <h3 className="text-2xl font-black text-text-main tracking-tight mb-6">Sobre o mycash+</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <span className="text-sm font-bold text-text-secondary">Versão</span>
                                <span className="text-sm font-black text-text-main">v1.0.0</span>
                            </div>
                            <p className="text-sm font-bold text-text-secondary px-4">
                                Sistema de gestão financeira familiar
                            </p>
                            <div className="flex gap-4 px-4 pt-2">
                                <a href="#" className="text-sm font-bold text-primary hover:underline">Termos de Uso</a>
                                <a href="#" className="text-sm font-bold text-primary hover:underline">Política de Privacidade</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper Components
function NotificationToggle({ label, enabled: initialEnabled }: { label: string; enabled: boolean }) {
    const [enabled, setEnabled] = React.useState(initialEnabled);

    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <span className="text-sm font-bold text-text-main">{label}</span>
            <button
                onClick={() => setEnabled(!enabled)}
                className={twMerge(
                    "relative w-12 h-6 rounded-full transition-colors",
                    enabled ? "bg-primary" : "bg-gray-300"
                )}
            >
                <div
                    className={twMerge(
                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                        enabled ? "translate-x-7" : "translate-x-1"
                    )}
                />
            </button>
        </div>
    );
}

function CategoryItem({ name, color }: { name: string; color: string }) {
    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
            <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-sm font-bold text-text-main">{name}</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <Edit2 size={14} className="text-text-secondary" />
                </button>
                <button className="p-2 hover:bg-rose-100 rounded-lg transition-colors">
                    <LogOut size={14} className="text-rose-500 rotate-180" />
                </button>
            </div>
        </div>
    );
}
