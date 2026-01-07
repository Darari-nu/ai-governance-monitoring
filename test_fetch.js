const GAS_API_URL = "https://script.google.com/macros/s/AKfycbx8Cqq5jUmeXW-kJfXQ7zAvuswp2pijHcmnySBsRRwW2eJ20olR6uJ_jL3urygIsCNxWw/exec";

async function testFetch() {
    console.log("Fetching from:", GAS_API_URL);
    try {
        const response = await fetch(GAS_API_URL, {
            redirect: 'follow'
        });
        console.log("Status:", response.status);
        console.log("Status Text:", response.statusText);
        console.log("Headers:", [...response.headers.entries()]);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const text = await response.text();
        console.log("Response Body Preview:", text.substring(0, 200));

        try {
            const data = JSON.parse(text);
            console.log("Parsed JSON length:", data.length);
            console.log("First item:", data[0]);
        } catch (e) {
            console.error("JSON Parse Error:", e);
        }

    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

testFetch();
