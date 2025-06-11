import React, {type SelectHTMLAttributes, forwardRef} from 'react';
import {cn} from '../../utils/cn';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
}

/**
 * 下拉選擇組件
 *
 * 用於從多個選項中進行選擇
 *
 * @example
 * <Select value={value} onChange={handleChange}>
 *   <option value="option1">選項 1</option>
 *   <option value="option2">選項 2</option>
 * </Select>
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({className, children, ...props}, ref) => {
        return (
            <select
                className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
                    'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
                    'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed',
                    'disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </select>
        );
    }
);

Select.displayName = 'Select';

export {Select};