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
        feedsSheet.appendRow(['ISO/IEC 42001 (AI Standards)', 'https://www.iso.org/iso/rss.xml?csnumber=42001&rss=detail', 'International', true]);
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

// --- Gemini API Support ---

/**
 * Gemini APIを呼び出す関数
 */
function callGeminiApi(prompt) {
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (!apiKey) {
        console.error('GEMINI_API_KEY is not set in Script Properties.');
        return null;
    }

    // モデル名を gemini-2.0-flash に変更
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const payload = {
        "contents": [{
            "parts": [{ "text": prompt }]
        }],
        "generationConfig": {
            "temperature": 0.1, // 事実に基づく判断なので低めに設定
            "maxOutputTokens": 100
        }
    };

    const options = {
        'method': 'post',
        'headers': { 'Content-Type': 'application/json' },
        'payload': JSON.stringify(payload),
        'muteHttpExceptions': true
    };

    try {
        let response = UrlFetchApp.fetch(apiUrl, options);
        let json = JSON.parse(response.getContentText());

        // 429 (Rate Limit) エラーの場合のリトライ処理
        if (json.error && json.error.code === 429) {
            console.warn(`Gemini Rate Limit Exceeded. Waiting 20s before retry...`);
            Utilities.sleep(20000); // 20秒待機
            response = UrlFetchApp.fetch(apiUrl, options); // 再試行
            json = JSON.parse(response.getContentText());
        }

        if (json.error) {
            console.error('Gemini API Error:', json.error);
            return null;
        }

        if (json.candidates && json.candidates.length > 0 && json.candidates[0].content) {
            return json.candidates[0].content.parts[0].text.trim();
        }
        return null;
    } catch (e) {
        console.error('Error calling Gemini API:', e);
        return null;
    }
}

/**
 * 記事が法規制の公式発表か判断する関数
 */
function isRegulatoryUpdate(title, description) {
    // 露骨なノイズはルールベースで弾く（API節約と高速化）
    const noiseKeywords = ['opinion', 'unboxing', 'review', 'rumor', 'leak', 'forecast', 'prediction', 'webinar', 'podcast', 'deal', 'stock', 'market'];
    const combinedText = (title + ' ' + description).toLowerCase();

    if (noiseKeywords.some(keyword => combinedText.includes(keyword))) {
        console.log(`Skipped (Rule-based noise): ${title}`);
        return false;
    }

    // 必須キーワードチェック（API節約: これらが含まれていない記事はそもそもAI規制ニュースではない可能性が高い）
    const requiredKeywords = [
        'ai', 'artificial intelligence', 'intelligence', 'machine learning', 'algorithm', 'llm', 'generative',
        'gpt', 'robot', 'automated', 'autonomous', // Tech terms
        'regulation', 'law', 'act', 'bill', 'directive', 'compliance', 'governance', 'policy', 'rules', 'guidelines', 'standard', 'framework', // Legal terms
        'privacy', 'security', 'safety', 'ethics', 'risk', 'copyright', 'ftc', 'nist' // Issue terms
    ];

    if (!requiredKeywords.some(keyword => combinedText.includes(keyword))) {
        // console.log(`Skipped (No relevant keywords): ${title}`); // ログが煩雑になるのでコメントアウト可
        return false;
    }

    const prompt = `
You are an expert legal analyst specializing in AI regulation.
Determine if the following article represents an OFFICIAL announcement of a new law, regulation, guideline, enforcement action, or significant policy update by a government or regulatory body.

Title: ${title}
Description: ${description}

Strictly exclude:
- Opinion pieces, editorials, or commentary
- General news about AI technology or companies
- Market predictions or industry trends
- Webinars, podcasts, or event announcements

Reply only with "YES" if it is an official regulatory update, or "NO" if it is not.
    `.trim();

    const response = callGeminiApi(prompt);

    if (response) {
        // "YES", "Yes", "yes" などが含まれていればOK
        const isYes = response.toUpperCase().includes('YES');
        console.log(`Gemini Filter: [${isYes ? 'PASS' : 'SKIP'}] ${title}`);
        return isYes;
    }

    // APIエラー時は安全側に倒して（許可して）ログに残す、または厳密に弾くか選べる
    // ここでは「API失敗時は許可（スルー）」にする
    console.warn('Gemini Check Failed - Allowing article by default');
    return true;
}

