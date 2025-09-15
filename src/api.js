const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchStockQuote(symbol) {
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
    if (!res.ok) {
        throw new Error(`Error fetching ${symbol}: ${res.status}`);
    }

    const resData = await res.json();

    return resData
}

export async function fetchMultipleStocks(symbols) {
    const results = [];
    for (const symbol of symbols) {
        const data = await fetchStockQuote(symbol);
        results.push({
            symbol,
            c: data.c,
            dp: data.dp,
        });
    }
    return results;
}
