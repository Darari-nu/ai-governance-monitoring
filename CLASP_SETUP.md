# clasp セットアップガイド

> GASコードをコピペなしでデプロイできる魔法のツール

## clasp とは？

```
【Before】😓 コピペ地獄
  PC の gas_code.js → ブラウザで GAS エディタ開く → 全選択 → ペースト → 保存

【After】😊 コマンド一発
  PC で「clasp push」と打つだけ！
```

---

## 初回セットアップ（10分くらい）

### Step 1: Node.js を確認

ターミナルで以下を実行：

```bash
node -v
```

バージョンが表示されればOK。表示されなければ [Node.js公式サイト](https://nodejs.org/) からインストール。

---

### Step 2: clasp をインストール

```bash
npm install -g @google/clasp
```

---

### Step 3: Google にログイン

```bash
clasp login
```

ブラウザが開くので、Googleアカウントでログイン → 許可する。

---

### Step 4: Apps Script API を有効化

1. [Apps Script API 設定ページ](https://script.google.com/home/usersettings) を開く
2. 「Google Apps Script API」を **オン** にする

---

### Step 5: 既存の GAS プロジェクトに接続

GAS エディタで「プロジェクトの設定」→「スクリプト ID」をコピー。

```bash
cd /home/user/ai-governance-monitoring
clasp clone <スクリプトID> --rootDir ./gas
```

これで `gas/` フォルダに GAS コードが同期される。

---

## 日常の使い方

### ローカル → GAS にプッシュ

```bash
clasp push
```

これだけ！コピペ不要！

### GAS → ローカルにプル

```bash
clasp pull
```

### ブラウザで GAS エディタを開く

```bash
clasp open
```

---

## ファイル構成（clasp導入後）

```
ai-governance-monitoring/
├── gas/                    ← GAS コード置き場
│   ├── appsscript.json     ← GAS 設定ファイル
│   └── Code.js             ← メインコード
├── .clasp.json             ← clasp 設定（自動生成）
├── src/                    ← React フロントエンド
└── ...
```

---

## トラブルシューティング

### Q: `clasp push` でエラーが出る

A: 以下を確認：
1. `clasp login` でログイン済みか
2. Apps Script API がオンになっているか
3. `.clasp.json` がプロジェクトルートにあるか

### Q: 変更が反映されない

A: GAS エディタで「デプロイ」→「新しいデプロイ」をする必要がある場合も。
   または `clasp deploy` コマンドを使う。

---

## 参考リンク

- [clasp 公式GitHub](https://github.com/google/clasp)
- [Google公式ドキュメント](https://developers.google.com/apps-script/guides/clasp)
