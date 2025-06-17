"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Trophy, Star, Target, Zap } from 'lucide-react';

const CriteriaSection = () => {
    const [visibleItems, setVisibleItems] = useState(new Set());
    const observerRef = useRef<IntersectionObserver | null>(null);

    const criteria = [
        {
            icon: Trophy,
            title: 'Positions of Leadership',
            description: 'Demonstrated exceptional leadership in their respective fields, organizations, or communities',
            examples: ['CEO/CTO of major corporations', 'Department heads at prestigious institutions', 'Leadership roles in government']
        },
        {
            icon: Star,
            title: 'Awards and Honors',
            description: 'Recognition through prestigious awards, honors, and accolades from national or international bodies',
            examples: ['National/International awards', 'Professional society fellowships', 'Government honors and recognition']
        },
        {
            icon: Target,
            title: 'Societal or Institutional Impact',
            description: 'Significant contributions that have positively impacted society, institutions, or their field of work',
            examples: ['Breakthrough research publications', 'Social welfare initiatives', 'Policy contributions and reforms']
        },
        {
            icon: Zap,
            title: 'Professional Excellence',
            description: 'Outstanding achievements and innovations that have advanced their profession or industry',
            examples: ['Patent innovations', 'Industry transformation', 'Mentorship and knowledge transfer']
        }
    ];

    useEffect(() => {
        // observerRef.current = new IntersectionObserver(
        //     (entries) => {
        //         entries.forEach((entry) => {
        //             if (entry.isIntersecting) {
        //                 setVisibleItems(prev => new Set([...prev, entry.target.dataset.itemId]));
        //             }
        //         });
        //     },
        //     { threshold: 0.2 }
        // );
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;
                        const itemId = target.dataset.itemId;
                        if (itemId) {
                            setVisibleItems(prev => new Set([...prev, itemId]));
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        // const items = document.querySelectorAll('[data-item-id]');
        // items.forEach(item => observerRef.current.observe(item));

        const items = document.querySelectorAll('[data-item-id]');
        observerRef.current?.disconnect(); // Optional cleanup before re-observing
        if (observerRef.current) {
            items.forEach(item => observerRef.current!.observe(item));
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <section id="criteria" className="py-20 bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Selection <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Criteria</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                        Candidates must demonstrate outstanding contributions in their fields. Evaluation is based on comprehensive criteria ensuring excellence and impact.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {criteria.map((criterion, index) => {
                        const itemId = `criteria-${index}`;
                        const isVisible = visibleItems.has(itemId);
                        const Icon = criterion.icon;

                        return (
                            <div
                                key={itemId}
                                data-item-id={itemId}
                                className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-emerald-500/50 transition-all duration-700 hover:transform hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className="flex items-center mb-6">
                                    <div className="bg-emerald-500/20 p-3 rounded-full mr-4 border border-emerald-500/30">
                                        <Icon className="h-8 w-8 text-emerald-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{criterion.title}</h3>
                                </div>

                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    {criterion.description}
                                </p>

                                <div className="space-y-2">
                                    <h4 className="text-emerald-400 font-semibold text-sm uppercase tracking-wide">
                                        Examples Include:
                                    </h4>
                                    <ul className="space-y-2">
                                        {criterion.examples.map((example, exampleIndex) => (
                                            <li key={exampleIndex} className="flex items-center text-gray-400 text-sm">
                                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3 flex-shrink-0" />
                                                {example}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Key Points */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">Key Evaluation Points</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-blue-400 font-bold">1</span>
                            </div>
                            <h4 className="text-white font-semibold mb-2">Impact Scale</h4>
                            <p className="text-gray-400 text-sm">National or international level contributions</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-purple-400 font-bold">2</span>
                            </div>
                            <h4 className="text-white font-semibold mb-2">Innovation</h4>
                            <p className="text-gray-400 text-sm">Breakthrough ideas and creative solutions</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-emerald-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-emerald-400 font-bold">3</span>
                            </div>
                            <h4 className="text-white font-semibold mb-2">Legacy</h4>
                            <p className="text-gray-400 text-sm">Lasting influence and continued relevance</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CriteriaSection;