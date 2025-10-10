#!/bin/bash

# 本地驗證腳本 - 在推送到 GitHub 之前執行
# 使用方法: ./verify.sh

set -e  # 遇到錯誤立即退出

echo "🔍 開始驗證..."
echo ""

# 1. TypeScript 類型檢查和生產構建
echo "📦 執行生產構建（TypeScript 類型檢查 + Vite 構建）..."
npm run build

echo ""
echo "✅ 構建成功！"
echo ""

# 2. Linting 檢查
echo "🔧 執行 Linting 檢查..."
npm run lint

echo ""
echo "✅ Linting 通過！"
echo ""

# 3. 顯示構建產物大小
echo "📊 構建產物大小："
ls -lh dist/assets/ | tail -n +2

echo ""
echo "🎉 所有檢查通過！可以安全推送到 GitHub。"
echo ""
echo "💡 下一步："
echo "   git add ."
echo "   git commit -m \"your message\""
echo "   git push"
