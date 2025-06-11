import {useState} from 'react'
import {AppLayout} from './components/layout/AppLayout'
import {PageLayout, Section} from './components/layout/PageLayout'
import {RetirementCalculatorForm} from './components/forms/RetirementCalculatorForm'
import {ETFInvestmentForm} from './components/forms/ETFInvestmentForm'
import {StrategyComparisonForm} from './components/forms/StrategyComparisonForm'
import {InvestmentGrowthChart} from './components/charts/InvestmentGrowthChart'
import {StrategyComparisonChart} from './components/charts/StrategyComparisonChart'
import type {
    RetirementCalculationResult,
    ETFInvestmentResult,
    YearlyData,
    StrategyComparisonResult
} from './types'

function App() {
    // 狀態管理
    const [retirementResults, setRetirementResults] = useState<RetirementCalculationResult | null>(null)
    const [etfResults, setEtfResults] = useState<ETFInvestmentResult | null>(null)
    const [comparisonResults, setComparisonResults] = useState<{
        strategies: any[],
        comparisonResults: StrategyComparisonResult[]
    } | null>(null)

    // 處理退休計算結果
    const handleRetirementCalculation = (results: RetirementCalculationResult) => {
        setRetirementResults(results)
    }

    // 處理 ETF 投資計算結果
    const handleEtfCalculation = (results: ETFInvestmentResult) => {
        setEtfResults(results)
    }

    // 處理策略比較結果
    const handleComparisonCalculation = (results: any) => {
        setComparisonResults(results)
    }

    return (
        <AppLayout>
            <PageLayout pageTitle="投資助手">
                <Section
                    id="retirement"
                    title="退休計算"
                    description="計算您需要的退休儲蓄金額與每月儲蓄目標"
                >
                    <RetirementCalculatorForm onResultsCalculated={handleRetirementCalculation}/>
                </Section>

                <Section
                    id="etf"
                    title="ETF 投資計算"
                    description="計算長期 ETF 投資的潛在收益"
                >
                    <div className="space-y-6">
                        <ETFInvestmentForm onResultsCalculated={handleEtfCalculation}/>

                        {etfResults && (
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4">投資價值成長圖表</h3>
                                <InvestmentGrowthChart data={etfResults.yearlyData}/>
                            </div>
                        )}
                    </div>
                </Section>

                <Section
                    id="comparison"
                    title="投資策略比較"
                    description="比較不同投資策略的長期表現"
                >
                    <div className="space-y-6">
                        <StrategyComparisonForm onResultsCalculated={handleComparisonCalculation}/>

                        {comparisonResults && (
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4">策略比較圖表</h3>
                                <StrategyComparisonChart data={comparisonResults.comparisonResults}/>

                                <h3 className="text-xl font-semibold mt-8 mb-4">各策略投資成長</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {comparisonResults.strategies.map((strategy) => (
                                        <div key={strategy.id} className="border rounded-lg p-4">
                                            <h4 className="text-lg font-semibold mb-2">{strategy.name}</h4>
                                            <InvestmentGrowthChart data={strategy.result.yearlyData}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Section>
            </PageLayout>
        </AppLayout>
    )
}

export default App
