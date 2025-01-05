export default function Message(data) {
  return (
    <>
      <div key={data.key} className="message">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "10px", maxWidth: "90%" }}>
            <img
              src={data.photo}
              alt="Profile"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            <div style={{ maxWidth: "90%" }}>
              <strong style={{ color: data.color }}>{data.name}</strong>
              <p style={{ margin: 0, marginTop: "0.5rem" }}>{data.message}</p>
            </div>
          </div>
          <small style={{ minWidth: "15%" }}>{data.date}</small>
        </div>
      </div>
    </>
  );
}
