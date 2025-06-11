# 投資助手

一個純前端投資計算工具，用於退休規劃與 ETF 投資回報計算。

## 功能特點

- **退休計算器**：計算退休所需資金與每月儲蓄目標
- **ETF 投資計算**：預測 ETF 投資的長期回報
- **投資策略比較**：比較不同投資策略的效果
- **視覺化圖表**：直觀顯示投資增長情況
- **響應式設計**：適配各種設備尺寸

## 技術棧

- **React**：用於構建用戶界面
- **TypeScript**：提供類型安全
- **Tailwind CSS**：現代化 UI 樣式
- **Recharts**：數據可視化圖表
- **GSAP**：平滑動畫效果

## 安裝與運行

1. 克隆倉庫：
   ```bash
   git clone https://github.com/yourusername/investment-calculator.git
   cd investment-calculator
   ```

2. 安裝依賴：
   ```bash
   npm install
   ```

3. 啟動開發服務器：
   ```bash
   npm run dev
   ```

4. 訪問 `http://localhost:5173` 查看應用

## 使用指南

### 退休計算器

1. 輸入您的當前年齡、預期退休年齡和預期壽命
2. 設定退休後每月開支、當前儲蓄和投資回報率
3. 點擊計算按鈕查看結果

### ETF 投資計算器

1. 設定初始投資金額和每月定投金額
2. 調整預期年回報率、投資年數和基金費用率
3. 計算後查看投資增長圖表

### 投資策略比較

1. 選擇並配置不同的投資策略
2. 比較多種策略的長期表現
3. 透過圖表直觀了解各策略差異

## 項目結構

```
investment-calculator/
├── src/
│   ├── components/      # UI 組件
│   │   ├── charts/      # 圖表組件
│   │   ├── forms/       # 表單組件
│   │   ├── layout/      # 佈局組件
│   │   └── ui/          # 基礎 UI 組件
│   ├── utils/           # 工具函數
│   ├── types/           # TypeScript 類型定義
│   ├── App.tsx          # 主應用組件
│   └── main.tsx         # 入口文件
├── public/              # 靜態資源
└── package.json         # 項目配置
```

## 貢獻指南

1. Fork 倉庫
2. 創建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 開啟 Pull Request

## 許可證

MIT 許可證
