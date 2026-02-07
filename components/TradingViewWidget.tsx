// TradingViewWidget.jsx
"use client"
import useTradingViewWidget from '@/hooks/useTradingViewWidget';
import { cn } from '@/lib/utils';
import { memo, useRef } from 'react';

// Interface is a way to define a shape of an object .
interface TradingViewWidgetProps {
    title: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height?: number;
    className?: string;
}
function TradingViewWidget({ title, scriptUrl, config, height, className }: TradingViewWidgetProps) {
    const containerRef = useTradingViewWidget(scriptUrl, config, height)



    return (
        <div className='w-full'>
            {title && <h3 className='text-2xl font-bold'>{title}</h3>}
            <div className={cn(`tradingview-widget-container`, className)} ref={containerRef} style={{ height: "100%", width: "100%" }}>
                <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
                <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener nofollow" target="_blank"><span className="blue-text">AAPL stock chart</span></a><span className="trademark"> by TradingView</span></div>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
