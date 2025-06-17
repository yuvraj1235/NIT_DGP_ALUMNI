"use client";
import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Award, Building, Users, Heart, Lightbulb } from 'lucide-react';

const GuidelinesSection = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const categories = [
    {
      icon: BookOpen,
      title: 'Excellence in Academic & Research',
      description: 'Outstanding contributions to education, research, and academic leadership',
      color: 'emerald'
    },
    {
      icon: Building,
      title: 'Excellence in Corporate & Industry',
      description: 'Exceptional achievements in corporate leadership and industrial innovation',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Excellence in Public Administration',
      description: 'Distinguished service in government and public sector organizations',
      color: 'purple'
    },
    {
      icon: Lightbulb,
      title: 'Excellence in Entrepreneurial Venture',
      description: 'Innovation and success in entrepreneurship and business ventures',
      color: 'yellow'
    },
    {
      icon: Heart,
      title: 'Excellence in Service to Society',
      description: 'Significant contributions to social welfare and community development',
      color: 'red'
    }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const cardId = target.dataset.cardId;
            if (cardId) {
              setVisibleCards(prev => new Set([...prev, cardId]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-card-id]');
    observerRef.current?.disconnect(); // Optional cleanup before re-observing
    if (observerRef.current) {
      cards.forEach(card => observerRef.current!.observe(card));
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const getColorClasses = (color: string): string => {
    const colors = {
      emerald: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
      blue: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
      purple: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
      yellow: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      red: 'text-red-400 bg-red-500/20 border-red-500/30'
    } as const;

    return colors[color as keyof typeof colors] ?? colors.emerald;
  };

  return (
    <section id="guidelines" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Guidelines of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Nomination</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            The Distinguished Alumni Award recognizes exceptional achievements across multiple categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => {
            const cardId = `guideline-${index}`;
            const isVisible = visibleCards.has(cardId);
            const Icon = category.icon;

            return (
              <div
                key={cardId}
                data-card-id={cardId}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-opacity-70 transition-all duration-500 hover:transform hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`inline-flex p-3 rounded-lg mb-4 border ${getColorClasses(category.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-white text-lg font-semibold mb-3 leading-tight">
                  {category.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
          <Award className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
          <p className="text-yellow-400 font-semibold text-lg">
            Important Note
          </p>
          <p className="text-gray-300 mt-2">
            Nominations received for DAA 2023 will also be valid for consideration in 2024
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuidelinesSection;