import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin/auth";
import { deleteObject } from "@/lib/r2/delete";

export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const key = typeof body?.key === "string" ? body.key : null;
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  try {
    await deleteObject(key);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("delete-object:", error);
    return NextResponse.json(
      { error: "Failed to delete object" },
      { status: 502 }
    );
  }
}
