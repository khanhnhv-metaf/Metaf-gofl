"use client";

import { useRef, useState } from "react";
import { getPublicUrl, keyFromPublicUrl } from "@/lib/r2/urls";
import { deleteR2Object, presignUpload, uploadFileToR2 } from "./uploadToR2";

/** Ordered image list — first image is the cover photo. */
export function ImagesUploader({
  pathPrefix,
  images,
  onChange,
  hiddenFieldName,
}: {
  pathPrefix: string;
  images: string[];
  onChange: (images: string[]) => void;
  hiddenFieldName: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const { url, key } = await presignUpload({
          filename: file.name,
          contentType: file.type,
          folder: pathPrefix,
        });
        await uploadFileToR2(url, file, file.type);
        uploaded.push(getPublicUrl(key));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Tải ảnh lên thất bại");
      }
    }

    onChange([...images, ...uploaded]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function remove(index: number) {
    const url = images[index];
    onChange(images.filter((_, i) => i !== index));
    const key = keyFromPublicUrl(url);
    if (key) deleteR2Object(key);
  }

  function move(index: number, dir: -1 | 1) {
    const next = [...images];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="grid gap-2">
      {images.map((url) => (
        <input key={url} type="hidden" name={hiddenFieldName} value={url} />
      ))}

      {images.length > 0 && (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {images.map((url, i) => (
            <li key={url} className="relative overflow-hidden rounded-lg border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="aspect-square w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  Cover
                </span>
              )}
              <div className="flex items-center justify-between gap-1 bg-white/90 px-1 py-1 text-xs">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0}>
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === images.length - 1}
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-red-600"
                >
                  Xoá
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        disabled={uploading}
        onChange={(e) => handleFiles(e.target.files)}
        className="text-sm"
      />
      {uploading && <p className="text-sm text-ink-soft">Đang tải ảnh lên...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

/** Single flycam video, uploaded via a presigned R2 URL with a progress bar. */
export function VideoUploader({
  pathPrefix,
  videoUrl,
  onChange,
  hiddenFieldName,
}: {
  pathPrefix: string;
  videoUrl: string | null;
  onChange: (url: string | null) => void;
  hiddenFieldName: string;
}) {
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setProgress(0);

    try {
      const { url, key } = await presignUpload({
        filename: file.name,
        contentType: file.type,
        folder: pathPrefix,
      });
      await uploadFileToR2(url, file, file.type, setProgress);

      const oldKey = videoUrl ? keyFromPublicUrl(videoUrl) : null;
      onChange(getPublicUrl(key));
      if (oldKey && oldKey !== key) deleteR2Object(oldKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tải video lên thất bại");
    } finally {
      setProgress(null);
    }
  }

  function handleRemove() {
    if (!videoUrl) return;
    const key = keyFromPublicUrl(videoUrl);
    if (key) deleteR2Object(key);
    onChange(null);
  }

  return (
    <div className="grid gap-2">
      {videoUrl && (
        <input type="hidden" name={hiddenFieldName} value={videoUrl} />
      )}

      {videoUrl && (
        <video src={videoUrl} controls className="max-h-64 rounded-lg border" />
      )}

      <input
        type="file"
        accept="video/*"
        disabled={progress !== null}
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="text-sm"
      />

      {progress !== null && (
        <div className="h-2 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full bg-brass transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {progress !== null && (
        <p className="text-sm text-ink-soft">Đang tải video lên... {progress}%</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {videoUrl && progress === null && (
        <button
          type="button"
          onClick={handleRemove}
          className="w-fit text-sm text-red-600"
        >
          Xoá video
        </button>
      )}
    </div>
  );
}
