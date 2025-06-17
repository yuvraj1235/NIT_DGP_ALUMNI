import { handleFileUploads } from "@/controllers/Upload.controllers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const uploaded = await handleFileUploads(formData); 
    return NextResponse.json({ success: true, uploaded });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}