import Nomination from "@/models/Nomination.models";
import { dbConnect } from "@/lib/dbConnect";

export async function createNomination (data:any){
    await dbConnect();
    const result = await Nomination.create(data);
    return result;
}


export async function getAllNominations() {
  await dbConnect();
  const nominations = await Nomination.find({});
  return nominations;
}