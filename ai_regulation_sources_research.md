# AI法規制ニュース自動収集のためのRSSソース調査レポート

各国のAI法規制情報を自動収集するためのシステム構築において、17機関中12機関がRSSまたはAPIを提供しており、残りはスクレイピングまたはWeChat監視で対応可能である。日本では経済産業省・総務省・デジタル庁・厚生労働省の4省庁がRSSを公開し、米国Federal RegisterのAPIが最も充実している。一方、中国3機関はいずれもRSS非対応のため代替手段が必須となる。

## 日本：6機関中4機関がRSS提供
日本の省庁は比較的RSS対応が進んでおり、e-Govパブリックコメントを統合監視することで効率的な情報収集が可能である。

### 経済産業省（METI）
| 項目 | 内容 |
|---|---|
| 公式URL | https://www.meti.go.jp/ |
| AI関連ページ | https://www.meti.go.jp/policy/it_policy/ai/index.html |
| RSS | ✅ あり：https://www.meti.go.jp/ml_index_release_atom.xml（ATOM形式） |
| 代替手段 | メルマガ：https://www.meti.go.jp/mail/index.html |
| パブコメ | e-Gov経由（産業一般RSS：/rss/pcm_list_0000000030.xml） |
| 更新頻度 | ほぼ毎日（1日複数件） |

### 総務省
| 項目 | 内容 |
|---|---|
| 公式URL | https://www.soumu.go.jp/ |
| AI関連ページ | https://www.soumu.go.jp/menu_seisaku/ictseisaku/ai/index.html |
| RSS | ✅ あり：https://www.soumu.go.jp/news.rdf（RSS 1.0） |
| 代替手段 | メルマガ：https://www.soumu.go.jp/menu_news/mail/index.html |
| パブコメ | 独自ページ + e-Gov（電気通信RSS：/rss/pcm_list_0000000045.xml） |
| 更新頻度 | ほぼ毎日 |

### 個人情報保護委員会（PPC）
| 項目 | 内容 |
|---|---|
| 公式URL | https://www.ppc.go.jp/ |
| 生成AI関連 | https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/ |
| RSS | ❌ なし |
| 代替手段 | スクレイピング推奨：https://www.ppc.go.jp/news/ ／ X：@PPC_JPN |
| パブコメ | e-Gov経由 |
| 更新頻度 | 週1-2回 |

### デジタル庁
| 項目 | 内容 |
|---|---|
| 公式URL | https://www.digital.go.jp/ |
| RSS | ✅ あり：https://www.digital.go.jp/rss/news.xml（RSS 2.0、2024年6月開始） |
| 代替手段 | メルマガ：https://www.digital.go.jp/news/newsletter |
| パブコメ | e-Gov経由（IT社会化推進RSS：/rss/pcm_list_0000000001.xml） |
| 更新頻度 | 週2-3回 |

### 文化庁
| 項目 | 内容 |
|---|---|
| 公式URL | https://www.bunka.go.jp/ |
| AI×著作権ページ | https://www.bunka.go.jp/seisaku/chosakuken/aiandcopyright.html |
| RSS | ❌ なし |
| 代替手段 | スクレイピング推奨：https://www.bunka.go.jp/whats_new.html |
| パブコメ | e-Gov経由（文化RSS：/rss/pcm_list_0000000029.xml） |
| 更新頻度 | 週2-3回 |

### 厚生労働省
| 項目 | 内容 |
|---|---|
| 公式URL | https://www.mhlw.go.jp/ |
| 医療AI関連 | https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000179749_00004.html |
| RSS | ✅ あり：https://www.mhlw.go.jp/stf/news.rdf（RSS 1.0） |
| 代替手段 | メルマガ：https://www.mhlw.go.jp/mailmagazine/ |
| パブコメ | e-Gov経由（厚生RSS：/rss/pcm_list_0000000048.xml） |
| 更新頻度 | ほぼ毎日 |

### e-Govパブリックコメント統合監視
e-Govは全省庁のパブリックコメントをRSSで一括取得可能であり、AI関連の意見募集を効率的に監視できる。
- 全件（意見募集中）: https://public-comment.e-gov.go.jp/rss/pcm_list.xml
- 全件（結果公示）: https://public-comment.e-gov.go.jp/rss/pcm_result.xml

---

