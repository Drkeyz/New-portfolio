import { ImageResponse } from "next/og";
import { site } from "@content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Typographic Open Graph image. No photo, by design. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F5F2",
          color: "#0E0E0E",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#6B6B66" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#C89B3C" }} />
          {site.availability}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 48, marginTop: 24, letterSpacing: "-0.02em", color: "#6B6B66" }}>
            {`${site.role}. Complex problems, made simple.`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
