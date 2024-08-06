import React from 'react';
import CandlestickChart from './Component/main-board/CandlestickChart';
import SymbolSearchDialog from "./Component/main-board/SymbolSearchDialog";
import { createTheme } from './theme';
import {ThemeProvider} from "@mui/material";
const theme = createTheme()

function App() {
    return (
        <ThemeProvider theme={theme}>

            <div>
                <SymbolSearchDialog/>
            </div>
            <div>
                <SymbolSearchDialog/>
            </div>

            <div>
                <h1>TradingView Candlestick Chart</h1>
                <CandlestickChart/>
            </div>
        </ThemeProvider>
    );
}

export default App;
