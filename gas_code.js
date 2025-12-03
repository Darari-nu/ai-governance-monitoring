/**
 * AI Governance Monitor - RSS Fetcher & API
 * 
 * このスクリプトを Google Apps Script (GAS) に貼り付けてください。
 */

// シート名の定義
const SHEET_FEEDS = 'Feeds';
const SHEET_ARTICLES = 'Articles';

/**
 * 初期セットアップ
 * 初回のみ実行してください。必要なシートとヘッダーを作成します。
 */
function setup() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Feedsシート作成
    let feedsSheet = ss.getSheetByName(SHEET_FEEDS);
    if (!feedsSheet) {
        feedsSheet = ss.insertSheet(SHEET_FEEDS);
        // ヘッダー: [フィード名, URL, 管轄(Jurisdiction), 翻訳する(TRUE/FALSE)]
        feedsSheet.appendRow(['Feed Name', 'RSS URL', 'Jurisdiction (e.g., EU, US)', 'Translate (TRUE/FALSE)']);
        feedsSheet.setFrozenRows(1);

        // サンプルデータ
        feedsSheet.appendRow(['IAPP News', 'https://iapp.org/rss/news/', 'International', true]);
    }

    // Articlesシート作成
    let articlesSheet = ss.getSheetByName(SHEET_ARTICLES);
    if (!articlesSheet) {
        articlesSheet = ss.insertSheet(SHEET_ARTICLES);
        // ヘッダー
        articlesSheet.appendRow(['ID', 'Jurisdiction', 'Title', 'Title (JA)', 'Description', 'Description (JA)', 'Link', 'Date', 'Image URL']);
        articlesSheet.setFrozenRows(1);
    }
}

/**
 * RSSフィードを取得して更新する（トリガーで定期実行）
 */
function updateFeeds() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const feedsSheet = ss.getSheetByName(SHEET_FEEDS);
    const articlesSheet = ss.getSheetByName(SHEET_ARTICLES);

    // フィード設定を取得
    const feedsData = feedsSheet.getDataRange().getValues();
    // 既存の記事URLを取得（重複チェック用）
    const existingUrls = getExistingUrls(articlesSheet);

    // 1行目はヘッダーなのでスキップ
    for (let i = 1; i < feedsData.length; i++) {
        const [feedName, rssUrl, jurisdiction, doTranslate] = feedsData[i];

        if (!rssUrl) continue;

        try {
            console.log(`Fetching: ${feedName} (${rssUrl})`);
            fetchAndParseFeed(rssUrl, jurisdiction, doTranslate, articlesSheet, existingUrls);
        } catch (e) {
            console.error(`Error fetching ${feedName}: ${e.toString()}`);
        }
    }
}

/**
 * 個別のRSSフィードを処理
 */
function fetchAndParseFeed(url, jurisdiction, doTranslate, sheet, existingUrls) {
    const xml = UrlFetchApp.fetch(url).getContentText();
    const document = XmlService.parse(xml);
    const root = document.getRootElement();

    let items = [];

    // RSS 2.0
    if (root.getName() === 'rss') {
        items = root.getChild('channel').getChildren('item');
    }
    // Atom
    else if (root.getName() === 'feed') {
        items = root.getChildren('entry', root.getNamespace());
    }

    // 最新の5件のみ処理（API制限考慮）
    const limit = 5;

    for (let i = 0; i < Math.min(items.length, limit); i++) {
        const item = items[i];

        let title = '';
        let link = '';
        let description = '';
        let pubDate = '';

        // RSS 2.0 / Atom パース
        if (root.getName() === 'rss') {
            title = getChildText(item, 'title');
            link = getChildText(item, 'link');
            description = getChildText(item, 'description');
            pubDate = getChildText(item, 'pubDate');
        } else {
            title = getChildText(item, 'title', root.getNamespace());
            const linkNode = item.getChild('link', root.getNamespace());
            if (linkNode) link = linkNode.getAttribute('href').getValue();
            description = getChildText(item, 'summary', root.getNamespace()) || getChildText(item, 'content', root.getNamespace());
            pubDate = getChildText(item, 'updated', root.getNamespace());
        }

        // 重複チェック
        if (existingUrls.has(link)) continue;

        // HTMLタグ除去
        description = stripHtml(description);
        // 長さ制限
        if (description.length > 200) description = description.substring(0, 200) + '...';

        // 翻訳
        let titleJa = title;
        let descJa = description;

        if (doTranslate) {
            try {
                titleJa = LanguageApp.translate(title, 'en', 'ja');
                descJa = LanguageApp.translate(description, 'en', 'ja');
                // 1秒待機（レート制限回避）
                Utilities.sleep(1000);
            } catch (e) {
                console.warn('Translation failed', e);
            }
        }

        // ID生成 (簡易的)
        const id = Utilities.getUuid();

        // 行追加
        // ['ID', 'Jurisdiction', 'Title', 'Title (JA)', 'Description', 'Description (JA)', 'Link', 'Date', 'Image URL']
        sheet.appendRow([
            id,
            jurisdiction || 'Global',
            title,
            titleJa,
            description,
            descJa,
            link,
            formatDate(pubDate),
            '' // Image URL (TBD)
        ]);

        console.log(`Added: ${title}`);
    }
}

/**
 * APIエンドポイント (GET)
 * フロントエンドから呼び出される
 */
function doGet(e) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_ARTICLES);
    const data = sheet.getDataRange().getValues();

    // ヘッダー除去してオブジェクト配列化
    const headers = data[0];
    const rows = data.slice(1);

    const result = rows.map(row => {
        return {
            id: row[0],
            jurisdiction: row[1],
            title: row[2],
            titleJa: row[3],
            description: row[4],
            descriptionJa: row[5],
            link: row[6],
            lastUpdated: row[7], // Date
            // image: row[8]
        };
    }).reverse(); // 新しい順

    return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
}

// --- Helpers ---

function getChildText(element, name, namespace) {
    const child = namespace ? element.getChild(name, namespace) : element.getChild(name);
    return child ? child.getText() : '';
}

function getExistingUrls(sheet) {
    const urls = new Set();
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return urls;

    // Link列はG列 (index 6)
    const data = sheet.getRange(2, 7, lastRow - 1, 1).getValues();
    data.forEach(row => urls.add(row[0]));
    return urls;
}

function stripHtml(html) {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').trim();
}

function formatDate(dateStr) {
    if (!dateStr) return new Date().toISOString().split('T')[0];
    try {
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];
    } catch (e) {
        return dateStr;
    }
}
