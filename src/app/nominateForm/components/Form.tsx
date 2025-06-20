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
import axios from 'axios';
import { nominationSchema } from "@/utils/nominationValidators"
import { z } from "zod";
import { ZodError } from "zod";


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


const Form = () => {
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
    const [loading, setLoading] = useState(false);

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


    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCategoryChange = (category: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            nominationCategories: checked
                ? [...prev.nominationCategories, category]
                : prev.nominationCategories.filter(c => c !== category)
        }));
    };

    const handleFileChange = (
        field: keyof typeof files,
        file: File | File[] | null
    ) => {
        setFiles(prev => ({ ...prev, [field]: file }));
    };

    const handleDragOver = (e: React.DragEvent, field: keyof typeof dragStates) => {
        e.preventDefault();
        setDragStates(prev => ({ ...prev, [field]: true }));
    };

    const handleDragLeave = (e: React.DragEvent, field: keyof typeof dragStates) => {
        e.preventDefault();
        setDragStates(prev => ({ ...prev, [field]: false }));
    };

    const handleDrop = (e: React.DragEvent, field: keyof typeof files) => {
        e.preventDefault();
        setDragStates(prev => ({ ...prev, [field]: false }));

        const droppedFiles = Array.from(e.dataTransfer.files);

        if (field === 'supportingDocs') {
            handleFileChange(field, droppedFiles);
        } else if (droppedFiles.length > 0) {
            handleFileChange(field, droppedFiles[0]);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof files) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        if (field === 'supportingDocs') {
            handleFileChange(field, Array.from(selectedFiles));
        } else {
            handleFileChange(field, selectedFiles[0]);
        }
    };

    const removeFile = (field: keyof typeof files, index?: number) => {
        if (field === 'supportingDocs' && typeof index === 'number') {
            const updatedFiles = [...files.supportingDocs];
            updatedFiles.splice(index, 1);
            handleFileChange(field, updatedFiles); // updatedFiles is File[]
        } else {
            handleFileChange(field, null); // <-- Make sure your function accepts null
        }
    };


    // ✅ Form submission handler
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     try {
    //         // ✅ Validate form data using Zod schema
    //         nominationSchema.parse(formData);

    //         // making the loading state true
    //         setLoading(true);

    //         // ✅ Create multipart form data
    //         const formDataToSubmit = new FormData();
    //         formDataToSubmit.append("data", JSON.stringify(formData));

    //         if (files.cv) formDataToSubmit.append("cv", files.cv);
    //         if (files.photograph) formDataToSubmit.append("photo", files.photograph);
    //         for (let doc of files.supportingDocs) {
    //             formDataToSubmit.append("supportingDocs", doc);
    //         }

    //         // ✅ Show a loading toast
    //         if (loading) {
    //             const loadingToast = toast.loading("Submitting nomination...", {
    //                 className: "bg-slate-800 text-white border-slate-700",
    //             });
    //         }

    //         // ✅ Submit using Axios
    //         const response = await axios.post("/api/nomination/submitForm", formDataToSubmit, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });
    //         console.log("✅ Submission response:", response.data);
    //         console.log("✅It failed");

    //         // change the loading state to false
    //         setLoading(false);

    //         // ✅ Handle response


    //         if (response.data.success) {
    //             toast.success("Nomination submitted successfully!", {
    //                 className: "bg-green-600 text-white border-green-500",
    //             });

    //             // Optionally reset the form after submission
    //             setFormData({
    //                 nominatorName: '',
    //                 nominatorAffiliation: '',
    //                 nominatorAddress: '',
    //                 nominatorEmail: '',
    //                 nominatorMobile: '',
    //                 nominatorCategory: '',
    //                 nominationCategories: [],
    //                 nomineeName: '',
    //                 nomineeFatherName: '',
    //                 nomineeDegree: '',
    //                 nomineeBranch: '',
    //                 nomineePassingYear: '',
    //                 nomineeOtherQualifications: '',
    //                 nomineeCurrentPosition: '',
    //                 nomineePastPositions: '',
    //                 nomineeAddress: '',
    //                 nomineeEmail: '',
    //                 nomineeMobile: '',
    //                 nomineeBiography: '',
    //                 nomineeAwards: '',
    //                 nomineeLinkedIn: '',
    //                 nomineeAdditionalInfo: '',
    //                 nominatorAssessment: '',
    //             });

    //             setFiles({
    //                 cv: null,
    //                 photograph: null,
    //                 supportingDocs: [],
    //             });

    //         } else {
    //             throw new Error(response.data.message || "Something went wrong");
    //         }

    //     } catch (err: any) {
    //         if (err instanceof ZodError) {
    //             // Show all errors one by one (toast for each)
    //             err.errors.forEach((e) => {
    //                 toast.error(`❌ ${e.message}`);
    //             });

    //             return;
    //         }


    //         toast.error(err?.message || "Server error while submitting nomination", {
    //             className: "bg-red-600 text-white border-red-500"
    //         });
    //         console.error("❌ Submission error:", err);
    //     }
    // };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let loadingToastId: string | undefined;

        try {
            nominationSchema.parse(formData);

            setLoading(true);

            const formDataToSubmit = new FormData();
            formDataToSubmit.append("data", JSON.stringify(formData));

            if (files.cv) formDataToSubmit.append("cv", files.cv);
            if (files.photograph) formDataToSubmit.append("photo", files.photograph);
            for (let doc of files.supportingDocs) {
                formDataToSubmit.append("supportingDocs", doc);
            }

            // ✅ Show loading toast and store its ID
            loadingToastId = toast.loading("Submitting nomination...", {
                className: "bg-slate-800 text-white border-slate-700",
            });

            const response = await axios.post("/api/nomination/submitForm", formDataToSubmit, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // ✅ Dismiss the loading toast
            toast.dismiss(loadingToastId);
            setLoading(false);

            if (response.data.success) {
                toast.success("Nomination submitted successfully!", {
                    className: "bg-green-600 text-white border-green-500",
                });

                // Reset form
                setFormData({
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

                setFiles({
                    cv: null,
                    photograph: null,
                    supportingDocs: [],
                });
            } else {
                throw new Error(response.data.message || "Something went wrong");
            }

        } catch (err: any) {
            // ❌ Always dismiss the loading toast first
            if (loadingToastId) toast.dismiss(loadingToastId);
            setLoading(false);

            if (err instanceof ZodError) {
                err.errors.forEach((issue) => {
                    toast.error(
                        `⚠️ ${issue.path?.[0] ? `${issue.path[0]}: ` : ""}${issue.message}`,
                        {
                            id: issue.path.join("-") || Math.random().toString(),
                            duration: 4000,
                            className: "bg-yellow-700 text-white border-l-4 border-yellow-400 shadow-lg",
                            position: "top-right",
                            icon: "⚠️",
                        }
                    );
                });
                return;
            }

            toast.error(err?.message || "Server error while submitting nomination", {
                className: "bg-red-600 text-white border-red-500"
            });
            console.error("❌ Submission error:", err);
        }
    };

    const cvInputRef = useRef<HTMLInputElement>(null);
    const photographInputRef = useRef<HTMLInputElement>(null);
    const supportingDocsInputRef = useRef<HTMLInputElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);


    const nominationCategories = [
        'Excellence in Academic & Research',
        'Excellence in Corporate & Industry',
        'Excellence in Public Administration',
        'Excellence in Entrepreneurial Venture',
        'Excellence in Service to Society'
    ];

    const degrees = ['B.E', 'B.Tech', 'M.Tech', 'PhD', 'MBA', 'MCA', 'MSW', 'MSc'];
    const identityCategories = ['Alumni', 'Faculty', 'Senate Member', 'Others'];

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
           
            {/* Nominator Details */}
            <Card className="form-card bg-slate-900 border-slate-600  animate-on-scroll">
                <CardHeader>
                    <CardTitle className="text-2xl text-emerald-400 flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <span className="text-emerald-400 font-bold">1</span>
                        </div>
                        Nominator Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label className="form-label text-white pb-1">Full Name *</Label>
                            <Input
                                className="form-input border-slate-600"
                                value={formData.nominatorName}
                                onChange={(e) => handleInputChange('nominatorName', e.target.value)}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div>
                            <Label className="form-label text-white pb-1">Affiliation & Designation *</Label>
                            <Input
                                className="form-input border-slate-600"
                                value={formData.nominatorAffiliation}
                                onChange={(e) => handleInputChange('nominatorAffiliation', e.target.value)}
                                placeholder="Your current position and organization"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="form-label text-white pb-1">Address *</Label>
                        <Textarea
                            className="form-input min-h-[100px] border-slate-600"
                            value={formData.nominatorAddress}
                            onChange={(e) => handleInputChange('nominatorAddress', e.target.value)}
                            placeholder="Your complete address"
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label className="form-label text-white pb-1">Email *</Label>
                            <Input
                                type="email"
                                className="form-input border-slate-600"
                                value={formData.nominatorEmail}
                                onChange={(e) => handleInputChange('nominatorEmail', e.target.value)}
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>
                        <div>
                            <Label className="form-label text-white pb-1">Mobile Number *</Label>
                            <Input
                                type="tel"
                                className="form-input border-slate-600"
                                value={formData.nominatorMobile}
                                onChange={(e) => handleInputChange('nominatorMobile', e.target.value)}
                                placeholder="+91 XXXXXXXXXX"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="form-label text-white pb-1">Identity Category *</Label>
                        <Select onValueChange={(value) => handleInputChange('nominatorCategory', value)}>
                            <SelectTrigger className="form-input border-slate-600">
                                <SelectValue placeholder="Select your category" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                                {identityCategories.map((category) => (
                                    <SelectItem key={category} value={category} className="text-slate-200 focus:bg-slate-700">
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label className="form-label text-white pb-1">Category of Nomination *</Label>
                        <div className="grid md:grid-cols-2 gap-4 mt-3">
                            {nominationCategories.map((category) => (
                                <div key={category} className="flex cursor-pointer items-center space-x-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                                    <Checkbox
                                        id={category}
                                        className="border-slate-600 cursor-pointer data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                                    />
                                    <Label htmlFor={category} className="text-sm text-slate-300 leading-tight cursor-pointer">
                                        {category}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Nominee Details */}
            <Card className="form-card bg-slate-900 border-slate-600 animate-on-scroll">
                <CardHeader>
                    <CardTitle className="text-2xl text-blue-400 flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <span className="text-blue-400 font-bold">2</span>
                        </div>
                        Nominee Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label className="form-label text-white pb-1">Full Name *</Label>
                            <Input
                                className="form-input border-slate-600"
                                value={formData.nomineeName}
                                onChange={(e) => handleInputChange('nomineeName', e.target.value)}
                                placeholder="Nominee's full name"
                                required
                            />
                        </div>
                        <div>
                            <Label className="form-label text-white pb-1">Father's Name</Label>
                            <Input
                                className="form-input border-slate-600"
                                value={formData.nomineeFatherName}
                                onChange={(e) => handleInputChange('nomineeFatherName', e.target.value)}
                                placeholder="Father's name"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <Label className="form-label text-white pb-1">Degree *</Label>
                            <Select onValueChange={(value) => handleInputChange('nomineeDegree', value)}>
                                <SelectTrigger className="form-input border-slate-600">
                                    <SelectValue placeholder="Select degree" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-600">
                                    {degrees.map((degree) => (
                                        <SelectItem key={degree} value={degree} className="text-slate-200 focus:bg-slate-700">
                                            {degree}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="form-label text-white pb-1">Branch / Specialization</Label>
                            <Input
                                className="form-input border-slate-600"
                                value={formData.nomineeBranch}
                                onChange={(e) => handleInputChange('nomineeBranch', e.target.value)}
                                placeholder="e.g., Computer Science"
                            />
                        </div>
                        <div>
                            <Label className="form-label text-white pb-1">Year of Passing</Label>
                            <Input
                                type="number"
                                className="form-input border-slate-600"
                                value={formData.nomineePassingYear}
                                onChange={(e) => handleInputChange('nomineePassingYear', e.target.value)}
                                placeholder="e.g., 2010"
                                min="1960"
                                max="2024"
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="form-label text-white pb-1">Other Qualifications</Label>
                        <Input
                            className="form-input border-slate-600"
                            value={formData.nomineeOtherQualifications}
                            onChange={(e) => handleInputChange('nomineeOtherQualifications', e.target.value)}
                            placeholder="Additional degrees, certifications, etc."
                        />
                    </div>

                    <div>
                        <Label className="form-label text-white pb-1">Present Position & Organization</Label>
                        <Input
                            className="form-input border-slate-600"
                            value={formData.nomineeCurrentPosition}
                            onChange={(e) => handleInputChange('nomineeCurrentPosition', e.target.value)}
                            placeholder="Current job title and company/organization"
                        />
                    </div>

                    <div>
                        <Label className="form-label text-white pb-1">Past Positions & Organizations</Label>
                        <Textarea
                            className="form-input min-h-[100px] border-slate-600"
                            value={formData.nomineePastPositions}
                            onChange={(e) => handleInputChange('nomineePastPositions', e.target.value)}
                            placeholder="Previous work experience and positions held"
                        />
                    </div>

                    <div>
                        <Label className="form-label text-white pb-1">Contact Address</Label>
                        <Textarea
                            className="form-input min-h-[100px] border-slate-600"
                            value={formData.nomineeAddress}
                            onChange={(e) => handleInputChange('nomineeAddress', e.target.value)}
                            placeholder="Complete contact address"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label className="form-label text-white pb-1">Email</Label>
                            <Input
                                type="email"
                                className="form-input border-slate-600"
                                value={formData.nomineeEmail}
                                onChange={(e) => handleInputChange('nomineeEmail', e.target.value)}
                                placeholder="nominee@example.com"
                            />
                        </div>
                        <div>
                            <Label className="form-label text-white pb-1">Mobile Number</Label>
                            <Input
                                type="tel"
                                className="form-input border-slate-600"
                                value={formData.nomineeMobile}
                                onChange={(e) => handleInputChange('nomineeMobile', e.target.value)}
                                placeholder="+91 XXXXXXXXXX"
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="form-label text-white pb-1">Biography / Achievements (500 words max)</Label>
                        <Textarea
                            className="form-input min-h-[150px] border-slate-600"
                            value={formData.nomineeBiography}
                            onChange={(e) => handleInputChange('nomineeBiography', e.target.value)}
                            placeholder="Detailed biography and major achievements"
                            maxLength={500}
                        />
                        <div className="text-right text-sm text-slate-400 mt-1">
                            {formData.nomineeBiography.length}/500 words
                        </div>
                    </div>

                    <div>
                        <Label className="form-label text-white pb-1">Awards / Recognitions</Label>
                        <Textarea
                            className="form-input min-h-[100px] border-slate-600"
                            value={formData.nomineeAwards}
                            onChange={(e) => handleInputChange('nomineeAwards', e.target.value)}
                            placeholder="List of awards, honors, and recognitions received"
                        />
                    </div>

                    <div>
                        <Label className="form-label text-white pb-1">LinkedIn / Web Profile</Label>
                        <Input
                            type="url"
                            className="form-input border-slate-600"
                            value={formData.nomineeLinkedIn}
                            onChange={(e) => handleInputChange('nomineeLinkedIn', e.target.value)}
                            placeholder="https://linkedin.com/in/profile or website URL"
                        />
                    </div>

                    <div>
                        <Label className="form-label text-white pb-1">Additional Information</Label>
                        <Textarea
                            className="form-input min-h-[100px] border-slate-600"
                            value={formData.nomineeAdditionalInfo}
                            onChange={(e) => handleInputChange('nomineeAdditionalInfo', e.target.value)}
                            placeholder="Any other relevant information"
                        />
                    </div>

                    <div>
                        <Label className="form-label text-white pb-1">Nominator's Critical Assessment *</Label>
                        <Textarea
                            className="form-input min-h-[150px] border-slate-600"
                            value={formData.nominatorAssessment}
                            onChange={(e) => handleInputChange('nominatorAssessment', e.target.value)}
                            placeholder="Your detailed assessment of why this nominee deserves the Distinguished Alumni Award"
                            required
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Upload Section */}
            <Card className="form-card bg-slate-900 border-slate-600 animate-on-scroll">
                <CardHeader>
                    <CardTitle className="text-2xl text-yellow-400 flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                            <Upload className="w-4 h-4 text-yellow-400" />
                        </div>
                        Upload Documents
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* CV Upload */}
                        <div>
                            <Label className="form-label text-white pb-1">Upload CV</Label>
                            <div
                                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${dragStates.cv
                                    ? 'border-yellow-400 bg-yellow-400/10'
                                    : 'border-slate-600 hover:border-yellow-400'
                                    }`}
                                onClick={() => cvInputRef.current?.click()}
                            >
                                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <p className="text-slate-400 mb-1">
                                    {dragStates.cv ? 'Drop CV file here' : 'Click to upload or drag and drop'}
                                </p>
                                <p className="text-xs text-slate-500">PDF, DOC, DOCX (Max 10MB)</p>
                                <Input
                                    ref={cvInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={(e) => handleFileInputChange(e, 'cv')}
                                />
                            </div>
                            {files.cv && (
                                <div className="mt-2 p-2 bg-slate-700/30 rounded-lg flex items-center justify-between">
                                    <span className="text-sm text-slate-300 truncate">{files.cv.name}</span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFile('cv')}
                                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Photograph Upload */}
                        <div>
                            <Label className="form-label text-white pb-1">Upload Photograph</Label>
                            <div
                                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${dragStates.photograph
                                    ? 'border-yellow-400 bg-yellow-400/10'
                                    : 'border-slate-600 hover:border-yellow-400'
                                    }`}
                                onDragOver={(e) => handleDragOver(e, 'photograph')}
                                onDragLeave={(e) => handleDragLeave(e, 'photograph')}
                                onDrop={(e) => handleDrop(e, 'photograph')}
                                onClick={() => photographInputRef.current?.click()}
                            >
                                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <p className="text-slate-400 mb-1">
                                    {dragStates.photograph ? 'Drop image here' : 'Click to upload or drag and drop'}
                                </p>
                                <p className="text-xs text-slate-500">JPG, PNG, JPEG (Max 5MB)</p>
                                <Input
                                    ref={photographInputRef}
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    className="hidden"
                                    onChange={(e) => handleFileInputChange(e, 'photograph')}
                                />
                            </div>
                            {files.photograph && (
                                <div className="mt-2 p-2 bg-slate-700/30 rounded-lg flex items-center justify-between">
                                    <span className="text-sm text-slate-300 truncate">{files.photograph.name}</span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFile('photograph')}
                                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Supporting Documents Upload */}
                    <div>
                        <Label className="form-label text-white pb-1">Upload Supporting Documents</Label>
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${dragStates.supportingDocs
                                ? 'border-yellow-400 bg-yellow-400/10'
                                : 'border-slate-600 hover:border-yellow-400'
                                }`}
                            onDragOver={(e) => handleDragOver(e, 'supportingDocs')}
                            onDragLeave={(e) => handleDragLeave(e, 'supportingDocs')}
                            onDrop={(e) => handleDrop(e, 'supportingDocs')}
                            onClick={() => supportingDocsInputRef.current?.click()}
                        >
                            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <p className="text-slate-400 mb-1">
                                {dragStates.supportingDocs ? 'Drop files here' : 'Click to upload or drag and drop'}
                            </p>
                            <p className="text-xs text-slate-500">Multiple files supported: PDF, DOC, JPG, PNG (Max 10MB each)</p>
                            <Input
                                ref={supportingDocsInputRef}
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                className="hidden"
                                onChange={(e) => handleFileInputChange(e, 'supportingDocs')}
                            />
                        </div>
                        {files.supportingDocs.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {files.supportingDocs.map((file, index) => (
                                    <div key={index} className="p-2 bg-slate-700/30 rounded-lg flex items-center justify-between">
                                        <span className="text-sm text-slate-300 truncate">{file.name}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFile('supportingDocs', index)}
                                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Submit Section */}
            <div className="text-center animate-on-scroll">
                <Button
                    disabled={loading}
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                >
                    <Check className="w-5 h-5 mr-2" />
                    Submit Nomination
                </Button>
                <p className="text-slate-400 mt-4 text-sm">
                    Please ensure all required fields are filled before submitting
                </p>
            </div>
        </form>
    )
}

export default Form