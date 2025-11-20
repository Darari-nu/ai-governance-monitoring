# AI Regulation Site Check Command (V7 - JSON Mode)

Follow these steps to check AI regulation sites and generate updates:

## Steps

### 1. Get Monitoring List from Google Spreadsheet
- Spreadsheet ID: `{SPREADSHEET_ID}` (Set on first run)
- Columns:
  - A: Country
  - B: Target URL
  - C: Notification Email (Optional)

### 2. Check Each URL
For each row:
1. Access the URL.
2. Use WebFetch tool to get content.
3. Check for updates regarding AI regulation.
4. If updated, extract/generate:
   - Title (English)
   - Summary (English): 2-3 sentences.
   - Summary (Japanese): Translate the English summary to Japanese (2-3 sentences).
   - Date (YYYY-MM-DD)
   - URL (Source Link)

### 3. Update Data File
- Read `public/data/articles.json`.
- If the file doesn't exist, create an empty array `[]`.
- Parse the JSON.
- Prepend the new article object to the array:
  ```json
  {
    "id": "unique-id-based-on-title",
    "country": "Country Code",
    "date": "YYYY-MM-DD",
    "title": "Title",
    "summary_en": "Summary English",
    "summary_ja": "Summary Japanese",
    "url": "Source URL"
  }
  ```
- Write the updated array back to `public/data/articles.json`.

### 4. Report Results
- Number of sites checked.
- Number of updates found.
- Titles of added articles.
- Any errors.

## Notes
- Ensure valid JSON format.
- Generate a unique ID (e.g., kebab-case title).
