"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, X, Mail, Phone, Building, Calendar, User, Award, Globe, FileText, CheckCircle, XCircle } from "lucide-react";
import toast,{Toaster} from "react-hot-toast";

interface Nomination {
  id: string;
  nominee: {
    name: string;
    fatherName: string;
    degree: string;
    branch: string;
    year: string;
    email: string;
    phone: string;
    currentPosition: string;
    organization: string;
    address: string;
  };
  category: string;
  biography: string;
  achievements: string;
  workSpecifics: string;
  professionalResponsibilities: string;
  awards: string;
  webProfile: string;
  nominator: {
    name: string;
    affiliation: string;
    designation: string;
    email: string;
    phone: string;
    address: string;
    relationship: string;
  };
  criticalAssessment: string;
  submittedAt: string;
  status: "pending" | "accepted" | "declined";
  declineReason?: string;
}

interface NominationModalProps {
  nomination: Nomination;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (nominationId: string, newStatus: "accepted" | "declined", declineReason?: string) => void;
}

const NominationModal = ({ nomination, isOpen, onClose, onStatusUpdate }: NominationModalProps) => {
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccept = async () => {
    setIsProcessing(true);
    // Mock API call
    setTimeout(() => {
      onStatusUpdate(nomination.id, "accepted");
        toast.success("Nomination Accepted", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#4CAF50",
            color: "#fff",
          },
        });
      setIsProcessing(false);
      onClose();
    }, 1000);
  };

  const handleDecline = () => {
    setShowDeclineForm(true);
  };

  const handleSendFeedback = async () => {
    if (!declineReason.trim()) {
        toast.error("Please provide a reason for declining the nomination.");
      return;
    }

    setIsProcessing(true);
    // Mock API call
    setTimeout(() => {
      onStatusUpdate(nomination.id, "declined", declineReason);
        toast.success(`Nomination Declined \n Feedback has been sent to ${nomination.nominator.name}.`, {
            duration: 3000,
            position: "top-right",
            style: {
            background: "#F44336",
            color: "#fff",
            },
        });
      setIsProcessing(false);
      setShowDeclineForm(false);
      setDeclineReason("");
      onClose();
    }, 1000);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Excellence in Academic & Research": "bg-blue-500/20 text-blue-300 border-blue-500/30",
      "Excellence in Corporate & Industry": "bg-green-500/20 text-green-300 border-green-500/30",
      "Excellence in Public Administration": "bg-purple-500/20 text-purple-300 border-purple-500/30",
      "Excellence in Entrepreneurial venture": "bg-orange-500/20 text-orange-300 border-orange-500/30",
      "Excellence in service to the society at large": "bg-red-500/20 text-red-300 border-red-500/30"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-1xl sm:min-w-2xl md:min-w-3xl lg:min-w-4xl xl:min-w-6xl  max-h-[90vh] overflow-y-auto bg-[#09090B] border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            NIT Durgapur DAA 2025 - Nomination Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 ">
          {/* Status Banner */}
          {nomination.status !== "pending" && (
            <Card className={`p-4 ${nomination.status === 'accepted' ? 'bg-green-500/20 border-green-500/30' : 'bg-red-500/20 border-red-500/30'} border`}>
              <div className="flex items-center space-x-3">
                {nomination.status === 'accepted' ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-300">Nomination Accepted</h3>
                      <p className="text-green-400">This nomination has been successfully accepted.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-300">Nomination Declined</h3>
                      <p className="text-red-400">This nomination has been declined.</p>
                      {nomination.declineReason && (
                        <p className="text-sm text-red-300 mt-2">
                          <strong>Reason:</strong> {nomination.declineReason}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </Card>
          )}

          {/* Nominee Information */}
          <Card className="p-6 bg-green-700/20 border-[#154A37] border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#133A2C] rounded-lg">
                  <User className="h-6 w-6 text-[#12B77F]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {nomination.nominee.name}
                  </h3>
                  <p className="text-muted-foreground">Father's Name: {nomination.nominee.fatherName}</p>
                </div>
              </div>
              <Badge 
                className={`${getCategoryColor(nomination.category)} border text-sm font-medium px-3 py-1`}
                variant="secondary"
              >
                <Award className="h-4 w-4 mr-1" />
                {nomination.category}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Building className="h-4 w-4" />
                <span className="font-medium">Degree & Branch:</span>
                <span className="text-white">{nomination.nominee.degree} - {nomination.nominee.branch}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Year of Passing:</span>
                <span className="text-white">{nomination.nominee.year}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="font-medium">Current Position:</span>
                <span className="text-white">{nomination.nominee.currentPosition}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Building className="h-4 w-4" />
                <span className="font-medium">Organization:</span>
                <span className="text-white">{nomination.nominee.organization}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="font-medium">Email:</span>
                <span className="text-[#12B77F]">{nomination.nominee.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="font-medium">Phone:</span>
                <span className="text-white">{nomination.nominee.phone}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-muted-foreground">
                <span className="font-medium">Address:</span>
                <p className="mt-1 text-white">{nomination.nominee.address}</p>
              </div>
            </div>
          </Card>

          {/* Biography */}
          <Card className="p-6 bg-[#09090B] border-slate-800">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-[#12B77F]" />
              Brief Biography
            </h4>
            <div className="bg-[#18181A] p-4 rounded-lg">
              <p className="text-white leading-relaxed">{nomination.biography}</p>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6 bg-[#09090B] border-slate-800">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-400" />
              Significant Achievements
            </h4>
            <div className="bg-[#18181A] p-4 rounded-lg">
              <p className="text-white leading-relaxed whitespace-pre-line">{nomination.achievements}</p>
            </div>
          </Card>

          {/* Work Specifics */}
          <Card className="p-6 bg-[#09090B] border-slate-800">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Building className="h-5 w-5 mr-2 text-green-400" />
              Work Specifics & Professional Responsibilities
            </h4>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Work Specifics:</h5>
                <p className="text-gray-700 leading-relaxed">{nomination.workSpecifics}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Professional Responsibilities:</h5>
                <p className="text-gray-700 leading-relaxed">{nomination.professionalResponsibilities}</p>
              </div>
            </div>
          </Card>

          {/* Awards & Recognition */}
          <Card className="p-6 bg-[#09090B] border-slate-800">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2 text-purple-400" />
              Awards & Recognition
            </h4>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">{nomination.awards}</p>
            </div>
          </Card>

          {/* Web Profile */}
          {nomination.webProfile && (
            <Card className="p-6 bg-indigo-50 border-indigo-200">
              <h4 className="text-lg font-semibold text-black  flex items-center">
                <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                Web Profile
              </h4>
              <div className="bg-indigo-50 p-4 pt-0 rounded-lg">
                <a 
                  href={nomination.webProfile} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {nomination.webProfile}
                </a>
              </div>
            </Card>
          )}

          <Separator className="bg-slate-800" />

          {/* Nominator Information */}
          <Card className="p-6 bg-[#121213] border-slate-800">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-green-400" />
              Nominator Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-500">Name:</span>
                <p className="text-white">{nomination.nominator.name}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Designation:</span>
                <p className="text-white">{nomination.nominator.designation}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Affiliation:</span>
                <p className="text-white">{nomination.nominator.affiliation}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Relationship:</span>
                <p className="text-white">{nomination.nominator.relationship}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Email:</span>
                <p className="text-blue-600">{nomination.nominator.email}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Phone:</span>
                <p className="text-white">{nomination.nominator.phone}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <span className="font-medium text-gray-500">Address:</span>
              <p className="text-white mt-1">{nomination.nominator.address}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800">
              <span className="font-medium text-gray-500">Submitted on:</span>
              <p className="text-white">{new Date(nomination.submittedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </Card>

          {/* Critical Assessment */}
          <Card className="p-6 bg-[#121213] border-slate-800">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-orange-400" />
              Nominator's Critical Assessment
            </h4>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">{nomination.criticalAssessment}</p>
            </div>
          </Card>

          {/* Actions - Only show if status is pending */}
          {nomination.status === "pending" && !showDeclineForm && (
            <div className="flex space-x-4 pt-4 border-t border-border">
              <Button 
                onClick={handleAccept}
                disabled={isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                {isProcessing ? "Processing..." : "Accept Nomination"}
              </Button>
              
              <Button 
                onClick={handleDecline}
                disabled={isProcessing}
                variant="destructive"
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Decline Nomination
              </Button>
            </div>
          )}

          {/* Decline Form */}
          {showDeclineForm && nomination.status === "pending" && (
            <Card className="p-6 bg-red-500/20 border-red-500/30 border">
              <h4 className="text-lg font-semibold text-red-300 mb-4">
                Provide Feedback for Decline
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Reason for declining this nomination:
                  </label>
                  <Textarea
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    placeholder="Please provide a detailed explanation for why this nomination is being declined. This feedback will be sent to the nominator."
                    className="min-h-[120px] bg-background border-border"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    onClick={handleSendFeedback}
                    disabled={isProcessing || !declineReason.trim()}
                    variant="destructive"
                    className="flex-1"
                  >
                    {isProcessing ? "Sending..." : "Send Feedback & Decline"}
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setShowDeclineForm(false);
                      setDeclineReason("");
                    }}
                    variant="outline"
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NominationModal;