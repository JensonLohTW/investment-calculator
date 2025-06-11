import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import type { ETFInvestmentFormData, ETFInvestmentResult } from '../../types';
import { calculateETFInvestment, calculateETFYearlyData, formatCurrency } from '../../utils/calculators';

// 默認表單數據
const defaultFormData: ETFInvestmentFormData = {
  initialInvestment: 100000,
  monthlyContribution: 10000,
  annualReturnRate: 0.08,
  years: 20,
  expenseRatio: 0.0025,
};

interface ETFInvestmentFormProps {
  onResultsCalculated?: (results: ETFInvestmentResult) => void;
}

/**
 * ETF 投資計算器表單組件
 * 
 * 允許用戶輸入 ETF 投資參數並計算預期投資回報
 */
export function ETFInvestmentForm({ onResultsCalculated }: ETFInvestmentFormProps) {
  const [formData, setFormData] = useState<ETFInvestmentFormData>(defaultFormData);
  const [results, setResults] = useState<ETFInvestmentResult | null>(null);

  // 處理輸入變更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // 確保數值輸入為數字
    let parsedValue: number = 0;
    if (name === 'annualReturnRate' || name === 'expenseRatio') {
      parsedValue = parseFloat(value) / 100; // 將百分比轉換為小數
    } else {
      parsedValue = parseInt(value, 10) || 0;
    }
    
    setFormData({ ...formData, [name]: parsedValue });
  };

  // 計算結果
  const calculateResults = () => {
    const {
      initialInvestment,
      monthlyContribution,
      annualReturnRate,
      years,
      expenseRatio,
    } = formData;

    // 計算投資結果
    const investmentResult = calculateETFInvestment(
      initialInvestment,
      monthlyContribution,
      annualReturnRate,
      years,
      expenseRatio
    );

    // 計算年度數據（用於圖表）
    const yearlyData = calculateETFYearlyData(
      initialInvestment,
      monthlyContribution,
      annualReturnRate,
      years,
      expenseRatio
    );

    const calculationResults: ETFInvestmentResult = {
      ...investmentResult,
      yearlyData,
    };

    setResults(calculationResults);
    
    if (onResultsCalculated) {
      onResultsCalculated(calculationResults);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ETF 投資計算器</CardTitle>
        <CardDescription>計算您的 ETF 投資長期收益</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initialInvestment">初始投資金額 (元)</Label>
            <Input
              id="initialInvestment"
              name="initialInvestment"
              type="number"
              min="0"
              value={formData.initialInvestment}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">每月定投金額 (元)</Label>
            <Input
              id="monthlyContribution"
              name="monthlyContribution"
              type="number"
              min="0"
              value={formData.monthlyContribution}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annualReturnRate">預期年回報率 (%)</Label>
            <Input
              id="annualReturnRate"
              name="annualReturnRate"
              type="number"
              min="0"
              max="30"
              step="0.1"
              value={formData.annualReturnRate * 100}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="years">投資年數</Label>
            <Input
              id="years"
              name="years"
              type="number"
              min="1"
              max="50"
              value={formData.years}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expenseRatio">基金費用率 (%)</Label>
            <Input
              id="expenseRatio"
              name="expenseRatio"
              type="number"
              min="0"
              max="2"
              step="0.01"
              value={formData.expenseRatio * 100}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {results && (
          <div className="mt-6 p-4 bg-muted rounded-md space-y-3">
            <h3 className="font-semibold text-lg">計算結果</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">最終投資價值</p>
                <p className="text-xl font-bold">{formatCurrency(results.finalValue)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">總投入金額</p>
                <p className="text-xl font-bold">{formatCurrency(results.totalContributions)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">總收益</p>
                <p className="text-xl font-bold">{formatCurrency(results.totalGain)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">收益率</p>
                <p className="text-xl font-bold">
                  {((results.totalGain / results.totalContributions) * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={calculateResults} className="w-full">計算 ETF 投資收益</Button>
      </CardFooter>
    </Card>
  );
} 