# AI Governance Monitor - Project Guide

> Claude Code がこのプロジェクトを理解するためのドキュメント

## プロジェクト概要

**目的**: 世界各国のAI法規制を自動収集し、日英バイリンガルで公開するWebサイト

**コンセプト**: スーパー自動化AIガバナンスHP

---

## アーキテクチャ

```
┌─────────────────────────────────────────────────────────────┐
│                      フロントエンド                          │
│                 React + Vite + Tailwind                     │
│                    (Vercel にデプロイ)                       │
├─────────────────────────────────────────────────────────────┤
│                         ↓ fetch                             │
├─────────────────────────────────────────────────────────────┤
│                      バックエンド                            │
│              Google Apps Script (GAS)                       │
│         - RSS フィード収集                                   │
│         - Gemini API でフィルタリング                        │
│         - Federal Register API 連携                         │
├─────────────────────────────────────────────────────────────┤
│                         ↓                                   │
├─────────────────────────────────────────────────────────────┤
│                      データベース                            │
│                  Google Sheets                              │
│         - Feeds シート: RSS フィード一覧                     │
│         - Articles シート: 収集した記事                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フロントエンド | React 19, Vite 7, Tailwind CSS 3 |
| 3D/アニメーション | COBE (3D Globe), Framer Motion, GSAP |
| バックエンド | Google Apps Script |
| DB | Google Sheets |
| AI | Gemini API (記事フィルタリング) |
| デプロイ | Vercel (フロント), GAS Web App (API) |
| 開発ツール | clasp (GAS CLI) |

---

## ディレクトリ構成

```
ai-governance-monitoring/
├── src/                          # React アプリ
│   ├── App.jsx                   # メインコンポーネント
│   ├── components/
│   │   ├── Globe.jsx             # 3D 地球儀
│   │   ├── ArticleCard.jsx       # 記事カード
│   │   ├── sections/
│   │   │   ├── LatestUpdates.jsx # 最新情報セクション
│   │   │   └── ArchiveSection.jsx# アーカイブ検索
│   │   └── ui/
│   │       └── card.jsx          # UI コンポーネント
├── gas/                          # GAS コード (clasp 管理)
│   └── Code.js
├── public/
│   ├── data/articles.json        # フォールバック用静的データ
│   └── hero.png
├── .claude/
│   └── commands/                 # カスタムコマンド
├── CLAUDE.md                     # このファイル
├── CLASP_SETUP.md               # clasp セットアップガイド
├── GAS_SETUP.md                 # GAS セットアップガイド
└── requirements.md              # 要件定義書
```

---

## 重要ファイル

| ファイル | 役割 |
|---------|------|
| `src/App.jsx` | メインコンポーネント、GAS API からデータ取得 |
| `src/components/Globe.jsx` | COBE ライブラリで 3D 地球儀を描画 |
| `gas_code.js` | GAS バックエンド（RSS 収集、Gemini フィルタ、API） |
| `tailwind.config.js` | テーマカラー、カスタム設定 |

---

## 開発コマンド

```bash
# フロントエンド開発
npm run dev          # 開発サーバー起動
npm run build        # 本番ビルド
npm run preview      # ビルドプレビュー

# GAS デプロイ (clasp 導入後)
clasp push           # ローカル → GAS
clasp pull           # GAS → ローカル
clasp open           # GAS エディタを開く
```

---

## 現在の課題・TODO

### 優先度: 高
- [ ] GAS API のアクセス権限修正（「全員」に設定）
- [ ] clasp 導入（コピペ作業の自動化）
- [ ] スプレッドシート → HP のデータ連携確認

### 優先度: 中
- [ ] デザインシステムの整理（カラー、フォント、間隔の一元管理）
- [ ] カスタムコマンドの整備

### 優先度: 低（将来実装）
- [ ] AI法解説ブログ（Sanity + 2カラム原文/日本語）
- [ ] 章・条ごとの分割表示
- [ ] 3行要約 + 具体例

---

## GAS API エンドポイント

**URL**: `https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec`

### 記事取得
```
GET ?type=articles
```

### フィード一覧取得
```
GET ?type=feeds
```

---

## 注意事項

### デザイン変更時
- `tailwind.config.js` のテーマ設定を確認
- `Globe.jsx` は COBE ライブラリ依存、変更時は慎重に
- レスポンシブは `clamp()` と Tailwind のブレークポイントを使用

### GAS 変更時
- 変更後は必ず「新しいデプロイ」を作成
- アクセス権限は「全員」に設定
- Gemini API キーは Script Properties で管理

---

## 参考リンク

- [EU AI Act](https://artificialintelligenceact.eu/)
- [COBE (3D Globe)](https://github.com/shuding/cobe)
- [clasp (GAS CLI)](https://github.com/google/clasp)
- [Gemini API](https://ai.google.dev/)
