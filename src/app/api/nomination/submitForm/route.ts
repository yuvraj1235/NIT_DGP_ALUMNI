
import { NextRequest, NextResponse } from "next/server";
import { createNomination } from "@/controllers/Nomination.controllers";
import cloudinary from "@/utils/cloudinary";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    // Parse multipart form data (Next.js doesn't do it automatically)
    const formData = await req.formData();


    // Extract fields
    const jsonData = formData.get("data") as string;

    
    const parsedData = JSON.parse(jsonData); 


    // getting all the files
    const cv = formData.get("cv") as File | null;
    const photo = formData.get("photo") as File | null;
    const supportingDocs = formData.getAll("supportingDocs") as File[];

    // connect to the database
    await dbConnect();
    

    // Upload files to Cloudinary

    // Prepare an object to hold uploaded file URLs
    const uploadedFiles: {
      cvUrl?: string;
      photoUrl?: string;
      supportingDocsUrls?: string[];
    } = {};
    
    // Function to upload a file to Cloudinary
    const uploadToCloudinary = async (file: File) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploaded = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "nominations" }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          })
          .end(buffer);
      });

      return uploaded.secure_url;
    };
    
    // Upload each file if it exists
    if (cv) uploadedFiles.cvUrl = await uploadToCloudinary(cv);
    if (photo) uploadedFiles.photoUrl = await uploadToCloudinary(photo);
    if (supportingDocs.length > 0) {
      uploadedFiles.supportingDocsUrls = await Promise.all(
        supportingDocs.map((doc) => uploadToCloudinary(doc))
      );
    }
    

    // Merge uploaded URLs into  the proper data structure
    const finalData = {
      nominator: {
        name: parsedData.nominatorName,
        affiliation: parsedData.nominatorAffiliation,
        address: parsedData.nominatorAddress,
        email: parsedData.nominatorEmail,
        mobile: parsedData.nominatorMobile,
        identityProof: parsedData.nominatorCategory,
        category: parsedData.nominationCategories?.join(", "),
      },
      nominee: {
        name: parsedData.nomineeName,
        fatherName: parsedData.nomineeFatherName,
        degree: parsedData.nomineeDegree,
        specialization: parsedData.nomineeBranch,
        passingYear: Number(parsedData.nomineePassingYear),
        otherQualifications: parsedData.nomineeOtherQualifications,
        currentPosition: parsedData.nomineeCurrentPosition,
        currentOrg: "", // you can add org field if you want separately
        pastPositions: parsedData.nomineePastPositions?.split("\n") || [],
        address: parsedData.nomineeAddress,
        email: parsedData.nomineeEmail,
        mobile: parsedData.nomineeMobile,
        biography: parsedData.nomineeBiography,
        awardsAndAchievements: {
          workDone: "", // not available in form, you can map later
          professionalAchievements: parsedData.nomineeAwards,
          officialRecognitions: "",
        },
        linkedIn: parsedData.nomineeLinkedIn,
        extraInfo: parsedData.nomineeAdditionalInfo,
        nominatorAssessment: parsedData.nominatorAssessment,
      },
      documents: uploadedFiles,
    };
    
    // Create the nomination in the database
    const result = await createNomination(finalData);

    

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("❌ Upload/Nomination failed:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}