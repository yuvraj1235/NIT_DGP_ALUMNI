import { v2 as cloudinary } from 'cloudinary';
import axios from "axios";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default cloudinary;


// export const uploadToCloudinary = async (
//   file: File,
//   uploadPreset: string = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
//   folder: string = "nominations"
// ): Promise<string> => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", uploadPreset);
//   formData.append("folder", folder);

//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

//   if (!cloudName) {
//     throw new Error("Cloudinary cloud name not configured in environment variables");
//   }

//   try {
//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     return response.data.secure_url; // uploaded file URL
//   } catch (error: any) {
//     throw new Error(
//       error?.response?.data?.error?.message || "Cloudinary upload failed"
//     );
//   }
// };