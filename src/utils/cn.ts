import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

/**
 * 合併 className 的工具函數
 * 結合 clsx 和 tailwind-merge 的功能
 *
 * @param inputs 多個 className 值
 * @returns 合併後的 className 字符串
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
} 