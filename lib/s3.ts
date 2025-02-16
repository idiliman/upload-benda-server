import { S3Client } from "bun";

const s3Client = new S3Client({
  accessKeyId: process.env.BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.BUCKET_SECRET_KEY,
  bucket: process.env.BUCKET_NAME,
  region: process.env.BUCKET_REGION,
});

export default s3Client;
