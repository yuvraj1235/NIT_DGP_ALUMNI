import { z } from "zod";

// Regex for Indian mobile numbers
const indianMobileRegex = /^[6-9]\d{9}$/;

export const nominationSchema = z.object({
  // NOMINATOR
  nominatorName: z.string().min(2, "Nominator's name is required"),
  nominatorAffiliation: z.string().min(2, "Affiliation is required"),
  nominatorAddress: z.string().min(10, "Full address is required"),
  nominatorEmail: z.string().email("Enter a valid email address"),
  nominatorMobile: z.string().regex(indianMobileRegex, "Enter a valid Indian mobile number"),
  nominatorCategory: z.enum(["Alumni", "Faculty", "Senate Member", "Others"], {
    errorMap: () => ({ message: "Select a valid identity category" }),
  }),
  nominationCategories: z
    .array(z.string())
    .min(1, "Select at least one nomination category"),

  // NOMINEE
  nomineeName: z.string().min(2, "Nominee's name is required"),
  nomineeFatherName: z.string().min(2, "Father's name is required"),
  nomineeDegree: z.string().min(2, "Degree is required"),
  nomineeBranch: z.string().min(2, "Branch/Specialization is required"),
  nomineePassingYear: z
    .string()
    .refine(
      (year) => {
        const y = parseInt(year);
        return y >= 1960 && y <= new Date().getFullYear();
      },
      { message: "Enter a valid year of passing" }
    ),
  nomineeOtherQualifications: z.string().optional(),
  nomineeCurrentPosition: z.string().min(2, "Current position is required"),
  nomineePastPositions: z.string().optional(),
  nomineeAddress: z.string().min(10, "Address is required"),
  nomineeEmail: z.string().email("Enter a valid email address"),
  nomineeMobile: z.string().regex(indianMobileRegex, "Enter a valid Indian mobile number"),
  nomineeBiography: z.string().min(10, "Biography must be at least 10 characters"),
  nomineeAwards: z.string().optional(),
  nomineeLinkedIn: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")), // Allow empty string
  nomineeAdditionalInfo: z.string().optional(),

  // ASSESSMENT
  nominatorAssessment: z.string().min(10, "Your assessment is required"),
});