/**
 * RSSフィードを取得して更新する（トリガーで定期実行）
 */
function updateFeeds() {
    const startTime = new Date().getTime();
    const MAX_EXECUTION_TIME = 1000 * 60 * 4.5; // 4.5 minutes (GAS limit is 6 min)

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const feedsSheet = ss.getSheetByName(SHEET_FEEDS);
    const articlesSheet = ss.getSheetByName(SHEET_ARTICLES);

    // フィード設定を取得
    const feedsData = feedsSheet.getDataRange().getValues();
    // 既存の記事URLを取得（重複チェック用）
    const existingUrls = getExistingUrls(articlesSheet);

    // 1行目はヘッダーなのでスキップ
    for (let i = 1; i < feedsData.length; i++) {
        // 時間制限チェック
        if (new Date().getTime() - startTime > MAX_EXECUTION_TIME) {
            console.warn('Approaching execution time limit. Stopping feedback processing early.');
            break;
        }

        let [feedName, rssUrl, jurisdiction, doTranslate] = feedsData[i]; // letに変更

        // --- 自動修復 (Auto-Repair) ---
        // リンク切れURLを検出したら、その場でシートを書き換えて新しいURLで続行する
        const replacements = {
            'https://www.meti.go.jp/press/index.rdf': { url: 'https://journal.meti.go.jp/feed/', name: '経済産業省 (METI Journal)' },
            'https://www.soumu.go.jp/menu_news/s-news/rss.xml': { url: 'https://www.soumu.go.jp/news.rdf', name: '総務省 (MIC)' }
        };

        if (replacements[rssUrl]) {
            const newInfo = replacements[rssUrl];
            console.log(`Auto-repairing broken URL: ${rssUrl} -> ${newInfo.url}`);

            // シートを更新 (行番号は i+1)
            try {
                feedsSheet.getRange(i + 1, 1).setValue(newInfo.name); // Name column
                feedsSheet.getRange(i + 1, 2).setValue(newInfo.url);  // URL column
            } catch (e) {
                console.error(`Failed to update sheet for ${feedName}: ${e.toString()}`);
            }

            // 変数を更新して処理を続行
            rssUrl = newInfo.url;
            feedName = newInfo.name;
        }
        // ---------------------------

        if (!rssUrl) continue;

        try {
            console.log(`Fetching: ${feedName} (${rssUrl})`);
            fetchAndParseFeed(rssUrl, jurisdiction, doTranslate, articlesSheet, existingUrls);

            // フィードごとの待機時間（サーバー負荷軽減）
            Utilities.sleep(2000);
        } catch (e) {
            console.error(`Error fetching ${feedName}: ${e.toString()}`);
        }
    }

    // --- API連携 (Phase 4) ---
    try {
        // 時間制限チェック
        if (new Date().getTime() - startTime <= MAX_EXECUTION_TIME) {
            fetchFederalRegisterUpdates(articlesSheet, existingUrls);
        } else {
            console.warn('Skipping API fetch due to time limit.');
        }
    } catch (e) {
        console.error(`Error fetching Federal Register API: ${e.toString()}`);
    }
}

/**
 * 個別のRSSフィードを処理
 */
