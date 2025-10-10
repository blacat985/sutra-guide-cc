# 本地驗證 GitHub Pages 部署指南

在推送到 GitHub 之前，請按照以下步驟驗證代碼，避免 GitHub Actions 失敗。

## 1. 執行 TypeScript 類型檢查

這會捕獲所有 TypeScript 編譯錯誤（與 GitHub Actions 使用相同的檢查）：

```bash
npm run build
```

**如果成功：** 您會看到 `✓ built in X.XXs`
**如果失敗：** 會顯示具體的錯誤信息（例如：重複的 _dark 屬性、未使用的變量等）

### 常見錯誤類型：

- ❌ `TS17001: JSX elements cannot have multiple attributes with the same name` - 重複的屬性
- ❌ `TS6196: 'X' is declared but never used` - 未使用的變量/介面
- ❌ `TS2322: Type 'X' is not assignable to type 'Y'` - 類型不匹配

## 2. 執行 Linting 檢查

檢查代碼風格和潛在問題：

```bash
npm run lint
```

## 3. 預覽生產構建

構建完成後，可以本地預覽生產版本（模擬 GitHub Pages 環境）：

```bash
npm run preview
```

這會啟動一個本地服務器，讓您可以測試生產構建的實際表現。

## 4. 測試 GitHub Pages 的路徑問題

GitHub Pages 部署在子路徑 `/sutra-guide-cc/`，確保：

1. 檢查 `vite.config.ts` 中的 `base` 設置：
   ```typescript
   base: '/sutra-guide-cc/',
   ```

2. 檢查 `src/main.tsx` 中的 router basename：
   ```typescript
   basename="/sutra-guide-cc"
   ```

3. 確保所有資源路徑使用 `import.meta.env.BASE_URL`

## 5. 完整的推送前檢查清單

在執行 `git push` 之前：

- [ ] ✅ `npm run build` 成功
- [ ] ✅ `npm run lint` 無錯誤
- [ ] ✅ `npm run preview` 可以正常瀏覽
- [ ] ✅ 所有功能在預覽版本中正常運作
- [ ] ✅ 檢查瀏覽器控制台無錯誤

## 6. 自動化檢查（可選）

創建一個 Git pre-commit hook 來自動執行這些檢查：

```bash
# .git/hooks/pre-commit
#!/bin/sh

echo "Running TypeScript build..."
npm run build || exit 1

echo "Running linter..."
npm run lint || exit 1

echo "All checks passed! ✅"
```

然後設置執行權限：
```bash
chmod +x .git/hooks/pre-commit
```

## 7. 快速驗證腳本

創建一個快速驗證腳本 `verify.sh`：

```bash
#!/bin/bash

echo "🔍 Starting verification..."

echo "📦 Building production bundle..."
npm run build || { echo "❌ Build failed!"; exit 1; }

echo "🔧 Running linter..."
npm run lint || { echo "❌ Linting failed!"; exit 1; }

echo "✅ All checks passed! Ready to push."
```

使用方法：
```bash
chmod +x verify.sh
./verify.sh
git push  # 只有在驗證成功後才推送
```

## 重點提示

### 為什麼本地開發可以跑，但 GitHub Pages 失敗？

1. **開發模式 vs 生產模式**
   - `npm run dev`: 使用寬鬆的錯誤處理，只顯示警告
   - `npm run build`: 使用嚴格的 TypeScript 編譯，任何錯誤都會導致失敗

2. **TypeScript 配置差異**
   - 本地開發可能跳過某些檢查以提高速度
   - 生產構建執行完整的類型檢查

3. **路徑問題**
   - 本地開發: 路徑是 `/`
   - GitHub Pages: 路徑是 `/sutra-guide-cc/`

### 最佳實踐

1. **每次提交前執行 `npm run build`**
2. **修復所有警告**（即使不影響開發環境）
3. **使用 TypeScript 嚴格模式**
4. **定期清理未使用的代碼和導入**

---

💡 **小技巧**: 可以將 `npm run build` 添加到您的工作流程中：

```bash
# 修改代碼
git add .
npm run build  # 先驗證
git commit -m "..."
git push
```
