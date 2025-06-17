"use client";
import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, XCircle, Award, Users } from 'lucide-react';

const EligibilitySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const eligibleCriteria = [
    'All NIT Durgapur alumni are eligible for nomination',
    'Alumni with honorary degrees may be considered',
    'Life Fellows of the institute are eligible',
    'Alumni working in any field globally are welcome'
  ];

  const ineligibleCriteria = [
    'Alumni who are current NITD employees',
    'Alumni who were past NITD employees during their tenure',
    'Exceptional cases may be considered by special committee review'
  ];

  return (
    <section id="eligibility" className="py-20 bg-gray-900/50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Eligibility for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Nomination</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Understanding who can be nominated for the Distinguished Alumni Award
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Eligible Section */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-500/20 p-3 rounded-full mr-4">
                  <CheckCircle className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-400">Eligible Alumni</h3>
              </div>
              
              <div className="space-y-4">
                {eligibleCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{criteria}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-emerald-400 mr-2" />
                  <span className="text-emerald-400 font-semibold">Global Reach</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Alumni working anywhere in the world across all disciplines and sectors are eligible
                </p>
              </div>
            </div>
          </div>

          {/* Ineligible Section */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <div className="bg-red-500/20 p-3 rounded-full mr-4">
                  <XCircle className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-red-400">Restrictions</h3>
              </div>
              
              <div className="space-y-4">
                {ineligibleCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{criteria}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-yellow-400 font-semibold">Special Cases</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Exceptional circumstances may be reviewed by the selection committee on a case-by-case basis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilitySection;