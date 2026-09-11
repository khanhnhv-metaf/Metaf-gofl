export function uploadFileToR2(
  url: string,
  file: File,
  contentType: string,
  onProgress?: (percent: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", contentType);

    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else
        reject(
          new Error(`Upload to storage failed (status ${xhr.status}). Please try again.`)
        );
    };

    xhr.onerror = () =>
      reject(new Error("Network error while uploading the file. Please try again."));
    xhr.onabort = () => reject(new Error("Upload was cancelled."));

    xhr.send(file);
  });
}

export async function presignUpload(input: {
  filename: string;
  contentType: string;
  folder: string;
}): Promise<{ url: string; key: string }> {
  const res = await fetch("/api/admin/presign-upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? "Không lấy được URL upload");
  }
  return res.json();
}

export async function deleteR2Object(key: string): Promise<void> {
  await fetch("/api/admin/delete-object", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  }).catch(() => {
    // Best-effort cleanup — an orphaned object in R2 is harmless.
  });
}
