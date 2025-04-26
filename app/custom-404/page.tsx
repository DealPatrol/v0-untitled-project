export const dynamic = "force-static"

export default function Custom404Page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "#e11d48" /* rose-600 */,
        color: "white",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: "bold",
          margin: "0",
          lineHeight: "1",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "normal",
          margin: "0.5rem 0 1.5rem",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          maxWidth: "28rem",
          marginBottom: "2rem",
        }}
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <a
          href="/"
          style={{
            backgroundColor: "white",
            color: "#e11d48",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Return Home
        </a>
        <a
          href="/contact"
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.375rem",
            textDecoration: "none",
            fontWeight: "500",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}
