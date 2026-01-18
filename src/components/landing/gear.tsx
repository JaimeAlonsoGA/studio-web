import { useState, useEffect, useRef } from 'react';
import { useResponsive } from '@/hooks/is-responsive';
import speaker from '@/assets/images/gear/focal.webp';
import sound from '@/assets/images/gear/sonido.webp';
import cubase from '@/assets/images/gear/cubase.jpg';

export default function GearSection() {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { isMobile, isTablet } = useResponsive();

    const sections = [
        {
            title: "Hardware",
            subtitle: "Equipamiento de Alta Fidelidad",
            gradient: "from-pink-500 to-rose-900",
            image: speaker,
            imageLabel: "Focal Alpha Evo Twin",
            imageSubtitle: "Monitoreo de referencia profesional",
            items: [
                {
                    name: "Altavoces",
                    specs: ["Focal Alpha Evo Twin", "Yamaha HS10", "Mackie CR8"]
                },
                {
                    name: "Interfaz de Sonido",
                    specs: ["Arturia Audiofuse REV2"]
                },
                {
                    name: "Mesa de Mezclas",
                    specs: ["Softube Mixing Suite Console 1"]
                },
                {
                    name: "Micrófonos",
                    specs: ["Condensadores y Dinámicos"]
                },
                {
                    name: "Instrumentos",
                    specs: ["Guitarra eléctrica, Bajo Eléctrico, Guitarra Acústica, Didgeridoo, Viento madera, Percusión, Sintetizadores, Teclado, Teclado MIDI"]
                }
            ]
        },
        {
            title: "Software",
            subtitle: "Herramientas de Producción Profesional",
            gradient: "from-cyan-500 to-blue-900",
            image: cubase,
            imageLabel: "Cubase 13 Pro",
            imageSubtitle: "DAW profesional de referencia",
            items: [
                {
                    name: "DAW Principal",
                    specs: ["Cubase 13 Pro"]
                },
                {
                    name: "Calibración Acústica",   
                    specs: ["Sonarworks Sound ID"]
                },
                {
                    name: "Plugins y Procesamiento",
                    specs: ["Suite completa de producción profesional"]
                }
            ]
        },
        {
            title: "Acústica",
            subtitle: "Ambiente Optimizado para Máxima Precisión",
            gradient: "from-purple-500 to-indigo-900",
            image: sound,
            imageLabel: "Sonarworks Sound ID Reference",
            imageSubtitle: "Calibración acústica profesional",
            items: [
                {
                    name: "Tratamiento Acústico",
                    specs: ["Paneles absorbentes de materiales acústicos", "Booth para grabaciones vocales", "Sala de grabación separada con bonita reverberación natural"]
                },
                {
                    name: "Calibración del Espacio",
                    specs: ["Medición y corrección con Sonarworks", "Monitoreo de referencia calibrado"]
                },
                {
                    name: "Aislamiento",
                    specs: ["Control de ruido exterior", "Acondicionamiento interno profesional"]
                }
            ]
        }
    ];

    useEffect(() => {
        // En móvil, no usar IntersectionObserver para sticky
        if (isMobile || isTablet) return;

        const observers = sectionRefs.current.map((ref, index) => {
            if (!ref) return null;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(index);
                        }
                    });
                },
                {
                    threshold: 0.5,
                    rootMargin: '-20% 0px -20% 0px'
                }
            );

            observer.observe(ref);
            return observer;
        });

        return () => {
            observers.forEach((observer) => observer?.disconnect());
        };
    }, [isMobile, isTablet]);

    return (
        <section className="relative py-12 md:py-20 pb-20 md:pb-40 bg-linear-to-b from-indigo-900 via-black to-purple-900">
            {/* Header */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10 md:mb-20">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-linear-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                        Y Escucha El Boske
                    </h2>
                    <p className="text-base md:text-xl text-purple-300 max-w-2xl mx-auto px-4">
                        ¡Tecnología y alma! para crear experiencias sonoras involvidables
                    </p>
                </div>
            </div>

            {/* VERSIÓN MÓVIL - Todo visible sin sticky */}
            {(isMobile || isTablet) ? (
                <div className="container mx-auto px-4">
                    <div className="space-y-12">
                        {sections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="animate-fade-in">
                                {/* Imagen de la sección */}
                                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video">
                                    <img
                                        src={section.image}
                                        alt={section.imageLabel}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl p-3">
                                        <p className="text-white font-bold text-sm">{section.imageLabel}</p>
                                        <p className="text-purple-300 text-xs">{section.imageSubtitle}</p>
                                    </div>
                                </div>

                                {/* Section Header */}
                                <div className="mb-6">
                                    <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-linear-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                                        {section.title}
                                    </h3>
                                    <p className="text-base text-purple-300/80 font-light">
                                        {section.subtitle}
                                    </p>
                                    <div className={`w-20 h-1 mt-3 bg-linear-to-r ${section.gradient} rounded-full`}></div>
                                </div>

                                {/* Equipment Cards */}
                                <div className="grid grid-cols-1 gap-4">
                                    {section.items.map((item, itemIndex) => (
                                        <div
                                            key={itemIndex}
                                            className="relative rounded-xl bg-linear-to-br from-purple-900/50 to-black/50 backdrop-blur border border-purple-500/30 p-4"
                                        >
                                            <div className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r ${section.gradient} rounded-t-xl`}></div>
                                            <h4 className="text-lg font-bold text-purple-200 mb-2 mt-1">
                                                {item.name}
                                            </h4>
                                            <ul className="space-y-1">
                                                {item.specs.map((spec, specIndex) => (
                                                    <li
                                                        key={specIndex}
                                                        className="text-xs text-purple-300/80 leading-relaxed flex items-start"
                                                    >
                                                        <span className="text-cyan-400 mr-2 shrink-0">•</span>
                                                        <span>{spec}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* VERSIÓN DESKTOP - Con sticky image */
                <div className="relative">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
                            {/* Left Side - Scrolling Sections */}
                            <div className="flex-1 space-y-24 lg:pr-8">
                                {sections.map((section, sectionIndex) => (
                                    <div
                                        key={sectionIndex}
                                        ref={(el) => { sectionRefs.current[sectionIndex] = el; }}
                                        className="animate-fade-in"
                                        style={{ animationDelay: `${sectionIndex * 150}ms` }}
                                    >
                                        {/* Section Header */}
                                        <div className="mb-8">
                                            <h3 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                                                {section.title}
                                            </h3>
                                            <p className="text-lg text-purple-300/80 font-light">
                                                {section.subtitle}
                                            </p>
                                            <div className={`w-24 h-1 mt-4 bg-linear-to-r ${section.gradient} rounded-full`}></div>
                                        </div>

                                        {/* Equipment Cards */} 
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {section.items.map((item, itemIndex) => (
                                                <div
                                                    key={itemIndex}
                                                    className={`group relative rounded-2xl bg-linear-to-br from-purple-900/50 to-black/50 backdrop-blur border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 p-6 ${item.name === 'Instrumentos' ? 'md:col-span-2' : ''}`}
                                                >
                                                    <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${section.gradient} rounded-t-2xl`}></div>
                                                    <h4 className="text-xl font-bold text-purple-200 mb-4 mt-2">
                                                        {item.name}
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {item.specs.map((spec, specIndex) => (
                                                            <li
                                                                key={specIndex}
                                                                className="text-sm text-purple-300/80 leading-relaxed flex items-start"
                                                            >
                                                                <span className="text-cyan-400 mr-2 shrink-0">•</span>
                                                                <span>{spec}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Side - Sticky Image */}
                            <div className="hidden lg:block lg:w-1/2 relative">
                                <div className="sticky top-24 h-fit">
                                    <div className="relative group">
                                        {/* Image container with curtain effect */}
                                        <div className="relative rounded-3xl overflow-hidden border-4 border-purple-500/30 transition-all duration-500 shadow-2xl aspect-square">
                                            {sections.map((section, index) => {
                                                const isActive = activeSection === index;
                                                const willBeActive = activeSection >= index;
                                                
                                                return (
                                                    <img
                                                        key={index}
                                                        src={section.image}
                                                        alt={section.imageLabel}
                                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out"
                                                        style={{
                                                            transform: willBeActive ? 'translateY(0)' : 'translateY(100%)',
                                                            zIndex: index,
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                            
                                        {/* Floating label */}
                                        <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30 transition-all duration-500 overflow-hidden">
                                            <div
                                                className="transition-all duration-500"
                                                style={{
                                                    transform: `translateY(0)`,
                                                    opacity: 1
                                                }}
                                            >
                                                <p className="text-white font-bold text-lg transition-all duration-500">
                                                    {sections[activeSection].imageLabel}
                                                </p>
                                                <p className="text-purple-300 text-sm transition-all duration-500">
                                                    {sections[activeSection].imageSubtitle}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}