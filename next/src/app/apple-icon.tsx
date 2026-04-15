import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "black",
          borderRadius: "22%",
        }}
      >
        <span
          style={{
            fontSize: 110,
            fontWeight: 700,
            color: "white",
            fontFamily: "Inter, sans-serif",
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          TS
        </span>
        <span
          style={{
            fontSize: 110,
            fontWeight: 700,
            color: "#4EC5D4",
            fontFamily: "Inter, sans-serif",
            lineHeight: 1,
          }}
        >
          .
        </span>
      </div>
    ),
    { ...size }
  );
}
