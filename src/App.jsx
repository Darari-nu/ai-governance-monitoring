import React from "react";
import { Globe } from "./components/Globe";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "400px",
          height: "400px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle at 50% 30%, #ffffff, #e5e7eb 60%, #cbd5f5 100%)",
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.20)",
          overflow: "hidden",
        }}
      >
        {/* ここに回る地球儀 */}
        <Globe />
      </div>
    </div>
  );
}

export default App;
