"use client";

/**
 * Root error boundary. Replaces Next's synthesised default so the fallback is
 * on-brand rather than an unstyled stack trace, and renders its own <html>
 * because it substitutes for the whole document.
 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          backgroundColor: "#C8FD00",
          color: "#0A0709",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            Snake eyes
          </p>

          <h1
            style={{
              margin: "0.75rem 0 0",
              fontSize: "clamp(2.5rem, 9vw, 4.5rem)",
              lineHeight: 0.9,
              textTransform: "uppercase",
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            The table
            <br />
            went cold
          </h1>

          <p style={{ margin: "1.5rem 0 0", fontSize: "1.05rem", opacity: 0.8 }}>
            Something broke on our end. Brett is looking into it.
          </p>

          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "0.9rem 2rem",
              border: "3px solid #0A0709",
              borderRadius: "0.75rem",
              backgroundColor: "#0A0709",
              color: "#C8FD00",
              boxShadow: "6px 6px 0 #E0427F",
              fontSize: "1rem",
              fontWeight: 800,
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Roll again
          </button>
        </div>
      </body>
    </html>
  );
}
