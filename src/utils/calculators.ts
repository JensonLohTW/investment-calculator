/**
 * 退休金計算工具
 */

/**
 * 計算未來需要的退休金總額
 *
 * @param currentAge 當前年齡
 * @param retirementAge 退休年齡
 * @param lifeExpectancy 預期壽命
 * @param monthlyExpense 退休後每月開支
 * @param inflationRate 年通脹率 (小數形式，例如 0.03 表示 3%)
 * @returns 退休金總需求
 */
export function calculateRetirementNeeds(
    currentAge: number,
    retirementAge: number,
    lifeExpectancy: number,
    monthlyExpense: number,
    inflationRate: number
): number {
    const yearsUntilRetirement = retirementAge - currentAge;
    const retirementDuration = lifeExpectancy - retirementAge;

    // 計算退休時的月支出（考慮通脹）
    const monthlyExpenseAtRetirement = monthlyExpense * Math.pow(1 + inflationRate, yearsUntilRetirement);

    // 計算退休期間的總支出
    let totalNeeds = 0;
    for (let year = 0; year < retirementDuration; year++) {
        const yearlyExpense = monthlyExpenseAtRetirement * 12 * Math.pow(1 + inflationRate, year);
        totalNeeds += yearlyExpense;
    }

    return totalNeeds;
}

/**
 * 計算達到退休目標需要的每月儲蓄
 *
 * @param retirementNeeds 退休金總需求
 * @param currentAge 當前年齡
 * @param retirementAge 退休年齡
 * @param currentSavings 當前儲蓄
 * @param annualReturn 預期年投資回報率 (小數形式，例如 0.07 表示 7%)
 * @returns 每月需要儲蓄的金額
 */
export function calculateMonthlySavingsForRetirement(
    retirementNeeds: number,
    currentAge: number,
    retirementAge: number,
    currentSavings: number,
    annualReturn: number
): number {
    const yearsUntilRetirement = retirementAge - currentAge;
    const monthsUntilRetirement = yearsUntilRetirement * 12;
    const monthlyReturnRate = Math.pow(1 + annualReturn, 1 / 12) - 1;

    // 當前儲蓄在退休時的價值
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + annualReturn, yearsUntilRetirement);

    // 還需要儲蓄的金額
    const additionalNeeds = retirementNeeds - futureValueOfCurrentSavings;

    if (additionalNeeds <= 0) {
        return 0; // 當前儲蓄已足夠
    }

    // 計算每月需要儲蓄的金額
    // 使用未來值公式：FV = PMT * ((1 + r)^n - 1) / r
    // 解出 PMT：PMT = FV * r / ((1 + r)^n - 1)
    const monthlySavings = additionalNeeds * monthlyReturnRate /
        (Math.pow(1 + monthlyReturnRate, monthsUntilRetirement) - 1);

    return monthlySavings;
}

/**
 * ETF 投資計算工具
 */

/**
 * 計算 ETF 投資的未來價值
 *
 * @param initialInvestment 初始投資金額
 * @param monthlyContribution 每月定投金額
 * @param annualReturnRate 年回報率 (小數形式，例如 0.08 表示 8%)
 * @param years 投資年數
 * @param expenseRatio 基金費用率 (小數形式，例如 0.0025 表示 0.25%)
 * @returns 投資終值、總投入資金、淨收益
 */
export function calculateETFInvestment(
    initialInvestment: number,
    monthlyContribution: number,
    annualReturnRate: number,
    years: number,
    expenseRatio: number
): { finalValue: number; totalContributions: number; totalGain: number } {
    const monthlyReturnRate = Math.pow(1 + annualReturnRate - expenseRatio, 1 / 12) - 1;
    const months = years * 12;

    let value = initialInvestment;
    let totalContributions = initialInvestment;

    for (let month = 1; month <= months; month++) {
        value = value * (1 + monthlyReturnRate) + monthlyContribution;
        totalContributions += monthlyContribution;
    }

    return {
        finalValue: value,
        totalContributions,
        totalGain: value - totalContributions,
    };
}

/**
 * 計算 ETF 投資的年度數據（用於圖表顯示）
 *
 * @param initialInvestment 初始投資金額
 * @param monthlyContribution 每月定投金額
 * @param annualReturnRate 年回報率 (小數形式，例如 0.08 表示 8%)
 * @param years 投資年數
 * @param expenseRatio 基金費用率 (小數形式，例如 0.0025 表示 0.25%)
 * @returns 包含每年數據的陣列
 */
export function calculateETFYearlyData(
    initialInvestment: number,
    monthlyContribution: number,
    annualReturnRate: number,
    years: number,
    expenseRatio: number
): Array<{ year: number; value: number; contributions: number; gain: number }> {
    const monthlyReturnRate = Math.pow(1 + annualReturnRate - expenseRatio, 1 / 12) - 1;
    const data = [];

    let value = initialInvestment;
    let totalContributions = initialInvestment;

    // 添加初始年份（第0年）
    data.push({
        year: 0,
        value: initialInvestment,
        contributions: initialInvestment,
        gain: 0,
    });

    for (let year = 1; year <= years; year++) {
        // 計算該年的12個月
        for (let month = 1; month <= 12; month++) {
            value = value * (1 + monthlyReturnRate) + monthlyContribution;
            totalContributions += monthlyContribution;
        }

        // 添加年度數據
        data.push({
            year,
            value,
            contributions: totalContributions,
            gain: value - totalContributions,
        });
    }

    return data;
}

/**
 * 比較工具
 */

/**
 * 比較不同投資策略
 *
 * @param strategies 投資策略陣列，每個策略包含名稱和年度數據
 * @returns 比較結果，包含每個策略的最終值和增長百分比
 */
export function compareInvestmentStrategies(
    strategies: Array<{
        name: string;
        yearlyData: Array<{ year: number; value: number; contributions: number; gain: number }>;
    }>
): Array<{ name: string; finalValue: number; growthPercentage: number }> {
    return strategies.map(strategy => {
        const initialValue = strategy.yearlyData[0].value;
        const finalValue = strategy.yearlyData[strategy.yearlyData.length - 1].value;
        const growthPercentage = ((finalValue - initialValue) / initialValue) * 100;

        return {
            name: strategy.name,
            finalValue,
            growthPercentage,
        };
    });
}

/**
 * 格式化貨幣
 *
 * @param value 數值
 * @param locale 地區設定 (預設為 'zh-TW')
 * @param currency 貨幣代碼 (預設為 'TWD')
 * @returns 格式化後的貨幣字符串
 */
export function formatCurrency(
    value: number,
    locale: string = 'zh-TW',
    currency: string = 'TWD'
): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
} 