## EU：EUR-LexのAPI/RSSが最も充実
EU情報源ではEUR-Lexが最も技術的に充実しており、SPARQL APIとRSSの両方を提供している。AI Office（2024年6月設立）はまだ専用フィードを持たない。

### EUR-Lex
| 項目 | 内容 |
|---|---|
| 公式URL | https://eur-lex.europa.eu/ |
| AI Act | https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng |
| RSS | ✅ 複数あり |
| 立法RSS | https://eur-lex.europa.eu/EN/display-feed.rss?rssId=162 |
| 官報L（法令） | https://eur-lex.europa.eu/EN/display-feed.rss?rssId=222 |
| API | ✅ SPARQL：https://publications.europa.eu/webapi/rdf/sparql |
| パブコメ | カスタムRSSアラート作成可能（My EUR-Lex登録後） |
| 更新頻度 | 毎日 |

### European Commission（AI政策）
| 項目 | 内容 |
|---|---|
| AI戦略ページ | https://digital-strategy.ec.europa.eu/en/policies/artificial-intelligence |
| AI Act政策 | https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai |
| RSS | ⚠️ 限定的（専用フィードなし） |
| 代替手段 | ニュースレター登録：https://ec.europa.eu/eusurvey/runner/AIOffice-Interest-General |
| パブコメ | Have Your Say：https://have-your-say.ec.europa.eu/ |
| 更新頻度 | 週1-2回 |

### EU AI Office
| 項目 | 内容 |
|---|---|
| 公式URL | https://digital-strategy.ec.europa.eu/en/policies/ai-office |
| AI Pact | https://digital-strategy.ec.europa.eu/en/policies/ai-pact |
| サービスデスク | https://ai-act-service-desk.ec.europa.eu/en |
| RSS | ❌ なし（2024年6月設立、未整備） |
| 代替手段 | ニュースレター + スクレイピング + X：@DigitalEU |
| 第三者リソース | https://artificialintelligenceact.eu/（AI Act解説サイト） |
| 更新頻度 | 月2-4回 |

---

## 米国：Federal Register APIが最強
米国ではFederal Registerが認証不要の包括的REST APIを提供しており、AI関連規制を自動収集する最も確実な方法となる。

### Federal Register
| 項目 | 内容 |
|---|---|
| 公式URL | https://www.federalregister.gov |
| API文書 | https://www.federalregister.gov/developers/documentation/api/v1 |
| RSS | ✅ カスタム検索からRSS作成可能 |
| API | ✅ REST API（認証不要） |
| AI検索例 | https://www.federalregister.gov/api/v1/documents.json?conditions[term]=artificial+intelligence |
| パブコメ | Regulations.gov連携（API：https://api.regulations.gov/v4/） |
| 更新頻度 | 毎営業日6:00 AM ET |

### NIST
| 項目 | 内容 |
|---|---|
| AIページ | https://www.nist.gov/artificial-intelligence |
| AI RMF | https://www.nist.gov/itl/ai-risk-management-framework |
| AIリソースセンター | https://airc.nist.gov/home |
| RSS | ✅ トピック別：https://www.nist.gov/news-events/news/rss.xml |
| IT関連RSS | https://www.nist.gov/news-events/information%20technology/rss.xml |
| メール登録 | https://public.govdelivery.com/accounts/USNIST/subscriber/new?topic_id=USNIST_465 |
| パブコメ | Federal Register経由 + Regulations.gov |
| 更新頻度 | 週1-月1回（AI RMF：年1-2回の大規模更新） |

### FTC
| 項目 | 内容 |
|---|---|
| AIページ | https://www.ftc.gov/industry/technology/artificial-intelligence |
| AI遵守計画 | https://www.ftc.gov/ai |
| RSS | ✅ カテゴリ別プレスリリース https://www.ftc.gov/feeds/press-release.xml |
| 消費者保護RSS | https://www.ftc.gov/feeds/press-release-consumer-protection.xml |
| ビジネスブログRSS | https://www.ftc.gov/feeds/blog-business.xml |
| パブコメ | https://www.ftc.gov/policy/public-comments + Regulations.gov |
| 更新頻度 | 週数回（AI関連：月2-5件） |

---

## 中国：全機関RSS非対応、スクレイピング必須
中国の政府機関はいずれもRSSを提供しておらず、自動収集にはスクレイピングまたはWeChat監視が必要となる。

