# AI法規制ニュース：全監視ソース一覧 (マスターリスト)
最終更新: 2025-12-24

このリストは、調査で特定された**すべての情報源**を網羅しています。
現在システムに実装されているかどうかのステータス（✅実装済 / 🚧未実装）も記載しています。

## 📊 ステータス概要
- **✅ 実装済 (RSS)**: 24件 (即時監視中)
- **🚧 未実装 (API)**: 7件 (GASでの実装検討中)
- **🚧 未実装 (スクレイピング)**: 9件 (技術的難易度高)

---

## 1. ✅ 実装済：RSSフィード (24件)
GASシステムで現在自動取得・AIフィルター処理が稼働しているソースです。

### 🌏 グローバル・国際
| フィード名 | URL | 監視理由 |
|------------|-----|----------|
| **IAPP News** | https://iapp.org/rss/news/ | 世界最大のプライバシー協会。最新動向の網羅。 |
| **IAPP Daily Dashboard** | https://iapp.org/rss/daily-dashboard/ | 世界中のテック規制ニュースのキュレーション。 |
| **World Economic Forum** | https://www.weforum.org/rss/ | ダボス会議主催団体。国際的なAIガバナンス提言。 |
| **ISO/IEC 42001** | https://www.iso.org/iso/rss.xml... | ISO 42001 (AIマネジメントシステム) の標準化動向。 |
| **IEEE Standards** | https://standards.ieee.org/.../feed/ | 技術者視点でのAI倫理・安全性標準。 |

### 🇪🇺 EU (欧州連合)
| フィード名 | URL | 監視理由 |
|------------|-----|----------|
| **EU AI Act News** | https://artificialintelligenceact.eu/feed/ | AI Act施行・ガイドラインの専門ニュース。 |
| **European Commission** | https://ec.europa.eu/.../rss_en.xml | 欧州委員会の公式プレスリリース。 |

### 🇺🇸 アメリカ
| フィード名 | URL | 監視理由 |
|------------|-----|----------|
| **NIST News** | https://www.nist.gov/news-events/news/rss.xml | AI RMF (リスク管理フレームワーク) の更新。 |
| **FTC Press Releases** | https://www.ftc.gov/feeds/press-release.xml | AI詐欺・不当慣習への法執行アクション。 |
| **FTC Consumer Protection** | https://www.ftc.gov/... | 消費者保護特化のFTC動向。 |

### 🇬🇧 イギリス
| フィード名 | URL | 監視理由 |
|------------|-----|----------|
| **UK DSIT** | https://www.gov.uk/.../atom | 科学技術省。AI政策ホワイトペーパーや規制緩和。 |
| **UK CMA** | https://competitionandmarkets... | 競争市場庁。AI基盤モデルの市場競争調査。 |
| **UK FCA** | https://www.fca.org.uk/news/rss.xml | 金融行動監視機構。FinTech×AIの規制。 |
| **UK RTA** | https://rtau.blog.gov.uk/feed/ | 責任あるAI採用の実務ガイドライン。 |

### 🇨🇦 カナダ
| フィード名 | URL | 監視理由 |
|------------|-----|----------|
| **Canada OPC News** | https://www.priv.gc.ca/en/rss/news/ | プライバシーコミッショナーの調査・声明。 |
| **Canada OPC Parliament** | https://www.priv.gc.ca/en/rss/parl/ | 議会への勧告・法案審議意見書。 |
| **Canada Gazette I** | https://gazette.gc.ca/rss/p1-eng.xml | 規制案・パブコメ募集の公式通知。 |
| **Canada Gazette II** | https://gazette.gc.ca/rss/p2-eng.xml | 制定された法律の公布。 |

### 🇦🇺 オーストラリア
| フィード名 | URL | 監視理由 |
|------------|-----|----------|
| **Australia OAIC** | https://www.oaic.gov.au/rss/news | 情報コミッショナー。プライバシー法改正監視。 |
| **Australia DISR News** | https://www.industry.gov.au/rss/news.xml | 産業科学資源省。AI強制ガードレール政策。 |
| **Australia DISR Media** | https://www.industry.gov.au/rss/media-releases.xml | 同省のメディア発表（速報）。 |

