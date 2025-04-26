function Error({ statusCode }) {
  return (
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
        {statusCode || "Error"}
      </h1>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "normal",
          margin: "10px 0 20px",
        }}
      >
        {statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}
      </h2>
      <div>
        <a
          href="/"
          style={{
            backgroundColor: "#e11d48",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: "500",
            display: "inline-block",
          }}
        >
          Return Home
        </a>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
