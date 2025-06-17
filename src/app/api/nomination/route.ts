import { NextResponse } from "next/server";
import { createNomination, getAllNominations } from "@/controllers/Nomination.controllers";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ success: false, error: "No data provided" }, { status: 400 });
    }
    if (!data.nominator || !data.nominee) {
        return NextResponse.json({ success: false, error: "Nominator and Nominee information is required" }, { status: 400 });
    }
    if (!data.documents || !data.documents.cvUrl || !data.documents.photoUrl) {
      return NextResponse.json({ success: false, error: "Documents with CV and Photo URLs are required" }, { status: 400 });
    }
    if (!data.documents.supportingDocsUrls || !Array.isArray(data.documents.supportingDocsUrls)) {
      return NextResponse.json({ success: false, error: "Supporting documents URLs must be an array" }, { status: 400 });
    } 


    const saved = await createNomination(data);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await getAllNominations();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}