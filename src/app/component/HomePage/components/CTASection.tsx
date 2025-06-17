"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Send, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main CTA Card */}
          <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-emerald-500/30 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-full">
                <Send className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Submit Your Nomination?
            </h2>
            
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Honor outstanding alumni by nominating them for the Distinguished Alumni Award. 
              Your nomination could celebrate exceptional achievements and inspire future generations.
            </p>
            
            <Button 
            onClick={() => window.location.href = '/nominateForm'}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Proceed to Nomination Form
            </Button>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-yellow-400 mr-3" />
                <h3 className="text-white font-semibold">Deadline Reminder</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Submit your complete nomination by <span className="text-yellow-400 font-semibold">September 11, 2025, 11:59 PM IST</span>
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <Mail className="h-6 w-6 text-emerald-400 mr-3" />
                <h3 className="text-white font-semibold">Contact Support</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Questions? Email us at{' '}
                <a href="mailto:caair@admin.nitdgp.ac.in" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  caair@admin.nitdgp.ac.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;