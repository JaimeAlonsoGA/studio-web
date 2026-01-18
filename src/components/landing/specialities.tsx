// CÓDIGO PARA TU PROYECTO REAL - Requiere: npm install gsap

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function SpecialitiesSection() {
    const nav = useNavigate();
    const sectionRef = useRef<HTMLElement>(null);
    const hiddenTextRef = useRef<HTMLSpanElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const services = [
        {
            title: "Diseño de Sonido para Videojuegos",
            description: "Banda sonora • Diseño de sonido • Implementación sonido dinámico"
        },
        {
            title: "Sonido para Cortometrajes",
            description: "Banda sonora • Folley • Diseño de sonido • Implementación"
        },
        {
            title: "Música para Plataformas de Streaming Digital",
            description: "Grabación • Producción • Mezcla • Mastering"
        },
        {
            title: "Podcasts",
            description: "Grabación • Edición • Entrega de audio en calidad competitiva"
        }
    ];

    useEffect(() => {
        if (!sectionRef.current || !hiddenTextRef.current || !buttonRef.current) return;

        const ctx = gsap.context(() => {
            // Estado inicial del botón - fuera de la pantalla a la derecha
            gsap.set(buttonRef.current, {
                x: window.innerWidth,
                opacity: 0,
            });

            // Timeline principal
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=2500',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            // Fase 1: Revelar texto oculto
            tl.to(hiddenTextRef.current, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                opacity: 1,
                duration: 2,
                ease: 'power2.inOut'
            })
                .to({}, { duration: 0.3 })
                // Fase 2: Botón entra desde la derecha al centro
                .to(buttonRef.current, {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power2.out'
                });
        }, sectionRef);

        // Cleanup
        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-linear-to-b from-indigo-900 to-black min-h-screen flex items-center"
        >
            <div className="container mx-auto px-4 max-w-7xl w-full">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 relative">
                        <span className="bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
                            Descubre
                        </span>
                        <span
                            ref={hiddenTextRef}
                            className="bg-linear-to-r from-blue-800 via-green-400 to-amber-800 bg-clip-text text-transparent drop-shadow-sm"
                            style={{
                                clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                                opacity: 0.3,
                            }}
                        >
                            {' '}que nos APASIONA
                        </span>
                    </h2>
                    <div className="w-24 h-0.5 bg-linear-to-r from-transparent via-slate-400 to-transparent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-slate-800/40 border border-slate-700/50 rounded-sm p-8 hover:border-slate-500/50 transition-all duration-300 group"
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-medium text-white mb-4 leading-tight group-hover:text-slate-200 transition-colors">
                                    {service.title}
                                </h3>
                                <div className="w-12 h-px bg-slate-600 group-hover:bg-slate-400 transition-colors"></div>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed font-light">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* <h1 className="text-center text-5xl font-bold font-[fantasie] text-indigo-400/40">El Boske es un estudio de música y sonido preparado para la creación de audio profesional</h1> */}
                <button
                    onClick={() => nav("/contact")}
                    ref={buttonRef}
                    // onClick={scrollToContact}
                    className="p-4 font-bold rounded-full text-xl group cursor-pointer mt-6 mx-auto flex bg-linear-to-r from-blue-800 via-green-400 to-amber-800 bg-clip-text text-transparent"
                >
                    {/* <Music className="w-5 h-5 mr-2" /> */}
                    ¡Hablemos de tu proyecto!
                </button>
            </div>
        </section >
    );
}