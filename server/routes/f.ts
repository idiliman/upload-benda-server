import { Hono } from "hono";
import s3Client from "../../lib/s3";
import sharp from "sharp";

export const f = new Hono()
  .post("/upload", async (c) => {
    const body = await c.req.parseBody();

    const file = body["file"];

    if (!file || !(file instanceof File) || file.size === 0) {
      return c.json({ success: false, message: "Invalid or empty file" }, 400);
    }

    if (file instanceof File) {
      const uniqueFileName = `${crypto.randomUUID()}-${file.name}`;

      let buffer: ArrayBuffer;
      if (file.type.startsWith("image/")) {
        const sharpBuffer = await sharp(await file.arrayBuffer())
          .resize({
            height: 1920,
            width: 1080,
            fit: "contain",
          })
          .toBuffer();
        buffer = new Uint8Array(sharpBuffer).buffer;
      } else {
        buffer = await file.arrayBuffer();
      }

      await s3Client.write(uniqueFileName, buffer);

      return c.json({ fileName: uniqueFileName });
    }
  })
  .get("/:fileName", async (c) => {
    const fileName = c.req.param("fileName");
    const metadata = s3Client.presign(fileName, {
      // Seconds
      //   expiresIn: 10,
      acl: "public-read",
      method: "GET",
    });
    return c.json({ fileName, metadata });
  });
