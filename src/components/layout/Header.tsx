import React from 'react';
import { cn } from '../../utils/cn';

interface HeaderProps {
  className?: string;
}

/**
 * 頁頭組件
 * 
 * 顯示在頁面頂部的導航欄
 */
export function Header({ className }: HeaderProps) {
  return (
    <header className={cn('sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur', className)}>
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold">投資助手</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center space-x-6">
            <a
              href="#retirement"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              退休計算
            </a>
            <a
              href="#etf"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              ETF 投資
            </a>
            <a
              href="#comparison"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              投資比較
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
} 