### 国家インターネット情報弁公室（CAC）
| 項目 | 内容 |
|---|---|
| 公式URL | https://www.cac.gov.cn/ |
| RSS | ❌ なし |
| 代替手段 | スクレイピング推奨 + WeChat公式アカウント「中国网信」 |
| パブコメ | 個別通知方式（法務部サイト経由） |
| 更新頻度 | 毎日（AI規制：年2-4件） |

### 工業情報化部（MIIT）
| 項目 | 内容 |
|---|---|
| 公式URL | https://www.miit.gov.cn/ |
| RSS | ❌ なし |
| 代替手段 | スクレイピング推奨 + WeChat「工信微报」 |
| 更新頻度 | 毎日（AI産業標準：月1回程度） |

---

## 国際標準化団体：標準単位のRSS提供

### ISO/IEC（SC 42：人工知能委員会）
- RSS: https://www.iso.org/iso/rss.xml?csnumber=42001&rss=detail

### IEEE
- RSS（ブログ）: https://standards.ieee.org/category/beyond-standards/feed/

---

## Tier 2・Tier 3国（9カ国）完全ガイド

### 1. イギリス（UK）
- **CMA（競争市場庁）**: https://competitionandmarkets.blog.gov.uk/feed/
- **FCA（金融行動監視機構）**: https://www.fca.org.uk/news/rss.xml
- **RTA（旧CDEI）**: https://rtau.blog.gov.uk/feed/
- **GovWire (Third Party)**: https://govwire.co.uk/rss/department-for-science-innovation-and-technology

### 2. 韓国（South Korea）
- RSS提供ほぼなし。スクレイピング推奨。
- 補完メディア:
    - Yonhap News英語版: https://en.yna.co.kr/RSS/news.xml
    - Korea Herald: http://www.koreaherald.com/rss

### 3. シンガポール（Singapore）
- RSS限定的。
- ニュース:
    - Straits Times Tech: https://www.straitstimes.com/news/tech/rss.xml
    - Channel NewsAsia: https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml

### 4. カナダ（Canada）
- **OPC（プライバシーコミッショナー）**:
    - ニュース: https://www.priv.gc.ca/en/rss/news/
    - 国会への助言: https://www.priv.gc.ca/en/rss/parl/
- **Canada Gazette**:
    - Part I (規制案): https://gazette.gc.ca/rss/p1-eng.xml
    - Part II (正式規制): https://gazette.gc.ca/rss/p2-eng.xml

### 5. ブラジル（Brazil）
- **上院 (Senado)**: 法案RSSあり
- **下院 (Câmara)**: RESTful APIあり
- **CNJ**: https://atos.cnj.jus.br/atos/

### 6. オーストラリア（Australia）
- **DISR**:
    - News: https://www.industry.gov.au/rss/news.xml
    - Media Releases: https://www.industry.gov.au/rss/media-releases.xml
- **OAIC**: https://www.oaic.gov.au/rss/news

### 7. インド（India）
- **RBI**:
    - Press Releases: https://rbi.org.in/pressreleases_rss.xml
    - Notifications: https://rbi.org.in/notifications_rss.xml
- **SEBI**: https://www.sebi.gov.in/sebirss.xml

### 8. UAE（アラブ首長国連邦）
- **TDRA**: https://tdra.gov.ae/en/rss-feeds.aspx
- **Gulf News**: https://gulfnews.com/cmlink/1.406468

### 9. イスラエル（Israel）
- **ISA (証券庁)**: https://www.isa.gov.il/sites/ISAEng/rss
- **Times of Israel Tech**: https://www.timesofisrael.com/tech-israel/feed/

---

## 実装推奨アーキテクチャ

### 第1優先：RSS/API直接取得（12ソース）
- 日本: METI, MIC, デジタル庁, MHLW + e-Govパブコメ
- EU: EUR-Lex RSS, EUR-Lex SPARQL API
- 米国: Federal Register API, NIST RSS, FTC RSS
- 国際: ISO標準別RSS, IEEE

### 第2優先：スクレイピング実装（5ソース）
- 日本: PPC, 文化庁
- 中国: CAC, MIIT, 国務院

### 第3優先：ニュースレター/SNS監視
- EU AI Office
- 中国機関
