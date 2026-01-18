import { useState } from 'react';
import { Mic, Wand2, Sliders, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useResponsive } from '@/hooks/is-responsive';
import Arrow from '../ui/arrow';

export default function ServicesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { isMobile, isTablet, isLaptop } = useResponsive();

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % services.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
    };

    const services = [
        {
            icon: Mic,
            title: 'Grabación',
            description: 'Capturamos la esencia de tu música con equipamiento de última generación en un ambiente pensado para que cada nota inspire.',
            features: ['Micrófonos de estudio profesionales', 'Acústica tratada', 'Múltiples salas de grabación', 'Ambiente creativo único'],
            gradient: 'from-red-500 to-rose-900',
            color: 'pink',
        },
        {
            icon: Wand2,
            title: 'Producción',
            description: 'Transformamos tus ideas en realidad sonora, desde la composición hasta el arreglo final. Ritmo, melodía y armonía en perfecta sintonía.',
            features: ['Producción musical completa', 'Arreglos y composición', 'Sound design experimental', 'Dirección artística'],
            gradient: 'from-green-500 to-emerald-900',
            color: 'purple',
        },
        {
            icon: Sliders,
            title: 'Mezcla',
            description: 'Balanceamos cada elemento con precisión artesanal, creando paisajes sonoros que cautivan y emocionan.',
            features: ['Mezcla profesional', 'Versatilidad y perspectiva con 2 ingenieros', 'Edición detallada', 'Revisiones limitadas'],
            gradient: 'from-cyan-500 to-blue-900',
            color: 'purple',
        },
        {
            icon: Volume2,
            title: 'Mastering',
            description: 'El toque final que eleva tu música a estándares profesionales. Listo para conquistar cualquier plataforma.',
            features: ['Mastering para streaming', 'Preparación para vinilo', 'Optimización para todas las plataformas', 'Máxima calidad garantizada'],
            gradient: 'from-amber-500 to-amber-900',
            color: 'amber',
        },
    ];

    return (
        <section id="servicios" className="relative py-12 md:py-16 bg-linear-to-b from-purple-900 via-black to-indigo-900 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-pink-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-cyan-500 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-10 md:mb-20">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-linear-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                        En Donde Puedes
                    </h2>
                    <p className="text-base md:text-xl text-purple-300 max-w-2xl mx-auto px-4">
                        Transformar tu visión musical en una realidad escuchable, compartible y muy disfrutable, con los servicios que ofrece El Boske:
                    </p>
                    <div className="w-24 md:w-32 h-1 mx-auto mt-4 md:mt-6 bg-linear-to-r from-pink-500 to-cyan-500 rounded-full"></div>
                </div>

                {/* VERSIÓN MÓVIL - Carousel horizontal */}
                {(isMobile || isTablet) ? (
                    <div className="relative max-w-lg mx-auto">
                        {/* Card actual */}
                        <div className="relative">
                            {services.map((service, i) => (
                                <div
                                    key={i}
                                    className={`${i === activeIndex ? 'block' : 'hidden'} p-6 rounded-3xl bg-linear-to-br from-purple-900/90 to-black/90 backdrop-blur border-2 border-purple-500/30 transition-all duration-300`}
                                >
                                    {/* Glow effect */}
                                    <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${service.gradient} opacity-10`}></div>
                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className={`inline-block p-3 rounded-2xl bg-linear-to-br ${service.gradient} mb-4`}>
                                            <service.icon className="w-8 h-8 text-white" />
                                        </div>

                                        {/* Title */}
                                        <h3 className={`text-2xl font-bold mb-3 bg-linear-to-r ${service.gradient} bg-clip-text text-transparent`}>
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-purple-200 mb-4 leading-relaxed text-sm">
                                            {service.description}
                                        </p>

                                        {/* Features */}
                                        <ul className="space-y-2">
                                            {service.features.map((feature, j) => (
                                                <li key={j} className="flex items-start gap-2 text-purple-300 text-sm">
                                                    <span className={`inline-block w-1.5 h-1.5 mt-1.5 rounded-full bg-linear-to-r ${service.gradient}`}></span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navegación móvil */}
                        <div className="flex items-center justify-between mt-6 px-4">
                            <button
                                onClick={handlePrev}
                                className="p-3 rounded-full bg-purple-900/50 backdrop-blur border-2 border-purple-500/30 active:scale-95 transition-transform"
                                aria-label="Servicio anterior"
                            >
                                <ChevronLeft className="w-6 h-6 text-purple-300" />
                            </button>

                            {/* Indicadores */}
                            <div className="flex gap-2">
                                {services.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(i)}
                                        className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-purple-400' : 'w-2 bg-purple-700'}`}
                                        aria-label={`Ir al servicio ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                className="p-3 rounded-full bg-purple-900/50 backdrop-blur border-2 border-purple-500/30 active:scale-95 transition-transform"
                                aria-label="Siguiente servicio"
                            >
                                <ChevronRight className="w-6 h-6 text-purple-300" />
                            </button>
                        </div>
                    </div>
                ) : (
                    /* VERSIÓN DESKTOP - Stack de cards */
                    <>
                        <div className="relative max-w-7xl mx-auto flex items-center justify-center gap-8">
                            {/* Cards Container */}
                            <div className="max-w-3xl relative flex-1" style={{ minHeight: '600px' }}>
                                {services.map((service, i) => {
                                    // Calculate position relative to active card
                                    const position = (i - activeIndex + services.length) % services.length;
                                    const isTopCard = position === 0;

                                    return (
                                        <div
                                            key={i}
                                            className={`group absolute w-full p-8 rounded-3xl bg-linear-to-br from-purple-900/90 to-black/90 backdrop-blur border-2 border-${service.color}-500/30 hover:border-${service.color}-500/80 transition-all duration-700 ease-in-out hover:shadow-2xl hover:shadow-${service.color}-500/30 cursor-pointer`}
                                            style={{
                                                top: `${position * (isLaptop ? 50 : 60)}px`,
                                                right: `${position * (isLaptop ? 50 : 60)}px`,
                                                zIndex: services.length - position,
                                                opacity: position > 2 ? 0.4 : 1,
                                                transform: isTopCard ? 'scale(1)' : `scale(${1 - position * 0.02})`,
                                                transformOrigin: 'top left',
                                            }}
                                            onClick={() => {
                                                if (!isTopCard) {
                                                    setActiveIndex(i);
                                                }
                                            }}
                                            onMouseEnter={(e) => {
                                                if (isTopCard) {
                                                    e.currentTarget.style.transform = 'translateY(-20px) translateX(20px) scale(1.05)';
                                                    e.currentTarget.style.zIndex = '100';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (isTopCard) {
                                                    e.currentTarget.style.transform = 'scale(1)';
                                                    e.currentTarget.style.zIndex = `${services.length}`;
                                                }
                                            }}
                                        >
                                            {/* Glow effect */}
                                            <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                            <div className="relative z-10">
                                                {/* Icon */}
                                                <div className={`inline-block p-4 rounded-2xl bg-linear-to-br ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                                    <service.icon className="w-10 h-10 text-white" />
                                                </div>

                                                {/* Title */}
                                                <h3 className={`text-3xl font-bold mb-4 bg-linear-to-r ${service.gradient} bg-clip-text text-transparent`}>
                                                    {service.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-purple-200 mb-6 leading-relaxed">
                                                    {service.description}
                                                </p>

                                                {/* Features */}
                                                <ul className="space-y-3">
                                                    {service.features.map((feature, j) => (
                                                        <li key={j} className="flex items-start gap-3 text-purple-300">
                                                            <span className={`inline-block w-2 h-2 mt-2 rounded-full bg-linear-to-r ${service.gradient}`}></span>
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right Arrow */}
                            <button
                                onClick={handleNext}
                                className="shrink-0 cursor-pointer p-4 rounded-full bg-purple-900/50 backdrop-blur border-2 border-purple-500/30 hover:border-purple-500/80 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 z-50"
                                aria-label="Siguiente servicio"
                            >
                                <Arrow />
                            </button>
                        </div>

                        {/* Indicators - Desktop */}
                        <div className="flex justify-center gap-3 mt-8">
                            {services.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-purple-400' : 'w-2 bg-purple-700 hover:bg-purple-500'}`}
                                    aria-label={`Ir al servicio ${i + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* CTA */}
                <div className="text-center mt-8 md:mt-4">
                    <p className="text-base md:text-xl text-purple-300 mb-4 md:mb-6">
                        ¿Listo para comenzar tu viaje por El Boske?
                    </p>
                    <button
                        onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                        className="cta-button-secondary animate-pulse-glow"
                    >
                        Ponme en contacto
                    </button>
                </div>
            </div>
        </section>
    );
}