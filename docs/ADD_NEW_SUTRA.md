# 添加新經書指南

本文檔說明如何在虛廣禪苑網站中添加新的佛經經書。

## 目錄
1. [準備工作](#準備工作)
2. [步驟一：更新 Schema（如需要）](#步驟一更新-schema如需要)
3. [步驟二：創建經書元數據](#步驟二創建經書元數據)
4. [步驟三：創建章節內容](#步驟三創建章節內容)
5. [步驟四：註冊經書到系統](#步驟四註冊經書到系統)
6. [步驟五：驗證和測試](#步驟五驗證和測試)
7. [範例：雜阿含經](#範例雜阿含經)

---

## 準備工作

在開始之前，請確認以下信息：

- [ ] 經書的基本信息（標題、英文名、傳承、譯者等）
- [ ] 章節總數和編號規則（從 0 開始、從 1 開始、或其他起始數字）
- [ ] 是否為多卷經書（如《雜阿含經》）
- [ ] 內容來源和版權歸屬信息
- [ ] 至少 1-2 章的完整內容作為模板

---

## 步驟一：更新 Schema（如需要）

### 1.1 檢查是否需要新的 tradition 類型

查看 `specs/001-v1-0-yaml/contracts/sutra-meta.schema.json`：

```json
"tradition": {
  "type": "string",
  "enum": ["Mahayana", "Theravada", "Vajrayana", "Early Buddhism", "Other"]
}
```

如果需要新的傳承類型：

1. 編輯 `specs/001-v1-0-yaml/contracts/sutra-meta.schema.json`
2. 在 `tradition.enum` 中添加新類型
3. 更新 `src/types/sutra.ts` 中的 `tradition` 類型定義

### 1.2 檢查章節編號需求

- **標準編號（從 1 開始）**：無需特殊設置
- **從 0 開始**（如金剛經）：設置 `startChapter: 0`
- **非連續編號**（如雜阿含經 559-603）：設置 `startChapter: 559`

### 1.3 多卷經書支持

如果經書分多卷，章節 YAML 需要包含：

```yaml
volume: 21              # 卷號
volumeTitle: 雜阿含經卷第二十一  # 卷標題
```

這些欄位已在 `chapter.schema.json` 中定義，無需修改。

---

## 步驟二：創建經書元數據

### 2.1 創建經書目錄

在 `public/content/` 下創建新目錄：

```bash
mkdir -p public/content/[經書ID]
```

**命名規則**：
- 使用小寫英文和連字符
- 例如：`diamond-sutra`、`heart-sutra`、`samyukta-agama`

### 2.2 創建 meta.yml

在經書目錄下創建 `meta.yml`：

```yaml
schemaVersion: "1.0"
id: [經書ID]                    # 與目錄名相同
title: [中文標題]
titleEn: [英文標題]              # 可選
tradition: [傳承類型]            # Mahayana, Theravada, Vajrayana, Early Buddhism, Other
translator: [譯者名稱]
translatorAttribution: [譯者完整署名]
source: [來源文獻]
sourceAttribution: [來源完整署名]
description: |                  # 可選，經書簡介
  [多行描述文字]
chapters: [章節總數]            # 整數
startChapter: [起始章節號]      # 可選，預設為 1（金剛經為 0）
```

### 2.3 範例：雜阿含經 meta.yml

```yaml
schemaVersion: "1.0"
id: samyukta-agama
title: 雜阿含經
titleEn: Samyukta Agama
tradition: Early Buddhism
translator: 求那跋陀羅
translatorAttribution: 劉宋天竺三藏求那跋陀羅譯
source: 大正新修大藏經第2冊 No.99
sourceAttribution: Taishō Tripitaka, Vol. 2, No. 99
description: |
  雜阿含經為早期佛教根本經典之一，與巴利語《相應部》對應，收錄佛陀及弟子們的教說，
  按主題分類編排，內容涵蓋蘊、處、界、緣起、聖諦等核心教義，為南傳與北傳佛教共同
  依據的重要經典。本站目前收錄卷二十一（第559-575經，共17經）、卷二十二（第576-603經，共28經）。
chapters: 45
startChapter: 559
```

### 2.4 驗證 meta.yml

運行驗證腳本：

```bash
node test-schema.js
```

確保沒有錯誤信息。

---

## 步驟三：創建章節內容

### 3.1 章節檔案命名

章節檔案命名規則：`chapter-[章節號].yml`

- 標準編號：`chapter-1.yml`, `chapter-2.yml`, ...
- 從 0 開始：`chapter-0.yml`, `chapter-1.yml`, ...
- 非連續編號：`chapter-559.yml`, `chapter-560.yml`, ...

### 3.2 章節 YAML 結構

#### 基本結構（單卷經書）

```yaml
schemaVersion: "1.0"
sutraId: [經書ID]
number: [章節號]
title: [章節標題]
gist: |                        # 可選，章節摘要
  [一句話概括本章重點]
originalText: |               # 必填，原文
  [原文內容]
translation: |                # 必填，白話翻譯
  [翻譯內容]
annotations:                  # 可選，註解
  - paragraph: 1
    text: [註解內容]
    source: [註解來源]
practiceInsights: |           # 可選，修行心得
  [修行指導內容]
illustrations:                # 可選，插圖
  - url: /images/[圖檔名].jpg
    alt: [圖片替代文字]
    caption: [圖片說明]        # 可選
podcastTitle: [播客標題]      # 可選
podcastUrl: [播客連結]        # 可選
transcript: |                 # 可選，播客文字稿
  [逐字稿內容]
sourceAttribution: [來源署名] # 可選
```

#### 多卷經書結構

在基本結構基礎上添加：

```yaml
volume: [卷號]                # 整數，如 21
volumeTitle: [卷標題]         # 如「雜阿含經卷第二十一」
```

### 3.3 內容撰寫指南

#### originalText（原文）
- 保持原文的分段結構
- 使用 `|` 保留換行格式
- 例如：
```yaml
originalText: |
  如是我聞：一時，佛住舍衛國祇樹給孤獨園。

  爾時，世尊告諸比丘：「當觀色無常...」
```

#### translation（白話翻譯）
- 使用現代白話文
- 保持與原文對應的分段
- 力求易懂但不失原意

#### practiceInsights（修行心得）
- 支援 Markdown 格式
- 可使用標題、列表、強調等
- 例如：
```yaml
practiceInsights: |
  這部經典教導我們透過觀察五蘊的無常性來達到解脫。

  **修行要點**：
  - **正觀無常**：親自體驗五蘊的生滅變化
  - **生起厭離**：看清執著的過患
  - **喜貪盡**：對世間貪愛逐漸消除
  - **心解脫**：達到心靈的徹底自由
```

### 3.4 範例：雜阿含經 chapter-559.yml

```yaml
schemaVersion: "1.0"
sutraId: samyukta-agama
number: 559
volume: 21
volumeTitle: 雜阿含經卷第二十一
title: 第559經
gist: 此經說明佛陀教導比丘觀察五蘊無常的修行方法。
originalText: |
  如是我聞：一時，佛住舍衛國祇樹給孤獨園。

  爾時，世尊告諸比丘：「當觀色無常，如是觀者，則為正觀。正觀者，則生厭離；厭離者，喜貪盡；喜貪盡者，說心解脫。」

  「如是觀受、想、行、識無常，如是觀者，則為正觀。正觀者，則生厭離；厭離者，喜貪盡；喜貪盡者，說心解脫。」

translation: |
  我曾親自聽聞佛陀這樣說：有一次，佛陀住在舍衛國的祇樹給孤獨園。

  那時，世尊告訴諸位比丘說：「應當觀察色法的無常性，這樣觀察才是正確的觀法。正確觀察的人，就會生起厭離心；有厭離心的人，貪愛喜樂就會消盡；貪愛喜樂消盡的人，可以說是心得解脫了。」

practiceInsights: |
  這部經典教導我們透過觀察五蘊（色、受、想、行、識）的無常性來達到解脫。

  **修行要點**：
  - **正觀無常**：不是概念理解，而是在禪定中親自體驗五蘊的生滅變化
  - **生起厭離**：看清執著的過患，自然生起放下之心
  - **喜貪盡**：對世間的貪愛和喜樂逐漸消除
  - **心解脫**：最終達到心靈的徹底自由
```

---

## 步驟四：註冊經書到系統

### 4.1 更新 useSutraData.ts

編輯 `src/hooks/useSutraData.ts`，在 `sutraIds` 陣列中添加新經書 ID：

```typescript
const sutraIds = [
  'diamond-sutra',
  'samyukta-agama',
  '[新經書ID]',  // 添加這行
];
```

### 4.2 確認 TypeScript 類型

檢查 `src/types/sutra.ts` 和 `src/types/chapter.ts` 是否需要更新：

- 如果添加了新的 tradition 類型，更新 `Sutra` interface
- 如果添加了新的章節欄位，更新 `Chapter` interface

---

## 步驟五：驗證和測試

### 5.1 Schema 驗證

運行 schema 驗證：

```bash
node test-schema.js
```

預期輸出：
```
✅ All tests passed!
✅ meta.yml is valid
✅ chapter-[N].yml is valid
```

### 5.2 本地開發伺服器測試

啟動開發伺服器：

```bash
npm run dev
```

### 5.3 手動測試檢查清單

使用 Playwright 或瀏覽器進行以下測試：

#### 首頁測試
- [ ] 經書卡片顯示正確（標題、英文名、描述）
- [ ] 「閱讀經文」按鈕連結正確（應跳轉到 startChapter 指定的章節）

#### 目錄頁測試
- [ ] 經書標題顯示正確
- [ ] 章節列表完整顯示
- [ ] 單卷經書：章節列表為簡單清單
- [ ] 多卷經書：章節按卷分組，可展開/收合

#### 章節頁測試
- [ ] 章節標題顯示
- [ ] 原文正確顯示
- [ ] 白話翻譯正確顯示
- [ ] 註解（如有）正確顯示
- [ ] 修行心得（如有）正確顯示且 Markdown 渲染正確
- [ ] 插圖（如有）正確載入
- [ ] 播客連結（如有）可點擊
- [ ] 上一章/下一章導航按鈕正常

#### 導航測試
- [ ] 從首頁點擊經書卡片進入正確章節
- [ ] 目錄中點擊章節跳轉正確
- [ ] 當前章節在目錄中高亮顯示
- [ ] 多卷經書：當前章節所在卷自動展開

### 5.4 Playwright 自動化測試範例

```bash
# 導航到首頁
browser_navigate http://localhost:5173

# 截取快照確認經書卡片顯示
browser_snapshot

# 點擊閱讀經文按鈕
browser_click [經書卡片的「閱讀經文」按鈕]

# 確認跳轉到正確章節
# URL 應為 http://localhost:5173/[經書ID]/[startChapter]

# 截取快照確認章節內容顯示
browser_snapshot

# 檢查控制台錯誤
browser_console_messages
```

### 5.5 構建測試

運行完整構建和驗證：

```bash
./verify.sh
```

這會執行：
- TypeScript 類型檢查
- 生產環境構建
- Lint 檢查

---

## 範例：雜阿含經

以下是完整的雜阿含經添加過程：

### 1. 更新 Schema

添加 "Early Buddhism" 到 `sutra-meta.schema.json`：

```json
"tradition": {
  "enum": ["Mahayana", "Theravada", "Vajrayana", "Early Buddhism", "Other"]
}
```

### 2. 創建目錄結構

```bash
mkdir -p public/content/samyukta-agama
```

### 3. 創建 meta.yml

```yaml
schemaVersion: "1.0"
id: samyukta-agama
title: 雜阿含經
titleEn: Samyukta Agama
tradition: Early Buddhism
translator: 求那跋陀羅
translatorAttribution: 劉宋天竺三藏求那跋陀羅譯
source: 大正新修大藏經第2冊 No.99
sourceAttribution: Taishō Tripitaka, Vol. 2, No. 99
description: |
  雜阿含經為早期佛教根本經典之一...
chapters: 45
startChapter: 559
```

### 4. 創建章節檔案

創建 `chapter-559.yml` 到 `chapter-603.yml`（共 45 個檔案）

每個檔案包含：
- 基本元數據（sutraId, number, title）
- 卷資訊（volume, volumeTitle）
- 內容（originalText, translation, practiceInsights）

### 5. 註冊到系統

在 `src/hooks/useSutraData.ts` 添加：

```typescript
const sutraIds = ['diamond-sutra', 'samyukta-agama'];
```

### 6. 測試

運行所有測試步驟，確認：
- ✅ Schema 驗證通過
- ✅ 首頁顯示雜阿含經卡片
- ✅ 點擊「閱讀經文」跳轉到 chapter 559
- ✅ 目錄按卷分組顯示（卷二十一、卷二十二）
- ✅ 章節內容正確顯示
- ✅ 導航功能正常

---

## 常見問題

### Q1: 章節編號不從 1 開始怎麼辦？

A: 在 `meta.yml` 中設置 `startChapter` 欄位。例如雜阿含經從 559 開始：

```yaml
startChapter: 559
chapters: 45  # 共 45 章，從 559 到 603
```

### Q2: 如何處理多卷經書？

A: 在每個章節的 YAML 中添加卷資訊：

```yaml
volume: 21
volumeTitle: 雜阿含經卷第二十一
```

系統會自動在目錄中按卷分組並提供展開/收合功能。

### Q3: 修行心得支援什麼格式？

A: 支援 Markdown 格式，包括：
- 標題（`**粗體**`）
- 列表（`-` 或 `1.`）
- 強調（`*斜體*`）
- 段落分隔（空行）

### Q4: 插圖放在哪裡？

A: 插圖應放在 `public/images/` 目錄下，然後在 YAML 中引用：

```yaml
illustrations:
  - url: /images/diamond-sutra-ch1.jpg
    alt: 金剛經第一章插圖
    caption: 須菩提請法
```

### Q5: 如何驗證 YAML 格式正確？

A: 運行 `node test-schema.js`，它會驗證所有 meta.yml 和 chapter YAML 檔案。

---

## 檢查清單

完成以下所有項目才算完整添加新經書：

- [ ] Schema 更新（如需要）
- [ ] 創建經書目錄和 meta.yml
- [ ] 創建所有章節 YAML 檔案
- [ ] 在 useSutraData.ts 註冊經書
- [ ] Schema 驗證通過
- [ ] 首頁顯示測試
- [ ] 目錄導航測試
- [ ] 章節內容顯示測試
- [ ] 上下章導航測試
- [ ] 構建測試通過（`./verify.sh`）
- [ ] 更新 README 或相關文檔（如需要）

---

## 參考資料

- [Specification: spec.md](../specs/001-v1-0-yaml/spec.md)
- [Data Model: data-model.md](../specs/001-v1-0-yaml/data-model.md)
- [Sutra Meta Schema](../specs/001-v1-0-yaml/contracts/sutra-meta.schema.json)
- [Chapter Schema](../specs/001-v1-0-yaml/contracts/chapter.schema.json)
- [Testing Guide: quickstart.md](../specs/001-v1-0-yaml/quickstart.md)
- [CLAUDE.md Development Guidelines](../CLAUDE.md)
