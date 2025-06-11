import React, {type LabelHTMLAttributes, forwardRef} from 'react';
import {cn} from '../../utils/cn';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
}

/**
 * 標籤組件
 *
 * 用於為表單元素提供標籤
 *
 * @example
 * <Label htmlFor="amount">投資金額</Label>
 */
const Label = forwardRef<HTMLLabelElement, LabelProps>(
    ({className, ...props}, ref) => (
        <label
            ref={ref}
            className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                className
            )}
            {...props}
        />
    )
);

Label.displayName = 'Label';

export {Label};