import Error from "next/error";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function ShortUrl() {
  return <Error statusCode="404" />;
}

export async function getServerSideProps(context) {
  const shortUrl = context.params.shortUrl;
  let row = await prisma.url.findUnique({ where: { shortUrl } });

  if (row) {
    return {
      redirect: {
        destination: row.longUrl,
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default ShortUrl;
