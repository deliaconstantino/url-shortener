import { PrismaClient } from "@prisma/client";
import shortHash from "short-hash";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const longUrl = new URL(req.body.longUrl);

      let row = await prisma.url.findUnique({ where: { longUrl } });
      if (!row) {
        row = await prisma.url.create({
          data: { shortUrl: shortHash(longUrl), longUrl },
        });
      }

      res.status(200).json({ shortUrl: row.shortUrl });
    } catch (error) {
      res.status(400).json({ errorMessage: error.code });
    }
  } else if (req.method === "GET") {
    console.log(req.params);
  }
}
