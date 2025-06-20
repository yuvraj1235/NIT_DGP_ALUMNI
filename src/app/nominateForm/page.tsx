"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import toast, { Toaster } from "react-hot-toast";
import { ArrowUp, Upload, Check, Mail, X } from 'lucide-react';
import Form from "./components/Form"

interface FormData {
  // Nominator Details
  nominatorName: string;
  nominatorAffiliation: string;
  nominatorAddress: string;
  nominatorEmail: string;
  nominatorMobile: string;
  nominatorCategory: string;
  nominationCategories: string[];

  // Nominee Details
  nomineeName: string;
  nomineeFatherName: string;
  nomineeDegree: string;
  nomineeBranch: string;
  nomineePassingYear: string;
  nomineeOtherQualifications: string;
  nomineeCurrentPosition: string;
  nomineePastPositions: string;
  nomineeAddress: string;
  nomineeEmail: string;
  nomineeMobile: string;
  nomineeBiography: string;
  nomineeAwards: string;
  nomineeLinkedIn: string;
  nomineeAdditionalInfo: string;
  nominatorAssessment: string;
}

const NominationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nominatorName: '',
    nominatorAffiliation: '',
    nominatorAddress: '',
    nominatorEmail: '',
    nominatorMobile: '',
    nominatorCategory: '',
    nominationCategories: [],
    nomineeName: '',
    nomineeFatherName: '',
    nomineeDegree: '',
    nomineeBranch: '',
    nomineePassingYear: '',
    nomineeOtherQualifications: '',
    nomineeCurrentPosition: '',
    nomineePastPositions: '',
    nomineeAddress: '',
    nomineeEmail: '',
    nomineeMobile: '',
    nomineeBiography: '',
    nomineeAwards: '',
    nomineeLinkedIn: '',
    nomineeAdditionalInfo: '',
    nominatorAssessment: '',
  });

  const [files, setFiles] = useState({
    cv: null as File | null,
    photograph: null as File | null,
    supportingDocs: [] as File[]
  });

  const [dragStates, setDragStates] = useState({
    cv: false,
    photograph: false,
    supportingDocs: false
  });

  const cvInputRef = useRef<HTMLInputElement>(null);
  const photographInputRef = useRef<HTMLInputElement>(null);
  const supportingDocsInputRef = useRef<HTMLInputElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

 

  return (
    <div className="min-h-screen bg-slate-900  relative overflow-hidden">
      {/*Toaster configuration  */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            className: "bg-green-700 text-white border-l-4 border-green-500 shadow-md",
            iconTheme: {
              primary: "white",
              secondary: "#22c55e",
            },
          },
          error: {
            className: "bg-red-700 text-white border-l-4 border-red-500 shadow-md",
            iconTheme: {
              primary: "white",
              secondary: "#ef4444",
            },
          },
        }}
      />
      {/* Animated background elements */}

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-blue-900/10"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-sm font-medium">NIT Durgapur - CAAIR Cell</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent">
            Distinguished Alumni Award
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-200 mb-4">
            Nomination Form
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Submit your nomination below before{' '}
            <span className="text-yellow-400 font-semibold">11th September 2025, 11:59 PM IST</span>
          </p>
        </div>

        {/* Form Section */}
        <Form />

        {/* Footer */}
        <footer className="mt-16 text-center space-y-4 animate-on-scroll">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Mail className="w-4 h-4" />
            <span>Need help? Contact: </span>
            <a href="mailto:caair@admin.nitdgp.ac.in" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              caair@admin.nitdgp.ac.in
            </a>
          </div>
          <div className="text-slate-500 text-sm">
            © NIT Durgapur – CAAIR Cell
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <Button
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 backdrop-blur-sm transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="w-5 h-5 text-emerald-400" />
        </Button>
      </div>
    </div>
  );
};

export default NominationForm;