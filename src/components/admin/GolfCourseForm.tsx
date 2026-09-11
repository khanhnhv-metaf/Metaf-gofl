"use client";

import { useId, useState } from "react";
import type { GolfCourseRow } from "@/lib/data/types";
import { ImagesUploader, VideoUploader } from "./MediaUploader";

function Field({
  label,
  name,
  defaultValue,
  textarea,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  return (
    <div className="grid gap-1">
      <label htmlFor={name} className="text-xs font-medium text-ink-soft">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={3}
          className="rounded-lg border border-line bg-background px-3 py-2 text-sm outline-none focus:border-fairway-2"
        />
      ) : (
        <input
          id={name}
          name={name}
          defaultValue={defaultValue}
          required={required}
          className="rounded-lg border border-line bg-background px-3 py-2 text-sm outline-none focus:border-fairway-2"
        />
      )}
    </div>
  );
}

function PairedRow({
  label,
  nameVi,
  nameKr,
  defaultVi,
  defaultKr,
  textarea,
  required,
}: {
  label: string;
  nameVi: string;
  nameKr: string;
  defaultVi?: string;
  defaultKr?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2 border-t border-line py-3 sm:grid-cols-[140px_1fr_1fr] sm:items-start">
      <span className="pt-2 text-sm font-medium text-ink">{label}</span>
      <Field
        label="VI"
        name={nameVi}
        defaultValue={defaultVi}
        textarea={textarea}
        required={required}
      />
      <Field
        label="KR"
        name={nameKr}
        defaultValue={defaultKr}
        textarea={textarea}
        required={required}
      />
    </div>
  );
}

export default function GolfCourseForm({
  course,
  action,
}: {
  course?: GolfCourseRow;
  action: (formData: FormData) => void;
}) {
  const [images, setImages] = useState<string[]>(course?.images ?? []);
  const [videoUrl, setVideoUrl] = useState<string | null>(
    course?.video_url ?? null
  );
  const newId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const pathPrefix = `golf/${course?.slug ?? `new-${newId}`}`;

  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2">
        <div className="grid gap-1">
          <label htmlFor="slug" className="text-xs font-medium text-ink-soft">
            Slug (đường dẫn, không dấu, không đổi được sau khi tạo)
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={course?.slug}
            required
            readOnly={!!course}
            pattern="[a-z0-9-]+"
            className="rounded-lg border border-line bg-background px-3 py-2 text-sm outline-none read-only:opacity-60 focus:border-fairway-2"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="display_order" className="text-xs font-medium text-ink-soft">
            Thứ tự hiển thị
          </label>
          <input
            id="display_order"
            name="display_order"
            type="number"
            defaultValue={course?.display_order ?? 0}
            className="rounded-lg border border-line bg-background px-3 py-2 text-sm outline-none focus:border-fairway-2"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured_on_home"
            defaultChecked={course?.featured_on_home}
          />
          Hiển thị ở trang chủ (3 sân golf nổi bật)
        </label>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-5">
        <PairedRow
          label="Tên sân golf"
          nameVi="name_vi"
          nameKr="name_kr"
          defaultVi={course?.name_vi}
          defaultKr={course?.name_kr}
          required
        />
        <PairedRow
          label="Địa điểm"
          nameVi="location_vi"
          nameKr="location_kr"
          defaultVi={course?.location_vi}
          defaultKr={course?.location_kr}
          required
        />
        <PairedRow
          label="Khoảng cách (từ trung tâm HN)"
          nameVi="distance_vi"
          nameKr="distance_kr"
          defaultVi={course?.distance_vi}
          defaultKr={course?.distance_kr}
          required
        />
        <PairedRow
          label="Khoảng cách (từ homestay) — chỉ dùng khi hiển thị ở trang chủ"
          nameVi="distance_from_homestay_vi"
          nameKr="distance_from_homestay_kr"
          defaultVi={course?.distance_from_homestay_vi ?? ""}
          defaultKr={course?.distance_from_homestay_kr ?? ""}
        />
        <PairedRow
          label="Số hố"
          nameVi="holes_vi"
          nameKr="holes_kr"
          defaultVi={course?.holes_vi}
          defaultKr={course?.holes_kr}
          required
        />
        <PairedRow
          label="Điểm nổi bật (badge)"
          nameVi="highlight_vi"
          nameKr="highlight_kr"
          defaultVi={course?.highlight_vi}
          defaultKr={course?.highlight_kr}
          required
        />
        <PairedRow
          label="Mô tả"
          nameVi="text_vi"
          nameKr="text_kr"
          defaultVi={course?.text_vi}
          defaultKr={course?.text_kr}
          textarea
          required
        />
        <PairedRow
          label="Chi tiết nổi bật (mỗi dòng 1 ý)"
          nameVi="details_vi"
          nameKr="details_kr"
          defaultVi={course?.details_vi?.join("\n")}
          defaultKr={course?.details_kr?.join("\n")}
          textarea
        />
      </div>

      <div className="rounded-2xl border border-line bg-surface p-5">
        <span className="mb-2 block text-sm font-semibold text-fairway-2">
          Hình ảnh (ảnh đầu tiên là ảnh bìa)
        </span>
        <ImagesUploader
          pathPrefix={pathPrefix}
          images={images}
          onChange={setImages}
          hiddenFieldName="images"
        />
      </div>

      <div className="rounded-2xl border border-line bg-surface p-5">
        <span className="mb-2 block text-sm font-semibold text-fairway-2">
          Video flycam
        </span>
        <VideoUploader
          pathPrefix={pathPrefix}
          videoUrl={videoUrl}
          onChange={setVideoUrl}
          hiddenFieldName="video_url"
        />
      </div>

      <button
        type="submit"
        className="w-fit rounded-full bg-brass px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Lưu sân golf
      </button>
    </form>
  );
}
