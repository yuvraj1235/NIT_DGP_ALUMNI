export interface NominationForm {
  nominator: {
    name: string;
    affiliation: string;
    address: string;
    email: string;
    mobile: string;
    identityProof: string;
    category: string;
  };
  nominee: {
    name: string;
    fatherName: string;
    degree: string;
    specialization: string;
    passingYear: number;
    otherQualifications: string;
    currentPosition: string;
    currentOrg: string;
    pastPositions: string[];
    address: string;
    email: string;
    mobile: string;
    biography: string;
    awardsAndAchievements: {
      workDone: string;
      professionalAchievements: string;
      officialRecognitions: string;
    };
    linkedIn: string;
    extraInfo: string;
    nominatorAssessment: string;
  };
  documents: {
    cvUrl: string;
    photoUrl: string;
    supportingDocsUrls: string[];
  };
}