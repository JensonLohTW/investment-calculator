import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import type {YearlyData} from '../../types';
import {formatCurrency} from '../../utils/calculators';

interface InvestmentGrowthChartProps {
    data: YearlyData[];
    className?: string;
}

/**
 * 投資增長圖表組件
 *
 * 展示投資價值、投入金額和收益隨時間的變化
 *
 * @example
 * <InvestmentGrowthChart data={yearlyData} />
 */
export function InvestmentGrowthChart({data, className}: InvestmentGrowthChartProps) {
    const chartData = data.map(item => ({
        year: `第 ${item.year} 年`,
        總價值: item.value,
        投入金額: item.contributions,
        淨收益: item.gain,
    }));

    // 自定義 tooltip 格式化
    const CustomTooltip = ({active, payload, label}: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background p-3 border rounded-md shadow-md">
                    <p className="font-semibold">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={`item-${index}`} style={{color: entry.color}}>
                            {entry.name}: {formatCurrency(entry.value)}
                        </p>
                    ))}
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
                <LineChart
                    data={chartData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis
                        dataKey="year"
                        tick={{fontSize: 12}}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        tickFormatter={formatYAxis}
                        tick={{fontSize: 12}}
                    />
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend/>
                    <Line
                        type="monotone"
                        dataKey="總價值"
                        stroke="#0070f3"
                        strokeWidth={2}
                        activeDot={{r: 6}}
                    />
                    <Line
                        type="monotone"
                        dataKey="投入金額"
                        stroke="#28a745"
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="淨收益"
                        stroke="#f59e0b"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}