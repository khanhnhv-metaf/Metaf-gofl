import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin/auth";
import { createPresignedPutUrl } from "@/lib/r2/presign";
import { buildObjectKey } from "@/lib/r2/key";

export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const filename = typeof body?.filename === "string" ? body.filename : null;
  const contentType =
    typeof body?.contentType === "string" ? body.contentType : null;
  const folder = typeof body?.folder === "string" ? body.folder : null;

  if (!filename || !contentType || !folder) {
    return NextResponse.json(
      { error: "Missing filename, contentType or folder" },
      { status: 400 }
    );
  }

  let key: string;
  try {
    key = buildObjectKey(folder, filename);
  } catch {
    return NextResponse.json({ error: "Invalid upload folder" }, { status: 400 });
  }

  try {
    const url = await createPresignedPutUrl({ key, contentType });
    return NextResponse.json({ url, key });
  } catch (error) {
    console.error("presign-upload:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 502 }
    );
  }
}
