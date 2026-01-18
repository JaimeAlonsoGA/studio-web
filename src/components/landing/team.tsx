import { Users, Sparkles, Heart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import jaime from '@/assets/images/team/jaime.webp';
import realJaime from '@/assets/images/team/goblin-jaime.jpg';
import adri from '@/assets/images/team/adri.jpg';
import elf from '@/assets/images/team/elf.webp';
import realElf from '@/assets/images/team/elf-goblin.webp';
import realAdri from '@/assets/images/team/goblin-adri.jpg';
import lamp from '@/assets/icons/lamp.png';
import { useResponsive } from '@/hooks/is-responsive';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function TeamSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { isMobile, isTablet } = useResponsive();

    useEffect(() => {
        // En móvil/tablet, no usar GSAP - mostrar contenido directamente
        if (isMobile || isTablet) {
            if (contentRef.current) {
                contentRef.current.style.opacity = '1';
            }
            return;
        }

        if (!sectionRef.current || !circleRef.current || !contentRef.current) return;

        const ctx = gsap.context(() => {
            // Animación del círculo expandiéndose
            const circleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1,
                    toggleActions: 'play none none reverse',
                }
            });

            // Calcular el tamaño necesario para cubrir toda la pantalla
            const maxSize = Math.max(window.innerWidth, window.innerHeight) * 2;

            circleTl.to(circleRef.current, {
                width: maxSize,
                height: maxSize,
                duration: 1,
                ease: 'power2.inOut'
            });

            // Animación del contenido apareciendo
            const contentTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                    end: 'top 20%',
                    scrub: 1,
                }
            });

            contentTl.fromTo(contentRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile, isTablet]);

    const team = [
        {
            name: 'Adrian Real',
            role: 'Ingeniero de Sonido, Productor & Compositor',
            description: 'Guardian del bosque, pupilo de Mars Citizen Studios. Genio transformando ideas en magia.',
            specialties: ['Producción Musical', 'Mezcla', 'Mastering'],
            picture: adri,
            real: realAdri,
        },
        {
            name: 'Jaime Alonso',
            role: 'Ingeniero de Sonido, Productor & Compositor',
            description: 'Especialista en satisfacer la creatividad con pasión y manejo técnico. Estudió en Abbey Road Institute.',
            specialties: ['Grabación', 'Producción Musical', 'Mezcla'],
            picture: jaime,
            real: realJaime,
        },
        {
            name: 'La Elfa',
            role: 'Diseñadora de Sonido',
            description: 'Maestra de los efectos de sonido, prefiere trabajar en las sombras.',
            specialties: ['Podcasts', 'Videojuegos', 'Cortometrajes'],
            picture: elf,
            real: realElf,
        },
    ];

    // Mouse tracking for card tilt effect
    const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardRef: HTMLDivElement) => {
        const card = cardRef;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 10;
        const rotateY = (x - centerX) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleCardMouseLeave = (cardRef: HTMLDivElement) => {
        cardRef.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    return (
        <section ref={sectionRef} className="relative py-20 min-h-screen overflow-hidden bg-neutral-900">
            {/* Círculo expandible - solo en desktop */}
            {!isMobile && !isTablet && (
                <div
                    ref={circleRef}
                    className="absolute left-1/2 top-[1%] -translate-x-1/2 rounded-full z-0"
                    style={{
                        width: 40,
                        height: 40,
                        background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)'
                    }}
                />
            )}

            {/* Background para móvil - visible inmediatamente */}
            {(isMobile || isTablet) && (
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)'
                    }}
                />
            )}

            {/* Decorative elements con amber tones */}
            <div className="absolute inset-0 opacity-20 z-10">
                <div className="absolute top-20 right-20 w-32 md:w-64 h-32 md:h-64 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-36 md:w-72 h-36 md:h-72 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-48 md:w-96 h-48 md:h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            {/* Portal particles effect - reducido en móvil */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-10">
                {[...Array(isMobile ? 8 : 20)].map((_, i) => {
                    const sparkleeSize = i % 2 === 0 ? '2' : '4';
                    const sparkleeColor = i % 3 === 0 ? 'bg-amber-300' : i % 3 === 1 ? 'bg-cyan-300' : 'bg-pink-300';
                    return (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 10}s`
                            }}
                        >
                            <div className={`w-${sparkleeSize} h-${sparkleeSize} ${sparkleeColor} opacity-60 rounded-full animate-pulse`} />
                        </div>
                    );
                })}
            </div>

            <div 
                ref={contentRef} 
                className="mt-10 md:mt-20 container mx-auto px-4 relative z-10"
                style={{ opacity: isMobile || isTablet ? 1 : 0 }}
            >
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-4">
                        {/* <Users className="w-16 h-16 text-amber-400" style={{ animation: 'bounce 2s ease-in-out infinite' }} /> */}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-300 to-yellow-600">
                        Con los Guardianes del Boske
                    </h2>
                    <p className="text-xl text-amber-200 max-w-2xl mx-auto">
                        Un equipo de almas creativas dedicadas a hacer realidad tus sueños musicales
                    </p>
                    <div className="w-32 h-1 mx-auto mt-6 bg-linear-to-r from-blue-600 via-cyan-400 to-blue-700 rounded-full" />
                </div>

                {/* Team Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-16">
                    {team.map((member, i) => (
                        <div
                            key={i}
                            className="bg-linear-to-b from-purple-800/40 via-pink-800/40 to-indigo-900/40 hover:from-blue-700/60 hover:to-indigo-700/60 hover:via-blue-700/40 group relative p-6 md:p-8 rounded-3xl backdrop-blur border-2 border-amber-600 hover:border-cyan-200 duration-500 hover:shadow-2xl hover:shadow-amber-500/20"
                            style={{
                                animation: 'fadeIn 0.6s ease-out forwards',
                                animationDelay: `${i * 150}ms`,
                                opacity: 0,
                                transition: 'transform 0.1s ease-out, box-shadow 0.5s, border 0.5s',
                                transformStyle: 'preserve-3d'
                            }}
                            onMouseMove={(e) => !isMobile && !isTablet && handleCardMouseMove(e, e.currentTarget)}
                            onMouseLeave={(e) => !isMobile && !isTablet && handleCardMouseLeave(e.currentTarget)}
                        >
                            {/* Avatar placeholder */}
                            <div className="group-hover:bg-linear-to-br group-hover:from-cyan-200 group-hover:to-blue-700 bg-amber-500 w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-full p-1 group-hover:scale-110 transition-transform">
                                <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                                    <img src={member.real} alt={member.name} className="absolute w-full h-full rounded-full object-cover" />
                                    <img
                                        src={member.picture}
                                        alt={member.name}
                                        className="absolute w-full h-full rounded-full object-cover transition-all duration-700 group-hover:scale-150 group-hover:opacity-0"
                                    />
                                </div>
                            </div>

                            {/* Name & Role */}
                            <h3 className="text-xl md:text-2xl font-bold mb-2 text-center bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-yellow-400">
                                {member.name}
                            </h3>
                            <p className="text-orange-400 text-center mb-3 md:mb-4 font-medium text-sm md:text-base">{member.role}</p>

                            {/* Description */}
                            <p className="text-amber-200 text-center mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                                {member.description}
                            </p>

                            {/* Specialties */}
                            <div className="space-y-2">
                                {member.specialties.map((specialty, j) => (
                                    <div
                                        key={j}
                                        className="text-center px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-amber-900/50 border border-orange-500/20 text-amber-300 text-xs md:text-sm"
                                    >
                                        {specialty}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Philosophy Section */}
                <div className="max-w-4xl mx-auto mt-12 md:mt-20 p-6 md:p-8 lg:p-12 rounded-3xl backdrop-blur border-2 border-amber-500/30" style={{ background: 'linear-gradient(135deg, rgba(120, 53, 15, 0.3) 0%, rgba(67, 20, 7, 0.3) 100%)' }}>
                    <div className="text-center mb-6 md:mb-8">
                        <img src={lamp} alt="Lamp" className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 animate-pulse" />
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-orange-400">
                            Nuestra Filosofía
                        </h3>
                    </div>
                    <p className="text-base md:text-lg text-amber-200 leading-relaxed text-center">
                        En El Boske creemos que la musica son pedazos de eternidad, por eso al crearla
                        ponemos el alma en cada nota. El sonido en un proyecto músical o audiovisual 
                        tiene que aspirar a ser memorable, despertar emoción y conectar con la audiencia.
                         Todo esto es posible gracias a la unión de la creatividad y la técnica. 
                         Una técnica desarrollada y perfeccionada que nos permite plasmar las ideas más salvajes
                         en producciones de alta calidad.
                    </p>
                </div>
            </div>
        </section>
    );
}