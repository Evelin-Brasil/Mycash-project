import React, { useState } from 'react';
import { Sliders, Menu } from 'lucide-react';
import { MenuDropdown } from './MenuDropdown';
import { FiltersMobileModal } from '../dashboard/FiltersMobileModal';

interface HeaderMobileProps {
    onMenuClick: () => void;
}

export function HeaderMobile({ onMenuClick }: HeaderMobileProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    return (
        <>
            <header className="lg:hidden h-20 px-6 bg-surface border-b border-border flex items-center justify-between sticky top-0 z-[60] backdrop-blur-md bg-white/90">
                {/* Logo & Menu */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 text-text-secondary hover:text-text-main active:scale-95 transition-transform"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-2xl font-black tracking-tighter text-text-main">
                        My<span className="font-extrabold text-text-secondary/90">cash+</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Filters Trigger */}
                    <button
                        onClick={() => setIsFiltersOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-text-main active:scale-90 transition-transform"
                    >
                        <Sliders size={20} />
                    </button>

                    {/* Avatar Trigger */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="relative shrink-0 active:scale-90 transition-transform"
                    >
                        <img
                            src="https://i.pravatar.cc/150?u=mycash"
                            alt="User"
                            className="w-10 h-10 rounded-xl object-cover border-2 border-transparent active:border-primary/50 transition-all"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success border-2 border-surface rounded-full" />
                    </button>
                </div>
            </header>

            <MenuDropdown isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <FiltersMobileModal isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} />
        </>
    );
}
