"use client";

import { useId, useState } from "react";
import type { PackageRow } from "@/lib/data/types";
import { ImagesUploader } from "./MediaUploader";

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

export default function PackageForm({
  pkg,
  action,
}: {
  pkg?: PackageRow;
  action: (formData: FormData) => void;
}) {
  const [images, setImages] = useState<string[]>(
    pkg?.image_url ? [pkg.image_url] : []
  );
  const newId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const pathPrefix = `packages/${pkg?.slug ?? `new-${newId}`}`;

  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2">
        <div className="grid gap-1">
          <label htmlFor="slug" className="text-xs font-medium text-ink-soft">
            Slug (không đổi được sau khi tạo)
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={pkg?.slug}
            required
            readOnly={!!pkg}
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
            defaultValue={pkg?.display_order ?? 0}
            className="rounded-lg border border-line bg-background px-3 py-2 text-sm outline-none focus:border-fairway-2"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={pkg?.featured} />
          Gói nổi bật (viền vàng)
        </label>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-5">
        <PairedRow
          label="Thời lượng (tag)"
          nameVi="tag_vi"
          nameKr="tag_kr"
          defaultVi={pkg?.tag_vi}
          defaultKr={pkg?.tag_kr}
          required
        />
        <PairedRow
          label="Tên gói"
          nameVi="name_vi"
          nameKr="name_kr"
          defaultVi={pkg?.name_vi}
          defaultKr={pkg?.name_kr}
          required
        />
        <PairedRow
          label="Mô tả"
          nameVi="text_vi"
          nameKr="text_kr"
          defaultVi={pkg?.text_vi}
          defaultKr={pkg?.text_kr}
          textarea
          required
        />
        <PairedRow
          label="Bao gồm (mỗi dòng 1 ý)"
          nameVi="includes_vi"
          nameKr="includes_kr"
          defaultVi={pkg?.includes_vi?.join("\n")}
          defaultKr={pkg?.includes_kr?.join("\n")}
          textarea
        />
      </div>

      <div className="rounded-2xl border border-line bg-surface p-5">
        <span className="mb-2 block text-sm font-semibold text-fairway-2">
          Hình ảnh (1 ảnh đại diện cho gói)
        </span>
        <ImagesUploader
          pathPrefix={pathPrefix}
          images={images}
          onChange={(next) => setImages(next.slice(-1))}
          hiddenFieldName="image_url"
        />
      </div>

      <button
        type="submit"
        className="w-fit rounded-full bg-brass px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Lưu gói dịch vụ
      </button>
    </form>
  );
}
