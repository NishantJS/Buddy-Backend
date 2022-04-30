import { config } from "dotenv";
import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
config({ path: "../.env" });

const client = new S3Client({
  region: process.env.AWS__REGION,
  credentials: {
    accessKeyId: process.env.AWS__ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS__SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file, title) => {
  try {
    const pngMagicNumber = "89504e47";
    if (file?.buffer.toString("hex", 0, 4) !== pngMagicNumber) return false;

    // const fileStream = createReadStream(file.path);
    const uploadParams = {
      Bucket: process.env.AWS__PRODUCT_BUCKET,
      Body: file?.buffer,
      Key: title,
      ContentType: file?.mimetype,
    };

    const putCommand = new PutObjectCommand(uploadParams);
    await client.send(putCommand);
    return true;
  } catch (error) {
    return false;
  }
};

const downloadFile = async (title, seller) => {
  try {
    const downloadParams = {
      Bucket: process.env.AWS_PRODUCT_BUCKET,
      Key: seller + "/" + title,
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
    return { error: true, data: error?.Code || "Image not found!" };
  }
};

export default { uploadFile, uploadFile };
export { uploadFile, downloadFile };
