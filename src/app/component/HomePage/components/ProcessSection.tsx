"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FileText, Users, Award, CheckCircle } from 'lucide-react';

const ProcessSection = () => {
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const steps = [
    {
      icon: FileText,
      title: 'Screening Committee',
      description: 'Initial review and shortlisting of all received nominations based on basic eligibility criteria',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Peer Review',
      description: 'External experts conduct detailed evaluation of shortlisted candidates\' achievements and contributions',
      color: 'emerald'
    },
    {
      icon: Award,
      title: 'Review Committee',
      description: 'Internal committee evaluates candidates based on merit, impact, and alignment with award criteria',
      color: 'purple'
    },
    {
      icon: CheckCircle,
      title: 'Final Approval',
      description: 'Senate and Board of Governors provide final approval and ratification of selected awardees',
      color: 'yellow'
    }
  ];

  // useEffect(() => {
  //   observerRef.current = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setVisibleSteps(prev => new Set([...prev, parseInt(entry.target.dataset.stepId)]));
  //         }
  //       });
  //     },
  //     { threshold: 0.3 }
  //   );

  //   const stepElements = document.querySelectorAll('[data-step-id]');
  //   stepElements.forEach(step => observerRef.current.observe(step));

  //   return () => {
  //     if (observerRef.current) {
  //       observerRef.current.disconnect();
  //     }
  //   };
  // }, []);

  // const getColorClasses = (color) => {
  //   const colors = {
  //     blue: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
  //     emerald: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
  //     purple: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
  //     yellow: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
  //   };
  //   return colors[color] || colors.blue;
  // };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Cast to HTMLElement to access dataset
            const target = entry.target as HTMLElement;
            const stepId = target.dataset.stepId;
            if (stepId) {
              setVisibleSteps(prev => new Set([...prev, parseInt(stepId)]));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const stepElements = document.querySelectorAll('[data-step-id]');
    stepElements.forEach(step => {
      // Check if observerRef.current exists before using it
      if (observerRef.current) {
        observerRef.current.observe(step);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Type the color parameter properly
  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      emerald: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
      purple: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
      yellow: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
    };
    return colors[color] || colors.blue;
  };
  return (
    <section id="process" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Process of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Selection</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A comprehensive and transparent selection process ensures the highest standards of excellence
          </p>
        </div>

        <div className="relative">
          {/* Process Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const isVisible = visibleSteps.has(index);
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-24 w-0.5 h-12 bg-gradient-to-b from-gray-600 to-transparent transform -translate-x-0.5 hidden lg:block" />
                  )}

                  <div
                    data-step-id={index}
                    className={`flex flex-col lg:flex-row items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      }`}
                  >
                    {/* Step Content */}
                    <div className={`flex-1 transition-all duration-700 ${isVisible
                      ? 'opacity-100 translate-x-0'
                      : `opacity-0 ${isEven ? '-translate-x-10' : 'translate-x-10'}`
                      }`}>
                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-gray-600 transition-colors">
                        <div className="flex items-center mb-4">
                          <span className="text-2xl font-bold text-gray-500 mr-4">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-xl font-bold text-white">{step.title}</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Step Icon */}
                    <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`} style={{ transitionDelay: '200ms' }}>
                      <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${getColorClasses(step.color)}`}>
                        <Icon className="h-8 w-8" />
                      </div>

                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="flex-1 hidden lg:block" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Summary */}
        <div className="mt-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-8 border border-gray-600">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Selection Timeline</h3>
          <p className="text-gray-300 text-center leading-relaxed">
            The entire selection process is designed to be completed within 3-4 months from the nomination deadline,
            ensuring a thorough yet efficient evaluation of all candidates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;