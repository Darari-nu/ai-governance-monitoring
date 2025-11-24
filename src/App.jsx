import React from "react";
import { Globe } from "./components/Globe";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url('/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 背景を少し白っぽくしてテキストを読みやすくするオーバーレイ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(248, 250, 252, 0.75)",
        }}
      />

      {/* Hero コンテンツ（タイトル＋地球儀） */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        {/* タイトル：画面幅に応じて縮む */}
        <h1
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            fontWeight: 800,
            color: "#0F172A",
            marginBottom: "0.5rem",
            letterSpacing: "-0.03em",
            textShadow: "0 0 30px rgba(255,255,255,0.9)",
            lineHeight: 1.1,
          }}
        >
          AI Governance
          <br />
          Monitor
        </h1>

        {/* サブタイトルもレスポンシブに */}
        <p
          style={{
            fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
            color: "#334155",
            marginBottom: "1.5rem",
          }}
        >
          Global Regulatory Insights
        </p>

        {/* Globe ラッパ
            - 幅は最大 480px、画面が狭いときは 90vw まで縮む
            - 高さは上からの 260px 分だけ表示し、下側を隠す
            - 上部はすべて見えていて、下側がマスクされるイメージ
        */}
        <div
          style={{
            width: "min(480px, 90vw)",
            height: "min(260px, 45vw)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto",
              width: "min(480px, 90vw)",
              height: "min(480px, 90vw)",
              top: 0, // 上は切らずにそのまま表示
            }}
          >
            <Globe />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
