"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#f9fafb",
          }}
        >
          <h1
            style={{
              fontSize: "6rem",
              fontWeight: "bold",
              color: "#d1d5db",
              margin: "0",
            }}
          >
            Error
          </h1>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "normal",
              margin: "10px 0 20px",
            }}
          >
            Something went wrong!
          </h2>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: "#e11d48",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
