import React from 'react';
import CandlestickChart from './Component/main-board/CandlestickChart';
import SymbolSearchDialog from "./Component/main-board/SymbolSearchDialog";

function App() {
    return (
        <>
            <div>
                <SymbolSearchDialog/>
            </div>
            <div>
                <h1>TradingView Candlestick Chart</h1>
                <CandlestickChart/>
            </div>
        </>
    );
}

export default App;
