import { ImageResponse } from "next/og";

export const alt = "PhoneHub | Premium smartphones, new and refurbished";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: "linear-gradient(135deg, #06070c 0%, #0b1224 55%, #101a35 100%)",
          color: "#e9ecf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #38bdf8, #2563eb)",
              color: "#ffffff",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            P
          </div>
          <div style={{ display: "flex", alignItems: "baseline", fontSize: 44, fontWeight: 700 }}>
            <span style={{ letterSpacing: -1 }}>Phone</span>
            <span style={{ letterSpacing: -1, color: "#38bdf8" }}>Hub</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 66,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: -2.5,
              }}
            >
              Flagship phones,
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 66,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: -2.5,
                color: "#7dd3fc",
              }}
            >
              without the flagship markup.
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9aa3b8" }}>
            iPhone · Galaxy · Pixel · Xiaomi · free 2-day shipping, 24-month warranty
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
