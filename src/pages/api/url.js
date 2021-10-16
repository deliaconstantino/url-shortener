export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body.longUrl)
    //put it in database
    res.status(200).json({ shortUrl: "shorturl" })
  }
}
