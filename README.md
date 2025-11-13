# AI法規制モニタリングサイト

各国のAI法規制を定期的にモニタリングし、更新情報をブログ形式で蓄積・公開するWebサイトです。

## 特徴

- シンプルな静的HTMLサイト
- Googleスプレッドシートで監視対象を管理
- カスタムコマンド `/check` で一括チェック
- ブログカード形式で記事を蓄積

## セットアップ

### 1. Googleスプレッドシートを作成

以下の形式でスプレッドシートを作成してください：

| 国名 | 調査対象URL | 通知用メールアドレス |
|------|-------------|---------------------|
| EU | https://ec.europa.eu/ai-act | your@email.com |
| 米国 | https://www.whitehouse.gov/ai | your@email.com |
| 日本 | https://www8.cao.go.jp/cstp/ai/ | |

### 2. スプレッドシートを公開設定

1. スプレッドシートを開く
2. 「共有」→「リンクを知っている全員が閲覧可」に設定
3. スプレッドシートIDをコピー（URLの `/d/` と `/edit` の間の文字列）

例: `https://docs.google.com/spreadsheets/d/【ここがID】/edit`

### 3. スプレッドシートIDを設定

`public/admin.html` を開いて、スプレッドシートIDを設定してください。

### 4. サイトをチェック

Claude Codeで以下のコマンドを実行：

```
/check
```

これで監視対象サイトがチェックされ、更新があれば `public/index.html` に記事が追加されます。

## ファイル構成

```
251113_AIGovernance/
├── .claude/
│   └── commands/
│       └── check.md          # /checkコマンドの定義
├── public/
│   ├── index.html            # メインページ
│   ├── admin.html            # 管理画面
│   └── style.css             # スタイルシート
├── templates/
├── requirements.md           # 要件定義書
└── README.md                 # このファイル
```

## 使い方

### 監視対象の追加・削除

Googleスプレッドシートを直接編集してください。

### サイトのチェック

```bash
/check
```

### サイトの表示

`public/index.html` をブラウザで開いてください。

## デプロイ

### GitHub Pages

1. GitHubリポジトリを作成
2. `public/` フォルダをpush
3. Settings → Pages で公開

### その他

- Netlify
- Vercel
- Cloudflare Pages

など、静的サイトホスティングサービスが使えます。

## カスタマイズ

- `public/style.css` でデザインをカスタマイズ
- `.claude/commands/check.md` でチェック処理をカスタマイズ

## ライセンス

MIT
