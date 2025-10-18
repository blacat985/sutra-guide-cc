# 雜阿含經章節編號說明

## 收錄範圍

本站目前收錄雜阿含經卷二十一、卷二十二，共45經。

## 章節編號對應表

### 卷二十一（17經）
| 文件名 | 經號 | 經名 |
|--------|------|------|
| chapter-559.yml | 559 | 阿難答迦摩：禪定中的「不覺知」 |
| chapter-560.yml | 560 | 阿難所說的四種斷使之道 |
| chapter-561.yml | 561 | [待補充] |
| chapter-562.yml | 562 | [待補充] |
| chapter-563.yml | 563 | [待補充] |
| chapter-564.yml | 564 | [待補充] |
| chapter-565.yml | 565 | [待補充] |
| chapter-566.yml | 566 | [待補充] |
| chapter-567.yml | 567 | [待補充] |
| chapter-568.yml | 568 | [待補充] |
| chapter-569.yml | 569 | [待補充] |
| chapter-570.yml | 570 | [待補充] |
| chapter-571.yml | 571 | [待補充] |
| chapter-572.yml | 572 | [待補充] |
| chapter-573.yml | 573 | [待補充] |
| chapter-574.yml | 574 | [待補充] |
| chapter-575.yml | 575 | [待補充] |

### 卷二十二（28經）
| 文件名 | 經號 | 經名 |
|--------|------|------|
| chapter-576.yml | 576 | [待補充] |
| chapter-577.yml | 577 | [待補充] |
| chapter-578.yml | 578 | [待補充] |
| chapter-579.yml | 579 | [待補充] |
| chapter-580.yml | 580 | [待補充] |
| chapter-581.yml | 581 | [待補充] |
| chapter-582.yml | 582 | [待補充] |
| chapter-583.yml | 583 | [待補充] |
| chapter-584.yml | 584 | [待補充] |
| chapter-585.yml | 585 | [待補充] |
| chapter-586.yml | 586 | [待補充] |
| chapter-587.yml | 587 | [待補充] |
| chapter-588.yml | 588 | [待補充] |
| chapter-589.yml | 589 | [待補充] |
| chapter-590.yml | 590 | [待補充] |
| chapter-591.yml | 591 | [待補充] |
| chapter-592.yml | 592 | [待補充] |
| chapter-593.yml | 593 | [待補充] |
| chapter-594.yml | 594 | [待補充] |
| chapter-595.yml | 595 | [待補充] |
| chapter-596.yml | 596 | [待補充] |
| chapter-597.yml | 597 | [待補充] |
| chapter-598.yml | 598 | [待補充] |
| chapter-599.yml | 599 | [待補充] |
| chapter-600.yml | 600 | [待補充] |
| chapter-601.yml | 601 | [待補充] |
| chapter-602.yml | 602 | [待補充] |
| chapter-603.yml | 603 | [待補充] |

## YAML 文件結構範本

每個章節文件應包含以下字段：

```yaml
schemaVersion: "1.0"
sutraId: samyukta-agama
number: 559              # 全經經號（559-603）
volume: 21               # 卷號（21或22）
volumeTitle: 雜阿含經卷第二十一  # 卷標題
title: 第559經・阿難答迦摩：禪定中的「不覺知」  # 經文標題（格式：第XXX經・經名）
gist: |                  # 經文摘要
  [一句話概括本經重點]
originalText: |
  [原文內容]

  如是我聞：一時，佛住...

translation: |
  [白話翻譯]

  我曾親自聽聞佛陀這樣說...

annotations:
  - paragraph: 1
    text: [註釋內容]
    source: [註釋來源]

practiceInsights: |
  [修行啟發]
```

## 標題格式說明

標題格式統一為：`第XXX經・經名`

- 使用間隔號（・）分隔經號和經名
- 經號格式：`第559經`、`第560經`...
- 經名：簡潔描述經文主旨
- 範例：
  - `第559經・阿難答迦摩：禪定中的「不覺知」`
  - `第560經・阿難所說的四種斷使之道`

## 網址路由

- 卷二十一第1經（經號559）：`/samyukta-agama/559`
- 卷二十一第17經（經號575）：`/samyukta-agama/575`
- 卷二十二第1經（經號576）：`/samyukta-agama/576`
- 卷二十二第28經（經號603）：`/samyukta-agama/603`

## 導航顯示

在目錄中，章節會按卷分組顯示：

```
雜阿含經
├── 雜阿含經卷第二十一（17經）
│   ├── 第559經・阿難答迦摩：禪定中的「不覺知」
│   ├── 第560經・阿難所說的四種斷使之道
│   └── ...
└── 雜阿含經卷第二十二（28經）
    ├── 第576經・[經名]
    ├── 第577經・[經名]
    └── ...
```
