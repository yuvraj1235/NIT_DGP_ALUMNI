"use client";
import React from 'react';
import { Mail, MapPin, ExternalLink, Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { title: 'Home', id: 'home' },
    { title: 'Our DAA Awardees', id: 'awardees' },
    { title: 'Guidelines', id: 'guidelines' },
    { title: 'Eligibility', id: 'eligibility' },
    { title: 'Criteria', id: 'criteria' },
    { title: 'About', id: 'about' },
    { title: 'Sign In', id: 'signin' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Institution Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">
              National Institute of Technology, Durgapur
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Honoring excellence and celebrating the outstanding contributions of our distinguished alumni 
              who have made significant impacts in their respective fields globally.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-3 text-emerald-400" />
                <span>National Institute of Technology, Durgapur, India</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-3 text-emerald-400" />
                <a 
                  href="mailto:caair@admin.nitdgp.ac.in" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  caair@admin.nitdgp.ac.in
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.slice(0, 4).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">More</h4>
            <ul className="space-y-2">
              {quickLinks.slice(4).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            
            <p className="text-gray-400 text-sm text-center sm:text-right">
              © 2025 National Institute of Technology, Durgapur. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;