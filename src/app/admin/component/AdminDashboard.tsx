"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NominationModal from "./NominationModal";
import { User, Calendar, GraduationCap, CheckCircle, XCircle } from "lucide-react";

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

const mockNominations: Nomination[] = [
  {
    id: "1",
    nominee: {
      name: "Dr. Rajesh Kumar Gupta",
      fatherName: "Sh. Ram Kumar Gupta",
      degree: "B.E.",
      branch: "Computer Science & Engineering",
      year: "1995",
      email: "rajesh.gupta@iitd.ac.in",
      phone: "+91-11-2659-1234",
      currentPosition: "Professor & Head of Department",
      organization: "Indian Institute of Technology Delhi",
      address: "Hauz Khas, New Delhi - 110016"
    },
    category: "Excellence in Academic & Research",
    biography: "Dr. Rajesh Kumar Gupta is a distinguished professor and researcher in the field of Computer Science with over 25 years of experience in academia and industry.",
    achievements: "Published 150+ research papers in top-tier journals, H-index of 45, supervised 25 PhD students, developed breakthrough algorithms in machine learning and artificial intelligence used by major tech companies worldwide.",
    workSpecifics: "Leading research in AI/ML applications for healthcare, smart cities, and sustainable technology. Principal investigator on projects worth ₹50+ crores from DST, SERB, and industry collaborations.",
    professionalResponsibilities: "Head of CSE Department, Member of Academic Council, Chair of PhD Committee, Editor of International Journal of AI Research, Review committee member for top conferences like ICML, NIPS.",
    awards: "Shanti Swarup Bhatnagar Prize (2020), INSA Young Scientist Award (2008), Best Teacher Award IIT Delhi (2015, 2018), IEEE Fellow (2019)",
    webProfile: "https://web.iitd.ac.in/~rajeshg",
    nominator: {
      name: "Prof. Anita Sharma",
      affiliation: "IIT Delhi",
      designation: "Dean (Academic Affairs)",
      email: "anita@iitd.ac.in",
      phone: "+91-11-2659-5678",
      address: "IIT Delhi, Hauz Khas, New Delhi",
      relationship: "Colleague"
    },
    criticalAssessment: "Dr. Gupta's contributions to AI research have been revolutionary, particularly his work on federated learning which is now being adopted by major tech companies. His leadership in establishing the AI research center at IIT Delhi has positioned India prominently in global AI research.",
    submittedAt: "2023-08-25",
    status: "pending"
  },
  {
    id: "2",
    nominee: {
      name: "Mr. Priya Mehta",
      fatherName: "Sh. Suresh Mehta",
      degree: "B.E.",
      branch: "Mechanical Engineering",
      year: "1998",
      email: "priya.mehta@mahindra.com",
      phone: "+91-22-6645-1234",
      currentPosition: "Chief Technology Officer",
      organization: "Mahindra & Mahindra Ltd.",
      address: "Mahindra Towers, Mumbai - 400018"
    },
    category: "Excellence in Corporate & Industry",
    biography: "Priya Mehta is a pioneering engineer who has led transformational changes in India's automotive industry, particularly in electric vehicle technology and sustainable manufacturing.",
    achievements: "Led the development of India's first indigenous electric SUV, holds 25+ patents in automotive technology, spearheaded Mahindra's transition to Industry 4.0, reduced manufacturing costs by 30% while improving quality metrics.",
    workSpecifics: "Chief architect of Mahindra's electric vehicle strategy, established 5 new R&D centers across India, led acquisition and integration of 3 technology startups, managed teams of 2000+ engineers.",
    professionalResponsibilities: "CTO responsibilities include technology roadmap, R&D strategy, digital transformation, sustainability initiatives, board member of Mahindra Electric, advisor to multiple automotive startups.",
    awards: "Economic Times Business Woman of the Year (2022), Automotive Engineer of the Decade (2021), Forbes India Power Woman (2020), Society of Automotive Engineers Gold Medal (2019)",
    webProfile: "https://linkedin.com/in/priyamehta-automotive",
    nominator: {
      name: "Dr. Anand Mahindra",
      affiliation: "Mahindra Group",
      designation: "Chairman",
      email: "anand.mahindra@mahindra.com",
      phone: "+91-22-6645-1000",
      address: "Mahindra Towers, Mumbai",
      relationship: "Senior Management"
    },
    criticalAssessment: "Priya's visionary leadership has positioned Mahindra as a pioneer in India's EV revolution. Her technical expertise combined with business acumen has delivered both innovation and commercial success, making her an exemplary alumna.",
    submittedAt: "2023-08-20",
    status: "pending"
  },
  {
    id: "3",
    nominee: {
      name: "Mr. Vikash Singh",
      fatherName: "Sh. Rajendra Singh",
      degree: "B.E.",
      branch: "Civil Engineering",
      year: "1992",
      email: "vikash.singh@ias.gov.in",
      phone: "+91-11-2301-5678",
      currentPosition: "Secretary",
      organization: "Ministry of Rural Development, Government of India",
      address: "Krishi Bhavan, New Delhi - 110001"
    },
    category: "Excellence in Public Administration",
    biography: "Vikash Singh is a distinguished civil servant who has transformed rural infrastructure and development programs across India through innovative policy implementation and technology adoption.",
    achievements: "Implemented digital governance initiatives reaching 50+ million rural citizens, led construction of 100,000+ rural roads under PMGSY, pioneered use of satellite technology for monitoring rural development projects, reduced project completion time by 40%.",
    workSpecifics: "Secretary-level responsibilities in rural development, urban planning, and digital governance. Led multiple inter-ministerial initiatives, represented India in international forums on sustainable development.",
    professionalResponsibilities: "Policy formulation for rural development, oversight of ₹50,000+ crore annual budget, coordination with state governments, international cooperation on development projects, disaster management coordination.",
    awards: "Prime Minister's Award for Excellence in Public Administration (2021), UN Public Service Award (2020), Distinguished Service Medal (2018), Best District Magistrate Award (2010)",
    webProfile: "https://rural.nic.in/secretary-profile",
    nominator: {
      name: "Dr. Rajiv Kumar",
      affiliation: "NITI Aayog",
      designation: "Former Vice Chairman",
      email: "rajiv.kumar@niti.gov.in",
      phone: "+91-11-2301-2345",
      address: "NITI Aayog, New Delhi",
      relationship: "Professional Associate"
    },
    criticalAssessment: "Vikash's innovative approach to rural development has set new benchmarks in public administration. His ability to leverage technology for grassroots impact while maintaining fiscal efficiency exemplifies the best of civil service.",
    submittedAt: "2023-08-18",
    status: "pending"
  },
  {
    id: "4",
    nominee: {
      name: "Ms. Kavita Agarwal",
      fatherName: "Sh. Mohan Agarwal",
      degree: "B.E.",
      branch: "Electronics & Communication Engineering",
      year: "2001",
      email: "kavita@innovatetech.com",
      phone: "+91-80-4567-8901",
      currentPosition: "Founder & CEO",
      organization: "InnovateTech Solutions Pvt. Ltd.",
      address: "Electronic City, Bangalore - 560100"
    },
    category: "Excellence in Entrepreneurial venture",
    biography: "Kavita Agarwal is a serial entrepreneur who has built multiple successful technology ventures, focusing on IoT solutions for smart cities and industrial automation.",
    achievements: "Built InnovateTech from startup to ₹500+ crore revenue company, created 3000+ direct jobs, holds 15 patents in IoT and automation, pioneered affordable smart city solutions deployed in 50+ Indian cities.",
    workSpecifics: "Founded and scaled 3 successful startups, raised ₹200+ crores in funding, established R&D centers in Bangalore and Pune, built partnerships with global technology leaders, mentored 100+ startups.",
    professionalResponsibilities: "CEO of InnovateTech, Board member of 5 technology companies, Advisor to Government of Karnataka on digital transformation, Mentor at top incubators, Angel investor in 25+ startups.",
    awards: "Entrepreneur of the Year - NASSCOM (2022), Women Leader in Technology - CII (2021), Young Entrepreneur Award - TiE (2018), Recognition by Forbes 30 Under 30 Asia (2015)",
    webProfile: "https://www.innovatetech.com/leadership/kavita-agarwal",
    nominator: {
      name: "Prof. Balakrishnan R",
      affiliation: "Indian Institute of Science",
      designation: "Professor & Former Director",
      email: "bala@iisc.ac.in",
      phone: "+91-80-2293-2456",
      address: "IISc Bangalore",
      relationship: "Industry Advisory Board Member"
    },
    criticalAssessment: "Kavita's entrepreneurial journey represents the best of Indian innovation. Her ability to build scalable technology solutions while maintaining social impact has created a new paradigm for tech entrepreneurship in India.",
    submittedAt: "2023-08-15",
    status: "pending"
  },
  {
    id: "5",
    nominee: {
      name: "Dr. Amit Krishnan",
      fatherName: "Sh. S. Krishnan",
      degree: "B.E.",
      branch: "Electrical Engineering",
      year: "1997",
      email: "amit.krishnan@educationfoall.org",
      phone: "+91-44-2435-6789",
      currentPosition: "Founder & Director",
      organization: "Education for All Foundation",
      address: "T. Nagar, Chennai - 600017"
    },
    category: "Excellence in service to the society at large",
    biography: "Dr. Amit Krishnan has dedicated his career to democratizing quality education in rural India, establishing a network of schools and digital learning centers that have transformed educational outcomes for underprivileged children.",
    achievements: "Established 150+ schools in rural areas educating 50,000+ children annually, created digital learning platform used by 2 million+ students, trained 5,000+ teachers, achieved 95% graduation rates in rural schools compared to national average of 65%.",
    workSpecifics: "Founded Education for All Foundation in 2005, developed innovative low-cost education models, created teacher training programs, established scholarship programs for meritorious students from disadvantaged backgrounds.",
    professionalResponsibilities: "Director of Foundation managing ₹100+ crore operations, Board member of multiple educational institutions, Advisor to Ministry of Education on rural education policy, International speaker on education innovation.",
    awards: "Padma Shri (2020), Global Teacher Prize Nominee (2019), Ashoka Fellow (2015), UNESCO Prize for Girls' and Women's Education (2018), Ramon Magsaysay Award Nominee (2021)",
    webProfile: "https://educationforall.org/leadership/amit-krishnan",
    nominator: {
      name: "Dr. Kiran Mazumdar-Shaw",
      affiliation: "Biocon Limited",
      designation: "Executive Chairperson",
      email: "kiran@biocon.com",
      phone: "+91-80-2808-2000",
      address: "Biocon House, Bangalore",
      relationship: "Philanthropic Partner"
    },
    criticalAssessment: "Amit's work in rural education has created a replicable model for educational transformation. His innovative approaches to teacher training and digital learning have influenced national education policy and inspired similar initiatives across India.",
    submittedAt: "2023-08-12",
    status: "pending"
  }
];

