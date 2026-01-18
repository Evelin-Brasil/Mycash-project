import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, Plus, Check } from 'lucide-react';
import { useFinance } from '../../hooks/useFinance';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function DashboardHeader() {
    return (
        <div className="flex flex-col gap-1 mb-10 mt-2">
            <h2 className="text-4xl font-black text-text-main tracking-tighter">Gerencie suas finanças</h2>
            <p className="text-text-secondary font-bold text-lg">Bem-vindo de volta, Alex Silva</p>
        </div>
    );
}