function fetchAndParseFeed(url, jurisdiction, doTranslate, sheet, existingUrls) {
    let xml;
    try {
        const response = UrlFetchApp.fetch(url, {
            muteHttpExceptions: true,
            headers: {
                // 一般的なブラウザのヘッダーを模倣
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/rss+xml, application/xml, text/xml, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache'
            }
        });
        if (response.getResponseCode() !== 200) {
            console.error(`HTTP Error ${response.getResponseCode()} for ${url}`);
            return;
        }
        xml = response.getContentText();

        // 簡易チェック: HTMLが返ってきていないか？
        if (xml.trim().toLowerCase().startsWith('<!doctype html') || xml.includes('<html')) {
            console.error(`Error: The URL ${url} returned HTML instead of RSS/XML. Please check if the URL is correct (e.g., try adding /feed/ or /rss).`);
            return;
        }
    } catch (e) {
        console.error(`Network error fetching ${url}: ${e.toString()}`);
        return;
    }

    let document;
    try {
        document = XmlService.parse(xml);
    } catch (e) {
        console.error(`XML Parsing Error for ${url}: ${e.toString()}. The content might not be valid XML.`);
        return;
    }

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

    // 最新の2件のみ処理（API制限考慮: 無料枠は1分間15回までなので、最初は少なく試す）
    const limit = 2;

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

        // --- Gemini AI Filter ---
        // Rate Limit対策: 3秒待機（API制限回避のため）
        Utilities.sleep(3000);

        // 法規制の公式情報かどうかを判定
        if (!isRegulatoryUpdate(title, description)) {
            continue; // スキップ
        }
        // ------------------------

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
 * US Federal Register APIから記事を取得
 */
function fetchFederalRegisterUpdates(sheet, existingUrls) {
    console.log('Fetching: US Federal Register API');

    // AI関連の文書を検索 (過去7日分くらいに絞るのがベストだが、ここでは最新順で取得)
    // conditions[term]=artificial+intelligence
    // order=newest
    const apiUrl = 'https://www.federalregister.gov/api/v1/documents.json?conditions[term]=artificial+intelligence&order=newest&per_page=5';

    let json;
    try {
        const response = UrlFetchApp.fetch(apiUrl, { muteHttpExceptions: true });
        if (response.getResponseCode() !== 200) {
            console.error(`API Error ${response.getResponseCode()} for Federal Register`);
            return;
        }
        json = JSON.parse(response.getContentText());
    } catch (e) {
        console.error(`Network error fetching Federal Register: ${e.toString()}`);
        return;
    }

    if (!json.results || json.results.length === 0) {
        console.log('No results found from Federal Register API');
        return;
    }

    // 2件だけ処理
    const results = json.results.slice(0, 2);

    for (const item of results) {
        const title = item.title;
        const link = item.html_url;
        const description = item.abstract || item.excerpt || ''; // abstractがない場合もある
        const pubDate = item.publication_date;
        const jurisdiction = 'US';

        // 重複チェック
        if (existingUrls.has(link)) continue;

        // HTMLタグ除去
        const cleanDescription = stripHtml(description);

        // --- Gemini AI Filter ---
        // Rate Limit対策
        Utilities.sleep(3000);

        if (!isRegulatoryUpdate(title, cleanDescription)) {
            continue;
        }

        // 翻訳
        let titleJa = title;
        let descJa = cleanDescription;

        try {
            titleJa = LanguageApp.translate(title, 'en', 'ja');
            descJa = LanguageApp.translate(cleanDescription.substring(0, 200), 'en', 'ja');
            Utilities.sleep(1000);
        } catch (e) {
            console.warn('Translation failed', e);
        }

        const id = Utilities.getUuid();

        // 行追加
        sheet.appendRow([
            id,
            jurisdiction,
            title,
            titleJa,
            cleanDescription,
            descJa,
            link,
            formatDate(pubDate),
            ''
        ]);

        console.log(`Added (API): ${title}`);
    }
}

/**
 * APIエンドポイント (GET)
 * フロントエンドから呼び出される
 */
function doGet(e) {
    const accessKey = PropertiesService.getScriptProperties().getProperty('API_ACCESS_KEY');
    if (accessKey) {
        if (!e.parameter.key || e.parameter.key !== accessKey) {
            return createJsonOutput({ error: 'Unauthorized: Invalid or missing API Key' });
        }
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const type = e.parameter.type || 'articles';

    if (type === 'feeds') {
        const sheet = ss.getSheetByName(SHEET_FEEDS);
        if (!sheet) return createJsonOutput({ error: 'Feeds sheet not found' });

        const data = sheet.getDataRange().getValues();
        if (data.length <= 1) return createJsonOutput([]);

        const rows = data.slice(1);
        const feeds = rows.map(row => ({
            name: row[0],
            url: row[1],
            jurisdiction: row[2],
            translate: row[3]
        }));

        return createJsonOutput(feeds);
    } else {
        const sheet = ss.getSheetByName(SHEET_ARTICLES);
        if (!sheet) return createJsonOutput({ error: 'Articles sheet not found' });

        const data = sheet.getDataRange().getValues();
        if (data.length <= 1) return createJsonOutput([]);

        const rows = data.slice(1);
        const articles = rows.map(row => ({
            id: row[0],
            jurisdiction: row[1],
            title: row[2],
            titleJa: row[3],
            description: row[4],
            descriptionJa: row[5],
            link: row[6],
            lastUpdated: row[7]
        })).reverse();

        return createJsonOutput(articles);
    }
}

function createJsonOutput(data) {
    return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}

function getChildText(element, name, namespace) {
    const child = namespace ? element.getChild(name, namespace) : element.getChild(name);
    return child ? child.getText() : '';
}

function getExistingUrls(sheet) {
    const urls = new Set();
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return urls;
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

/**
 * 推奨RSSフィードを一括登録
 */
function registerRecommendedFeeds() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let feedsSheet = ss.getSheetByName(SHEET_FEEDS);

    if (!feedsSheet) {
        setup();
        feedsSheet = ss.getSheetByName(SHEET_FEEDS);
    }

    const existingData = feedsSheet.getDataRange().getValues();
    const existingUrls = new Set();
    for (let i = 1; i < existingData.length; i++) {
        existingUrls.add(existingData[i][1]);
    }

    // 推奨フィードリスト（拡大版）
    const recommendedFeeds = [
        // --- Global / International ---
        ['IAPP News', 'https://iapp.org/rss/news/', 'International', true],
        ['IAPP Daily Dashboard', 'https://iapp.org/rss/daily-dashboard/', 'Global', true],
        ['World Economic Forum', 'https://www.weforum.org/rss/', 'Global', true],
        ['ISO/IEC 42001 (AI Standards)', 'https://www.iso.org/iso/rss.xml?csnumber=42001&rss=detail', 'International', true],
        ['IEEE Standards Blog', 'https://standards.ieee.org/category/beyond-standards/feed/', 'International', true],

        // --- EU (European Union) ---
        ['EU AI Act News', 'https://artificialintelligenceact.eu/feed/', 'EU', true],
        ['European Commission Press', 'https://ec.europa.eu/commission/presscorner/home/rss_en.xml', 'EU', true],

        // --- US (United States) ---
        ['NIST News', 'https://www.nist.gov/news-events/news/rss.xml', 'US', true],
        ['FTC Press Releases', 'https://www.ftc.gov/feeds/press-release.xml', 'US', true],
        ['FTC Consumer Protection', 'https://www.ftc.gov/feeds/press-release-consumer-protection.xml', 'US', true],

        // --- UK (United Kingdom) ---
        ['UK DSIT', 'https://www.gov.uk/government/organisations/department-for-science-innovation-and-technology.atom', 'UK', true],
        ['UK CMA (Competition & Markets)', 'https://competitionandmarkets.blog.gov.uk/feed/', 'UK', true],
        ['UK FCA (Financial Conduct)', 'https://www.fca.org.uk/news/rss.xml', 'UK', true],
        ['UK RTA (Responsible Tech)', 'https://rtau.blog.gov.uk/feed/', 'UK', true],

        // --- Canada ---
        ['Canada OPC News', 'https://www.priv.gc.ca/en/rss/news/', 'Canada', true],
        ['Canada OPC Parliament', 'https://www.priv.gc.ca/en/rss/parl/', 'Canada', true],
        ['Canada Gazette Part I (Regulations)', 'https://gazette.gc.ca/rss/p1-eng.xml', 'Canada', true],
        ['Canada Gazette Part II (Official)', 'https://gazette.gc.ca/rss/p2-eng.xml', 'Canada', true],

        // --- Australia ---
        ['Australia OAIC', 'https://www.oaic.gov.au/rss/news', 'Australia', true],
        ['Australia DISR News', 'https://www.industry.gov.au/rss/news.xml', 'Australia', true],
        ['Australia DISR Media', 'https://www.industry.gov.au/rss/media-releases.xml', 'Australia', true],

        // --- India ---
        ['India RBI Press', 'https://rbi.org.in/pressreleases_rss.xml', 'India', true],
        ['India SEBI', 'https://www.sebi.gov.in/sebirss.xml', 'India', true],

        // --- China (News/Proxy) ---
        ['TechNode China', 'https://technode.com/feed/', 'China', true],
        ['SCMP Tech', 'https://www.scmp.com/rss/91/feed', 'China', true],

        // --- Japan ---
        ['経済産業省 (METI Journal)', 'https://journal.meti.go.jp/feed/', 'Japan', false], // Press feed 404, using Journal
        ['総務省 (MIC)', 'https://www.soumu.go.jp/news.rdf', 'Japan', false], // Updated URL
        ['厚生労働省 (MHLW)', 'https://www.mhlw.go.jp/stf/news.rdf', 'Japan', false],
        ['デジタル庁', 'https://www.digital.go.jp/rss/news.xml', 'Japan', false]
    ];

    let addedCount = 0;

    for (const feed of recommendedFeeds) {
        const [name, url, jurisdiction, translate] = feed;

        if (existingUrls.has(url)) {
            console.log(`Skipped (already exists): ${name}`);
            continue;
        }

        feedsSheet.appendRow([name, url, jurisdiction, translate]);
        existingUrls.add(url);
        addedCount++;
        console.log(`Added: ${name} (${jurisdiction})`);
    }

    console.log(`\n=== 完了 ===`);
    console.log(`新規追加: ${addedCount} 件`);
    console.log(`スキップ（既存）: ${recommendedFeeds.length - addedCount} 件`);
    return `${addedCount} feeds added.`;
}

/**
 * リンク切れのURLを自動修正する関数
 * これを実行すると、シート内の古い経済産業省・総務省のURLが新しいものに書き換わります。
 */
function fixBrokenFeeds() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_FEEDS);
    if (!sheet) {
        console.error('Feeds sheet not found.');
        return;
    }

    const data = sheet.getDataRange().getValues();
    // URLの置換マップ
    const replacements = {
        'https://www.meti.go.jp/press/index.rdf': 'https://journal.meti.go.jp/feed/',
        'https://www.soumu.go.jp/menu_news/s-news/rss.xml': 'https://www.soumu.go.jp/news.rdf'
    };

    let fixedCount = 0;

    // 1行目はヘッダーなので2行目(index 1)から
    for (let i = 1; i < data.length; i++) {
        const currentUrl = data[i][1]; // URL is in column B (index 1)

        if (replacements[currentUrl]) {
            const newUrl = replacements[currentUrl];
            // set value (row is i+1, col is 2)
            sheet.getRange(i + 1, 2).setValue(newUrl);

            // 名前も更新しておくと親切
            if (currentUrl.includes('meti.go.jp')) {
                sheet.getRange(i + 1, 1).setValue('経済産業省 (METI Journal)');
            }

            console.log(`Fixed: ${data[i][0]} -> ${newUrl}`);
            fixedCount++;
        }
    }

    if (fixedCount === 0) {
        console.log('No broken links found to fix.');
    } else {
        console.log(`Successfully fixed ${fixedCount} broken links.`);
    }
}
