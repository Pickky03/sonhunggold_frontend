"use client"

export default function GoldChart() {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-yellow-400/30">
      <iframe
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_abc&symbol=OANDA%3AXAUUSD&interval=1&theme=dark&style=1&locale=vi"
        width="100%"
        height="100%"
        style={{ minHeight: "400px" }}
        frameBorder="0"
        allowTransparency
        scrolling="no"
      ></iframe>
    </div>
  )
}
