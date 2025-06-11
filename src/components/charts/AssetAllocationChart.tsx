import React from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {formatCurrency} from '../../utils/calculators';

interface AssetAllocationData {
    name: string;
    value: number;
    color: string;
}

interface AssetAllocationChartProps {
    data: AssetAllocationData[];
    className?: string;
}

/**
 * 資產分配餅圖組件
 *
 * 以餅圖形式展示投資組合的資產分配
 *
 * @example
 * <AssetAllocationChart data={allocationData} />
 */
export function AssetAllocationChart({data, className}: AssetAllocationChartProps) {
    // 自定義 tooltip 格式化
    const CustomTooltip = ({active, payload}: any) => {
        if (active && payload && payload.length) {
            const item = payload[0];
            const percentage = ((item.value / getTotalValue()) * 100).toFixed(1);

            return (
                <div className="bg-background p-3 border rounded-md shadow-md">
                    <p className="font-semibold" style={{color: item.color}}>{item.name}</p>
                    <p>{formatCurrency(item.value)}</p>
                    <p>{percentage}%</p>
                </div>
            );
        }
        return null;
    };

    // 獲取總價值
    const getTotalValue = () => {
        return data.reduce((sum, item) => sum + item.value, 0);
    };

    // 格式化標籤
    const renderLabel = ({name, percent}: any) => {
        return `${name}: ${(percent * 100).toFixed(0)}%`;
    };

    return (
        <div className={`w-full h-80 ${className || ''}`}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={renderLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color}/>
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
} 