### 🇮🇳 インド
| フィード名 | URL | 監視理由 |
|------------|-----|----------|
| **India RBI Press** | https://rbi.org.in/pressreleases_rss.xml | 中央銀行による金融AI規制。 |
| **India SEBI** | https://www.sebi.gov.in/sebirss.xml | 証券取引委員会によるアルゴリズム規制。 |

### 🇨🇳 中国 (ニュースメディア)
| フィード名 | URL | 監視理由 |
|------------|-----|----------|
| **TechNode China** | https://technode.com/feed/ | 中国テック業界の英語メディア。 |
| **SCMP Tech** | https://www.scmp.com/rss/91/feed | 香港発、中国政府規制の詳細分析。 |

### 🇯🇵 日本
| フィード名 | URL | 監視理由 |
|------------|-----|----------|
| **経済産業省 (METI)** | https://www.meti.go.jp/press/index.rdf | AI事業者ガイドライン、GENIAC。 |
| **総務省 (MIC)** | https://www.soumu.go.jp/menu_news/s-news/rss.xml | 広島AIプロセス、偽・誤情報対策。 |
| **厚生労働省 (MHLW)** | https://www.mhlw.go.jp/stf/news.rdf | 医療AI、プログラム医療機器規制。 |
| **デジタル庁** | https://www.digital.go.jp/rss/news.xml | AI戦略会議、政府調達ルール。 |

---

## 2. 🚧 未実装：API (7件)
RSSがないが、公式APIが公開されているもの。GASでの実装優先度「高」。

| 国・機関 | ソース名 | API概要・監視理由 |
|----------|----------|-------------------|
| 🇺🇸 米国 | **Federal Register API** | 連邦政府の官報API。AI関連のパブコメ・規則制定を最も正確に捕捉可能。(認証不要) |
| 🇬🇧 英国 | **GOV.UK Content API** | 英国政府全サイトの更新情報API。DSIT以外の省庁情報も取得可能。 |
| 🇪🇺 EU | **EUR-Lex SPARQL** | EU法のデータベースAPI。AI Actの正式文書や関連法案の追跡に最強。 |
| 🇸🇬 シンガポール | **Data.gov.sg API** | シンガポールの政府データポータル。規制文書の更新検知に利用可能。 |
| 🇨🇦 カナダ | **Open Government API** | カナダ政府の公開情報API。RSSより詳細なメタデータが取得可能。 |
| 🇧🇷 ブラジル | **Câmara API** | ブラジル下院の法案追跡API。AI法案(PL 2338/2023)の審議状況を直接監視。 |
| 🇮🇱 イスラエル | **Data.gov.il API** | イスラエル政府データAPI。ヘブライ語情報の直接取得。 |

---

## 3. 🚧 未実装：スクレイピング必須 (9件)
RSSもAPIもなく、ウェブサイトのHTMLを解析して更新を検知する必要があるもの。
GASでは実装が難しく（実行時間制限・IP制限）、Python等の別サーバー推奨。

| 国・機関 | ソース名 | 監視理由・難易度 |
|----------|----------|------------------|
| 🇯🇵 日本 | **個人情報保護委員会 (PPC)** | 生成AI利用の注意喚起など重要情報が多いがRSSなし。 |
| 🇯🇵 日本 | **文化庁** | AIと著作権に関する重要議論。 |
| 🇨🇳 中国 | **国家インターネット情報弁公室 (CAC)** | 中国のAI規制(生成AI弁法など)の総本山。アクセス制限が厳しい可能性大。 |
| 🇨🇳 中国 | **工業情報化部 (MIIT)** | 中国の産業AI標準。 |
| 🇨🇳 中国 | **国務院 (State Council)** | 中国の国家最高行政機関。 |
| 🇰🇷 韓国 | **科学技術情報通信部 (MSIT)** | 今後制定されるAI基本法の所管。韓国語。 |
| 🇰🇷 韓国 | **個人情報保護委員会 (PIPC)** | 韓国のAIプライバシー規制。 |
| 🇸🇬 シンガポール | **IMDA Info** | AI Verifyなどの重要フレームワーク発表元。 |
| 🇦🇪 UAE | **UAE AI Office** | 世界初のAI大臣室。サイト更新の検知が必要。 |
