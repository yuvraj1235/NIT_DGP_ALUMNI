import cloudinary from "@/utils/cloudinary";

export async function handleFileUploads(formData: FormData) {
  const uploads: { field: string; file: File | null }[] = [
    { field: "cvUpload", file: formData.get("cvUpload") as File },
    { field: "photoUpload", file: formData.get("photoUpload") as File },
  ];

  const supportingDocs = formData.getAll("documentsUpload") as File[];
  const uploaded: Record<string, string | string[]> = {};

  // Handle CV and Photo
  for (const { field, file } of uploads) {
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder: field === "cvUpload" ? "documents/cv" : "documents/photo",
        public_id: file.name.split(".")[0],
        resource_type: "auto",
      });

      uploaded[field] = result.secure_url;
    }
  }

  // Handle supporting documents
  const supportingUrls: string[] = [];
  for (const doc of supportingDocs) {
    if (doc && doc.size > 0) {
      const buffer = Buffer.from(await doc.arrayBuffer());
      const base64 = `data:${doc.type};base64,${buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder: "documents/supporting",
        public_id: doc.name.split(".")[0],
        resource_type: "auto",
      });

      supportingUrls.push(result.secure_url);
    }
  }

  uploaded["documentsUpload"] = supportingUrls;

  return uploaded;
}