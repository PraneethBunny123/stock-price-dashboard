import { useEffect, useState } from 'react'
import './App.css'
import { fetchMultipleStocks } from './api';
import Loading from './components/Loading';
import Error from './components/Error';

const symbols = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"];

function App() {
    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadingStocks() {
            try {
                setLoading(true)
                setError(null)

                const results = await fetchMultipleStocks(symbols)
                setStocks(results)
            } catch(err) {
                console.error("Failed to fetch stocks", err)
                setError("Failed to fetch stock data. Please try again later!")
            } finally {
                setLoading(false)
            }
        }

        loadingStocks()
    }, [])

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-center">Stock Price Dashboard</h1>

            {loading && (
                <Loading />
            )}

            {error && !loading && (
                <Error error={error}/>
            )}

            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="py-2 px-4 text-left">Symbol</th>
                                <th className="py-2 px-4 text-left">Price</th>
                                <th className="py-2 px-4 text-left">Change %</th>
                            </tr>
                        </thead>

                        <tbody>
                            {stocks.map((stock) => (
                                <tr key={stock.symbol} className="border-b">
                                    <td className="py-2 px-4">{stock.symbol}</td>
                                    <td className="py-2 px-4">${stock.c.toFixed(2)}</td>
                                    <td className={`py-2 px-4 font-semibold ${stock.dp > 0 ? "text-green-600" : "text-red-600"}`}>
                                        {stock.dp.toFixed(2)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default App
