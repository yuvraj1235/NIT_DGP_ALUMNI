import mongoose from "mongoose";

const NominationSchema = new mongoose.Schema({
  nominator: {
    name: String,
    affiliation: String,
    address: String,
    email: String,
    mobile: String,
    identityProof: {
      type: String,
      enum: ["Alumni", "Faculty", "Senate Member", "Others"],
    },
    category: String,
  },
  nominee: {
    name: String,
    fatherName: String,
    degree: String,
    specialization: String,
    passingYear: Number,
    otherQualifications: String,
    currentPosition: String,
    currentOrg: String,
    pastPositions: [String],
    address: String,
    email: String,
    mobile: String,
    biography: String,
    awardsAndAchievements: {
      workDone: String,
      professionalAchievements: String,
      officialRecognitions: String,
    },
    linkedIn: String,
    extraInfo: String,
    nominatorAssessment: String,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  documents: {
    cvUrl: String,
    photoUrl: String,
    supportingDocsUrls: [String],
  },
});

export default mongoose.models.Nomination ||
  mongoose.model("Nomination", NominationSchema);