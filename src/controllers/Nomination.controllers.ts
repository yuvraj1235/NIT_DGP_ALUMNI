import Nomination from "@/models/Nomination.models";
import { dbConnect } from "@/lib/dbConnect";

export async function createNomination(data: any) {
  // Ensure the database connection is established
  await dbConnect();


  try {
    // Create a new nomination document
    const nomination = await Nomination.create(data);
    console.log("✅ Nomination created successfully:", nomination);
    // Return the created nomination
    return {
      success: true,
      nomination,
    };
  } catch (error) {
    console.error("❌ Error creating nomination:", error);
    throw new Error("Nomination creation failed");
  }
}

export async function getAllNominations() {
  await dbConnect();
  const nominations = await Nomination.find({});
  return nominations;
}