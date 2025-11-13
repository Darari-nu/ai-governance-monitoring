# AI法規制サイトチェックコマンド

以下の手順で各国のAI法規制サイトをチェックし、更新があれば記事を生成してください：

## 手順

### 1. Googleスプレッドシートから監視対象リストを取得
- スプレッドシートID: `{SPREADSHEET_ID}` (初回実行時に設定)
- 読み込む列:
  - A列: 国名
  - B列: 調査対象URL
  - C列: 通知用メールアドレス（任意）

### 2. 各URLをチェック
各行について以下を実行：
1. URLにアクセス
2. WebFetchツールを使って内容を取得
3. AI法規制に関する更新があるかチェック
4. 更新があれば以下を抽出：
   - 法規制の名称/タイトル
   - 概要（2-3文程度）
   - 重要な本文の抜粋（1-2段落）
   - 更新日（分かれば）

### 3. ブログカードを生成
更新があった場合、以下の形式でHTMLを生成：

```html
<article class="blog-card">
  <div class="card-header">
    <span class="country-badge">[国名]</span>
    <time datetime="YYYY-MM-DD">[日付]</time>
  </div>
  <h2 class="card-title">[タイトル]</h2>
  <p class="card-summary">
    [概要文]
  </p>
  <blockquote class="card-excerpt">
    [本文抜粋]
  </blockquote>
  <a href="[ソースURL]" class="card-link" target="_blank" rel="noopener">
    情報源を見る →
  </a>
</article>
```

### 4. index.htmlに追記
- `public/index.html` の `<main>` セクション内、最上部に新しいブログカードを追加
- 新しい記事が常に一番上に表示されるようにする

### 5. 結果を報告
- チェックしたサイト数
- 更新が見つかったサイト数
- 追加した記事のタイトル一覧
- エラーがあればその詳細

## 注意事項
- WebFetchがタイムアウトした場合はスキップして次へ
- スプレッドシートが読めない場合はエラーを報告
- HTMLの既存構造を壊さないよう注意
