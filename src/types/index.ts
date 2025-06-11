/**
 * 退休計算器相關類型
 */

// 退休計算表單數據
export interface RetirementFormData {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  monthlyExpense: number;
  currentSavings: number;
  annualReturn: number;
  inflationRate: number;
}

// 退休計算結果
export interface RetirementCalculationResult {
  totalNeeds: number;
  monthlySavings: number;
  yearsUntilRetirement: number;
  retirementDuration: number;
}

/**
 * ETF 投資相關類型
 */

// ETF 投資表單數據
export interface ETFInvestmentFormData {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturnRate: number;
  years: number;
  expenseRatio: number;
}

// ETF 投資計算結果
export interface ETFInvestmentResult {
  finalValue: number;
  totalContributions: number;
  totalGain: number;
  yearlyData: YearlyData[];
}

// 年度數據
export interface YearlyData {
  year: number;
  value: number;
  contributions: number;
  gain: number;
}

/**
 * 投資策略比較相關類型
 */

// 投資策略
export interface InvestmentStrategy {
  id: string;
  name: string;
  formData: ETFInvestmentFormData;
  result?: ETFInvestmentResult;
}

// 投資策略比較結果
export interface StrategyComparisonResult {
  name: string;
  finalValue: number;
  growthPercentage: number;
}

/**
 * 圖表相關類型
 */

// 圖表數據點
export interface ChartDataPoint {
  x: number | string;
  y: number;
}

// 圖表數據系列
export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
} 