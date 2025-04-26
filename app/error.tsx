"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f9fafb",
        margin: "20px",
        borderRadius: "8px",
      }}
    >
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
  )
}
