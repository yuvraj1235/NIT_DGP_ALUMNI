"use client";
import React, { useState, useEffect} from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setShowDropdown(false);
  };

  const nominationLinks = [
    { title: 'Our DAA Awardees', id: 'awardees' },
    { title: 'Guidelines of Nomination', id: 'guidelines' },
    { title: 'Eligibility for Nomination', id: 'eligibility' },
    { title: 'Process of Selection', id: 'process' },
    { title: 'Criteria', id: 'criteria' },
  ];

  const handleClick = () => {
    console.log('Sign In button clicked');
    router.push('/admin/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-white">NIT Durgapur</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </button>
              
              <div className="relative">
                <button
                  className="text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Nomination
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {showDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                    {nominationLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => scrollToSection(link.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-emerald-400 hover:bg-gray-700"
                      >
                        {link.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </button>
              
              <Button 
              onClick={handleClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Sign In
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Home
              </button>
              
              {nominationLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  {link.title}
                </button>
              ))}
              
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                About
              </button>
              
              <Button
               onClick={handleClick}
               className="bg-emerald-600 hover:bg-emerald-700 text-white w-full mt-0">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;