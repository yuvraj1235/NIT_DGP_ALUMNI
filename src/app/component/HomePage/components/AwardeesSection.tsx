"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Award, Calendar } from 'lucide-react';

const AwardeesSection = () => {
    const [visibleCards, setVisibleCards] = useState(new Set());
    const observerRef = useRef<IntersectionObserver | null>(null);

    const awardees = [
        {
            year: '2019',
            recipients: [
                {
                    name: 'Prof. Kamonio Chattopadhyay',
                    details: 'BE-71, Met. Engg.',
                    position: 'Professor, IISc Bangalore'
                },
                {
                    name: 'Mr. B. Sumant',
                    details: 'BE-85, Mech. Engg.',
                    position: 'Addl. Whole-time Director, ITC Ltd.'
                }
            ]
        },
        {
            year: '2020',
            recipients: [
                {
                    name: 'Prof. Subir Kumar Saha',
                    details: 'BE-83, Mech. Engg.',
                    position: 'Professor, IIT Delhi'
                },
                {
                    name: 'Mr. J.P. Bhattacharya',
                    details: 'BE-82, Elec. Engg.',
                    position: 'MD, Deem Roll-Tech Ltd.'
                },
                {
                    name: 'Prof. Bikramjit Basu',
                    details: 'BE-95, Met. & Matl. Engg.',
                    position: 'Professor, IISc Bangalore'
                }
            ]
        },
        {
            year: '2021',
            recipients: [
                {
                    name: 'Mr. Debashis Rakhit',
                    details: 'BE-80, Chem. Engg.',
                    position: 'CEO, Intersoft K.K.'
                },
                {
                    name: 'Prof. Dilip Kumar Pratihar',
                    details: 'BE-88, Mech. Engg.',
                    position: 'Professor, IIT Kharagpur'
                },
                {
                    name: 'Prof. Aloke Paul',
                    details: 'BE-96, Met. & Matl. Engg.',
                    position: 'Professor, IISc Bangalore'
                }
            ]
        },
        {
            year: '2022',
            recipients: [
                {
                    name: 'Prof. Tarasankar Debroy',
                    details: 'BE-69, Met. & Matl. Engg.',
                    position: 'Professor, PennState, USA'
                },
                {
                    name: 'Mr. Abhay Kumar Singh',
                    details: 'BE-83, Civil Engg.',
                    position: 'Former MD, NHPC Ltd.'
                },
                {
                    name: 'Mr. Subash Menon',
                    details: 'BE-86, Elec. Engg.',
                    position: 'CEO, Pelatro Plc, UK & Chairman, Bannix Acquisition Corp., USA'
                },
                {
                    name: 'Mr. Gopal Chandra Sikder',
                    details: 'BE-86, Mech. Engg.',
                    position: 'Sr. EVP, Reliance Industries Ltd.'
                }
            ]
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

        // const cards = document.querySelectorAll('[data-card-id]');
        // cards.forEach(card => observerRef.current.observe(card));
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

    return (
        <section id="awardees" className="py-20 bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">DAA Awardees</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Celebrating excellence and outstanding contributions from our distinguished alumni
                    </p>
                </div>

                <div className="space-y-16">
                    {awardees.map((yearGroup, yearIndex) => (
                        <div key={yearGroup.year} className="space-y-8">
                            <div className="flex items-center justify-center mb-12">
                                <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-4 rounded-full">
                                    <Calendar className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-white ml-4">🏆 {yearGroup.year}</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {yearGroup.recipients.map((recipient, recipientIndex) => {
                                    const cardId = `${yearGroup.year}-${recipientIndex}`;
                                    const isVisible = visibleCards.has(cardId);

                                    return (
                                        <div
                                            key={cardId}
                                            data-card-id={cardId}
                                            className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-500 hover:transform hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                                }`}
                                            style={{ transitionDelay: `${recipientIndex * 200}ms` }}
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <Award className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                                                <span className="text-yellow-400 text-sm font-medium">{yearGroup.year}</span>
                                            </div>

                                            <h4 className="text-white text-lg font-semibold mb-2 leading-tight">
                                                {recipient.name}
                                            </h4>

                                            <p className="text-emerald-400 text-sm mb-3 font-medium">
                                                {recipient.details}
                                            </p>

                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                {recipient.position}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AwardeesSection;