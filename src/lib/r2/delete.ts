import "server-only";

import { DeleteObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";
import { createR2Client, getR2BucketName } from "@/lib/r2/client";

const NOT_FOUND_ERROR_NAMES = new Set(["NoSuchKey", "NotFound"]);

export async function deleteObject(key: string): Promise<void> {
  const client = createR2Client();
  try {
    await client.send(
      new DeleteObjectCommand({ Bucket: getR2BucketName(), Key: key })
    );
  } catch (error) {
    if (
      error instanceof S3ServiceException &&
      (NOT_FOUND_ERROR_NAMES.has(error.name) ||
        error.$metadata?.httpStatusCode === 404)
    ) {
      return;
    }
    throw error;
  }
}
