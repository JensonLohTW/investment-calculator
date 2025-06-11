import React, {type ReactNode} from 'react';
import {cn} from '../../utils/cn';

interface PageLayoutProps {
    children: ReactNode;
    className?: string;
    pageTitle?: string;
}

/**
 * 頁面佈局組件
 *
 * 為頁面提供一致的佈局結構
 *
 * @example
 * <PageLayout pageTitle="投資計算器">
 *   <YourContent />
 * </PageLayout>
 */
export function PageLayout({children, className, pageTitle}: PageLayoutProps) {
    return (
        <div className={cn('min-h-screen bg-background', className)}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {pageTitle && (
                    <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">{pageTitle}</h1>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}

interface SectionProps {
    children: ReactNode;
    className?: string;
    title?: string;
    description?: string;
    id?: string;
}

/**
 * 頁面區塊組件
 *
 * 將頁面分割為不同的區塊，每個區塊可以有自己的標題和描述
 *
 * @example
 * <Section title="退休計算" description="計算您的退休需求">
 *   <YourContent />
 * </Section>
 */
export function Section({children, className, title, description, id}: SectionProps) {
    return (
        <section id={id} className={cn('mb-10', className)}>
            {(title || description) && (
                <div className="mb-6">
                    {title && <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>}
                    {description && <p className="text-muted-foreground mt-2">{description}</p>}
                </div>
            )}
            <div>{children}</div>
        </section>
    );
} 