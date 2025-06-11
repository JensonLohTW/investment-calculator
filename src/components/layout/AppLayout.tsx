import React, { type ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * 應用佈局組件
 * 
 * 包含頭部和底部的完整應用佈局
 * 
 * @example
 * <AppLayout>
 *   <YourPageContent />
 * </AppLayout>
 */
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
} 