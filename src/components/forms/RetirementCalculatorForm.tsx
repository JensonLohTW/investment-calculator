import React, {useState} from 'react';
import {Input} from '../ui/Input';
import {Label} from '../ui/Label';
import {Button} from '../ui/Button';
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from '../ui/Card';
import type {RetirementFormData, RetirementCalculationResult} from '../../types';
import {calculateRetirementNeeds, calculateMonthlySavingsForRetirement, formatCurrency} from '../../utils/calculators';

// 默認表單數據
const defaultFormData: RetirementFormData = {
    currentAge: 30,
    retirementAge: 65,
    lifeExpectancy: 85,
    monthlyExpense: 50000,
    currentSavings: 500000,
    annualReturn: 0.07,
    inflationRate: 0.02,
};

interface RetirementCalculatorFormProps {
    onResultsCalculated?: (results: RetirementCalculationResult) => void;
}

/**
 * 退休計算器表單組件
 *
 * 允許用戶輸入退休計劃參數並計算所需儲蓄金額
 */
export function RetirementCalculatorForm({onResultsCalculated}: RetirementCalculatorFormProps) {
    const [formData, setFormData] = useState<RetirementFormData>(defaultFormData);
    const [results, setResults] = useState<RetirementCalculationResult | null>(null);

    // 處理輸入變更
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        // 確保數值輸入為數字
        let parsedValue: number | string = value;
        if (name === 'annualReturn' || name === 'inflationRate') {
            parsedValue = parseFloat(value) / 100; // 將百分比轉換為小數
        } else if (name !== 'name') {
            parsedValue = parseInt(value, 10) || 0;
        }

        setFormData({...formData, [name]: parsedValue});
    };

    // 計算結果
    const calculateResults = () => {
        const {
            currentAge,
            retirementAge,
            lifeExpectancy,
            monthlyExpense,
            currentSavings,
            annualReturn,
            inflationRate,
        } = formData;

        // 計算退休需求
        const totalNeeds = calculateRetirementNeeds(
            currentAge,
            retirementAge,
            lifeExpectancy,
            monthlyExpense,
            inflationRate
        );

        // 計算每月儲蓄需求
        const monthlySavings = calculateMonthlySavingsForRetirement(
            totalNeeds,
            currentAge,
            retirementAge,
            currentSavings,
            annualReturn
        );

        const calculationResults: RetirementCalculationResult = {
            totalNeeds,
            monthlySavings,
            yearsUntilRetirement: retirementAge - currentAge,
            retirementDuration: lifeExpectancy - retirementAge,
        };

        setResults(calculationResults);

        if (onResultsCalculated) {
            onResultsCalculated(calculationResults);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>退休計算器</CardTitle>
                <CardDescription>計算您需要的退休儲蓄金額及每月儲蓄目標</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentAge">目前年齡</Label>
                        <Input
                            id="currentAge"
                            name="currentAge"
                            type="number"
                            min="18"
                            max="100"
                            value={formData.currentAge}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="retirementAge">預計退休年齡</Label>
                        <Input
                            id="retirementAge"
                            name="retirementAge"
                            type="number"
                            min="40"
                            max="100"
                            value={formData.retirementAge}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lifeExpectancy">預期壽命</Label>
                        <Input
                            id="lifeExpectancy"
                            name="lifeExpectancy"
                            type="number"
                            min="50"
                            max="120"
                            value={formData.lifeExpectancy}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="monthlyExpense">退休後每月開支 (元)</Label>
                        <Input
                            id="monthlyExpense"
                            name="monthlyExpense"
                            type="number"
                            min="0"
                            value={formData.monthlyExpense}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="currentSavings">目前儲蓄 (元)</Label>
                        <Input
                            id="currentSavings"
                            name="currentSavings"
                            type="number"
                            min="0"
                            value={formData.currentSavings}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="annualReturn">預期年投資回報率 (%)</Label>
                        <Input
                            id="annualReturn"
                            name="annualReturn"
                            type="number"
                            min="0"
                            max="20"
                            step="0.1"
                            value={formData.annualReturn * 100}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="inflationRate">年通脹率 (%)</Label>
                        <Input
                            id="inflationRate"
                            name="inflationRate"
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={formData.inflationRate * 100}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {results && (
                    <div className="mt-6 p-4 bg-muted rounded-md space-y-3">
                        <h3 className="font-semibold text-lg">計算結果</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">退休所需總金額</p>
                                <p className="text-xl font-bold">{formatCurrency(results.totalNeeds)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">每月儲蓄目標</p>
                                <p className="text-xl font-bold">{formatCurrency(results.monthlySavings)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">距離退休時間</p>
                                <p className="text-xl font-bold">{results.yearsUntilRetirement} 年</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">退休後壽命</p>
                                <p className="text-xl font-bold">{results.retirementDuration} 年</p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button onClick={calculateResults} className="w-full">計算退休需求</Button>
            </CardFooter>
        </Card>
    );
} 