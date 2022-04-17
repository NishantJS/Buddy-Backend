import { config } from "dotenv";
import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { createReadStream } from "fs";
import { resolve } from "path";
config({ path: "../.env" });

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file, title) => {
  const fileStream = createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_PRODUCT_BUCKET,
    Body: fileStream,
    Key: `${title}.png`,
    ContentType: file?.mimetype,
  };

  const putCommand = new PutObjectCommand(uploadParams);
  return await client.send(putCommand);
};

const downloadFile = async (title) => {
  try {
    const downloadParams = {
      Bucket: process.env.AWS_PRODUCT_BUCKET,
      Key: title,
    };

    const getCommand = new GetObjectCommand(downloadParams);
    const { Body } = await client.send(getCommand);

    const streamToString = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks)));
      });

    const bodyContents = await streamToString(Body);
    return { error: false, data: bodyContents };
  } catch (error) {
    return { error: true, data: "Image not found!" };
  }
};

export default { uploadFile };
export { uploadFile, downloadFile };
