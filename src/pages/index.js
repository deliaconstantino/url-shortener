import { useState } from "react";

function Index() {
  const [showForm, setShowForm] = useState(true);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  function handleChange(event) {
    setLongUrl(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch("/api/url", {
      method: "POST",
      body: JSON.stringify({ longUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    setShowForm(false);
    setLongUrl("");
    setShortUrl(data.shortUrl);
  }
  return (
    <>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <label>
            Url:
            <input
              type="text"
              name="url"
              value={longUrl}
              onChange={handleChange}
              placeholder="example.com"
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <div>{shortUrl}</div>
      )}
    </>
  );
}

export default Index;