const AdminDashboard = () => {
  const [nominations, setNominations] = useState<Nomination[]>(mockNominations);
  const [selectedNomination, setSelectedNomination] = useState<Nomination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (nomination: Nomination) => {
    setSelectedNomination(nomination);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNomination(null);
  };

  const handleStatusUpdate = (nominationId: string, newStatus: "accepted" | "declined", declineReason?: string) => {
    setNominations(prev => 
      prev.map(nomination => 
        nomination.id === nominationId 
          ? { ...nomination, status: newStatus, declineReason }
          : nomination
      )
    );
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'declined':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'declined':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const pendingCount = nominations.filter(n => n.status === 'pending').length;

  return (
    <div className="min-h-screen  bg-[#020817] ">
      {/* Header */}
      <div className=" bg-[#09090B] shadow-sm border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Hi, Admin S.S.Roy 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                NIT Durgapur Distinguished Alumni Award (DAA) 2025 - Nomination Management
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm text-white bg-yellow-500/30  border-yellow-500/30">
                {pendingCount} Pending Reviews
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl bg-[#020817] mx-auto px-4 sm:px-6 lg:px-8 py-8 overscroll-y-scroll">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-[#09090B]  hover:shadow-md transition-shadow border-slate-800">
            <div className="flex items-center">
              <div className="p-3 bg-gray-500/20 rounded-lg">
                <User className="h-6 w-6 text-white " />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white ">Total Nominations</p>
                <p className="text-2xl font-bold text-white ">{nominations.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-[#09090B] hover:shadow-md transition-shadow border-slate-800">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white ">Pending Review</p>
                <p className="text-2xl font-bold text-white ">{pendingCount}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#09090B] hover:shadow-md transition-shadow border-slate-800">
            <div className="flex items-center">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white">Accepted</p>
                <p className="text-2xl text-white font-bold ">
                  {nominations.filter(n => n.status === 'accepted').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#09090B] hover:shadow-md transition-shadow border-slate-800">
            <div className="flex items-center">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <XCircle className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white">Declined</p>
                <p className="text-2xl font-bold text-white">
                  {nominations.filter(n => n.status === 'declined').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Nominations Grid */}
        <div className="mb-6">
          <h2 className="text-xl text-white font-semibold  mb-4">
            DAA 2023 Nominations
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nominations.map((nomination) => (
            <Card 
              key={nomination.id}
              className="p-6 bg-[#09090B] hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 border-l-4 border-l-primary border-slate-800"
              onClick={() => handleCardClick(nomination)}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg text-white font-semibold  mb-1">
                      {nomination.nominee.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {nomination.nominee.branch} • Class of {nomination.nominee.year}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {nomination.nominee.currentPosition}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`ml-2 ${getStatusColor(nomination.status)} flex items-center gap-1`}
                  >
                    {getStatusIcon(nomination.status)}
                    {nomination.status}
                  </Badge>
                </div>
                
                <div>
                  <Badge 
                    className={`${getCategoryColor(nomination.category)} text-xs font-medium`}
                    variant="secondary"
                  >
                    {nomination.category}
                  </Badge>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p className="line-clamp-2">
                    {nomination.achievements.length > 120 
                      ? nomination.achievements.substring(0, 120) + "..."
                      : nomination.achievements
                    }
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-slate-800">
                  <span>Submitted: {new Date(nomination.submittedAt).toLocaleDateString()}</span>
                  <span>By: {nomination.nominator.name}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedNomination && (
        <NominationModal
          nomination={selectedNomination}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default AdminDashboard;