import React from 'react';
import { cn } from '../../utils/cn';

interface FooterProps {
  className?: string;
}

/**
 * 頁腳組件
 * 
 * 顯示在頁面底部的信息區域
 */
export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('border-t bg-background', className)}>
      <div className="container flex flex-col items-center justify-between py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} 投資助手 - 提供退休規劃與 ETF 投資計算
        </p>
        <div className="mt-4 flex items-center space-x-4 md:mt-0">
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            關於我們
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            使用條款
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            隱私政策
          </a>
        </div>
      </div>
    </footer>
  );
} 