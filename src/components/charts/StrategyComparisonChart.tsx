import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import type {StrategyComparisonResult} from '../../types';
import {formatCurrency} from '../../utils/calculators';

interface StrategyComparisonChartProps {
    data: StrategyComparisonResult[];
    className?: string;
}

/**
 * 投資策略比較圖表組件
 *
 * 以柱狀圖形式比較不同投資策略的最終價值
 *
 * @example
 * <StrategyComparisonChart data={comparisonResults} />
 */
export function StrategyComparisonChart({data, className}: StrategyComparisonChartProps) {
    // 處理數據格式
    const chartData = data.map(item => ({
        name: item.name,
        最終價值: item.finalValue,
        增長百分比: item.growthPercentage,
    }));

    // 自定義 tooltip 格式化
    const CustomTooltip = ({active, payload, label}: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background p-3 border rounded-md shadow-md">
                    <p className="font-semibold">{label}</p>
                    <p style={{color: '#0070f3'}}>
                        最終價值: {formatCurrency(payload[0].value)}
                    </p>
                    <p style={{color: '#f59e0b'}}>
                        增長百分比: {payload[1].value.toFixed(2)}%
                    </p>
                </div>
            );
        }
        return null;
    };

    // 數值格式化
    const formatYAxis = (value: number): string => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(0)}K`;
        }
        return value.toString();
    };

    return (
        <div className={`w-full h-80 ${className || ''}`}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis yAxisId="left" tickFormatter={formatYAxis}/>
                    <YAxis yAxisId="right" orientation="right" unit="%"/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend/>
                    <Bar
                        yAxisId="left"
                        dataKey="最終價值"
                        fill="#0070f3"
                        radius={[4, 4, 0, 0]}
                    />
                    <Bar
                        yAxisId="right"
                        dataKey="增長百分比"
                        fill="#f59e0b"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
} 