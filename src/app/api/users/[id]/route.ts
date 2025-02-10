import users from "@/constants/users.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // `params` should be awaited before using its properties.

  const user = users.find((it) => it.id === id);

  return NextResponse.json(user);
}
