"use client";
import React, { useEffect, useState } from 'react';
import { Award, Users, Calendar } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex  items-center px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full mb-8">
            <Award className="h-5 w-5 text-emerald-400 mr-2" />
            <span className="text-emerald-400 text-sm font-medium">Distinguished Alumni Award 2025</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Invitation for Nomination for the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
              Distinguished Alumni Award (DAA)
            </span>{' '}
            – 2025
          </h1>

          {/* Description */}
          <div className="max-w-4xl mx-auto text-gray-300 text-lg leading-relaxed space-y-6 mb-12">
            <p>
              NIT Durgapur (R.E. College Durgapur) has a large number of alumni who have excelled in their fields both nationally and internationally. With over{' '}
              <span className="text-yellow-400 font-semibold">27,500 graduates</span> as its global brand ambassadors, the institute takes pride in honoring outstanding contributions from its alumni.
            </p>
            
            <p>
              To celebrate these achievements, NIT Durgapur invites nominations for the{' '}
              <span className="text-emerald-400 font-semibold">Distinguished Alumni Award (DAA) 2025</span>, the highest alumni honor of the institution.
            </p>
            
            <p>
              Nominations can be made by alumni, current/former faculty, members of the Senate, or heads of organizations associated with the nominee.{' '}
              <span className="text-red-400 font-semibold">Self-nominations are not allowed.</span>
            </p>
            
            <p className="text-yellow-400 font-semibold">
              Completed nominations, along with supporting documents, must be emailed to{' '}
              <a href="mailto:caair@admin.nitdgp.ac.in" className="underline hover:text-yellow-300 transition-colors">
                caair@admin.nitdgp.ac.in
              </a>{' '}
              by 11th September 2025, 11:59 PM IST.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <Users className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">27,500+</div>
              <div className="text-gray-400">Global Alumni</div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <Award className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">15+</div>
              <div className="text-gray-400">DAA Recipients</div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">Sept 11</div>
              <div className="text-gray-400">Deadline</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;