import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import Papa from 'papaparse';

const CandlestickChart = () => {
    const chartContainerRef = useRef();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/EURUSD=X.csv');
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);
            Papa.parse(csv, {
                header: true,
                complete: (results) => {
                    const parsedData = results.data.map((row) => ({
                        time: new Date(row.Date).getTime() / 1000,
                        open: parseFloat(row.Open),
                        high: parseFloat(row.High),
                        low: parseFloat(row.Low),
                        close: parseFloat(row.Close),
                    }));
                    setData(parsedData);
                },
            });
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const chartOptions = {
                layout: {
                    textColor: 'black',
                    background: { type: 'solid', color: 'white' },
                },
            };

            const chart = createChart(chartContainerRef.current, chartOptions);
            const candlestickSeries = chart.addCandlestickSeries({
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderVisible: false,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350',
            });
            // const data = [{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 }, { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 }, { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 }, { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 }, { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 }, { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 }, { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 }, { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 }, { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 }, { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 }];

            candlestickSeries.setData(data);
            chart.timeScale().fitContent();

            return () => {
                chart.remove();
            };
        }
    }, [data]);

    return <div ref={chartContainerRef} style={{ width: '700px', height: '500px' }} />;
};

export default CandlestickChart;
