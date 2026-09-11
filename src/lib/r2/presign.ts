import "server-only";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createR2Client, getR2BucketName } from "@/lib/r2/client";

const PRESIGN_EXPIRES_SECONDS = 300;

export type CreatePresignedPutUrlInput = {
  key: string;
  contentType: string;
};

export async function createPresignedPutUrl({
  key,
  contentType,
}: CreatePresignedPutUrlInput): Promise<string> {
  const client = createR2Client();
  const command = new PutObjectCommand({
    Bucket: getR2BucketName(),
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(client, command, {
    expiresIn: PRESIGN_EXPIRES_SECONDS,
  });
}
