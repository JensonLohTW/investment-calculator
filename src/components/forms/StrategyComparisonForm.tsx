import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import type { InvestmentStrategy, ETFInvestmentFormData, ETFInvestmentResult } from '../../types';
import { calculateETFInvestment, calculateETFYearlyData, compareInvestmentStrategies } from '../../utils/calculators';

// 默認策略
const defaultStrategies: InvestmentStrategy[] = [
  {
    id: '1',
    name: '保守策略',
    formData: {
      initialInvestment: 100000,
      monthlyContribution: 5000,
      annualReturnRate: 0.05,
      years: 20,
      expenseRatio: 0.002,
    },
  },
  {
    id: '2',
    name: '平衡策略',
    formData: {
      initialInvestment: 100000,
      monthlyContribution: 5000,
      annualReturnRate: 0.08,
      years: 20,
      expenseRatio: 0.005,
    },
  },
  {
    id: '3',
    name: '積極策略',
    formData: {
      initialInvestment: 100000,
      monthlyContribution: 5000,
      annualReturnRate: 0.12,
      years: 20,
      expenseRatio: 0.008,
    },
  },
];

interface StrategyComparisonFormProps {
  onResultsCalculated?: (results: any) => void;
}

/**
 * 投資策略比較表單組件
 * 
 * 允許用戶比較不同的投資策略
 */
export function StrategyComparisonForm({ onResultsCalculated }: StrategyComparisonFormProps) {
  const [strategies, setStrategies] = useState<InvestmentStrategy[]>(defaultStrategies);
  const [currentStrategyId, setCurrentStrategyId] = useState<string>('1');

  // 處理表單輸入變更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, strategyId: string) => {
    const { name, value } = e.target;
    
    // 更新特定策略的表單數據
    setStrategies(prevStrategies => {
      return prevStrategies.map(strategy => {
        if (strategy.id === strategyId) {
          // 確保數值輸入為數字
          let parsedValue: number = 0;
          if (name === 'annualReturnRate' || name === 'expenseRatio') {
            parsedValue = parseFloat(value) / 100; // 將百分比轉換為小數
          } else {
            parsedValue = parseInt(value, 10) || 0;
          }
          
          return {
            ...strategy,
            formData: {
              ...strategy.formData,
              [name]: parsedValue,
            },
          };
        }
        return strategy;
      });
    });
  };

  // 修改策略名稱
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, strategyId: string) => {
    const { value } = e.target;
    
    setStrategies(prevStrategies => {
      return prevStrategies.map(strategy => {
        if (strategy.id === strategyId) {
          return {
            ...strategy,
            name: value,
          };
        }
        return strategy;
      });
    });
  };

  // 計算所有策略的結果
  const calculateResults = () => {
    const calculatedStrategies = strategies.map(strategy => {
      const {
        initialInvestment,
        monthlyContribution,
        annualReturnRate,
        years,
        expenseRatio,
      } = strategy.formData;

      // 計算投資結果
      const investmentResult = calculateETFInvestment(
        initialInvestment,
        monthlyContribution,
        annualReturnRate,
        years,
        expenseRatio
      );

      // 計算年度數據
      const yearlyData = calculateETFYearlyData(
        initialInvestment,
        monthlyContribution,
        annualReturnRate,
        years,
        expenseRatio
      );

      const result: ETFInvestmentResult = {
        ...investmentResult,
        yearlyData,
      };

      return {
        ...strategy,
        result,
      };
    });

    // 更新策略數據
    setStrategies(calculatedStrategies);

    // 計算比較結果
    const comparisonResults = compareInvestmentStrategies(
      calculatedStrategies.map(s => ({
        name: s.name,
        yearlyData: s.result!.yearlyData,
      }))
    );

    if (onResultsCalculated) {
      onResultsCalculated({
        strategies: calculatedStrategies,
        comparisonResults,
      });
    }
  };

  // 選擇當前編輯的策略
  const handleSelectStrategy = (id: string) => {
    setCurrentStrategyId(id);
  };

  // 獲取當前編輯的策略
  const getCurrentStrategy = () => {
    return strategies.find(s => s.id === currentStrategyId) || strategies[0];
  };

  const currentStrategy = getCurrentStrategy();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>投資策略比較</CardTitle>
        <CardDescription>比較不同投資策略的長期表現</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {strategies.map(strategy => (
            <Button
              key={strategy.id}
              variant={strategy.id === currentStrategyId ? 'default' : 'outline'}
              onClick={() => handleSelectStrategy(strategy.id)}
              className="text-sm"
            >
              {strategy.name}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">策略名稱</Label>
            <Input
              id="name"
              name="name"
              value={currentStrategy.name}
              onChange={(e) => handleNameChange(e, currentStrategy.id)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialInvestment">初始投資金額 (元)</Label>
              <Input
                id="initialInvestment"
                name="initialInvestment"
                type="number"
                min="0"
                value={currentStrategy.formData.initialInvestment}
                onChange={(e) => handleInputChange(e, currentStrategy.id)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">每月定投金額 (元)</Label>
              <Input
                id="monthlyContribution"
                name="monthlyContribution"
                type="number"
                min="0"
                value={currentStrategy.formData.monthlyContribution}
                onChange={(e) => handleInputChange(e, currentStrategy.id)}
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
                value={currentStrategy.formData.annualReturnRate * 100}
                onChange={(e) => handleInputChange(e, currentStrategy.id)}
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
                value={currentStrategy.formData.years}
                onChange={(e) => handleInputChange(e, currentStrategy.id)}
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
                value={currentStrategy.formData.expenseRatio * 100}
                onChange={(e) => handleInputChange(e, currentStrategy.id)}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={calculateResults} className="w-full">比較投資策略</Button>
      </CardFooter>
    </Card>
  );
} 