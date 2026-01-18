import { MapPin, Navigation, Clock, Phone, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useResponsive } from '@/hooks/is-responsive';
import location from '@/assets/images/location/location.jpg';
import location2 from '@/assets/images/location/location-1.jpg';
import location3 from '@/assets/images/location/location-3.jpg';
import location4 from '@/assets/images/location/location-4.jpg';
import location5 from '@/assets/images/location/location-5.jpg';

// Registrar el plugin
gsap.registerPlugin(ScrollTrigger);

export default function LocationSection() {
    const sectionRef = useRef(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
    const backgroundRef = useRef(null);
    const contentRef = useRef(null);
    const contentItemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const { isMobile, isTablet } = useResponsive();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Tus imágenes
    const images = [location, location2, location3, location4, location5];

    useEffect(() => {
        // En móvil/tablet, no usar GSAP - mostrar contenido directamente
        if (isMobile || isTablet) {
            if (contentRef.current) {
                (contentRef.current as HTMLElement).style.opacity = '1';
            }
            contentItemsRef.current.forEach((item) => {
                if (item) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }
            });
            return;
        }

        const ctx = gsap.context(() => {
            // Timeline única con todo el flujo
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=500%',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            // Posición inicial: contenido oculto
            if (contentRef.current) {
                gsap.set(contentRef.current, { autoAlpha: 0 });
            }

            // FASE 1: Animar imágenes (toma el 70% del timeline)
            imagesRef.current.forEach((img, index) => {
                if (img) {
                    if (index === 0) {
                        gsap.set(img, { xPercent: 0 });
                    } else {
                        gsap.set(img, { xPercent: 100 });
                        tl.to(img, {
                            xPercent: 0,
                            duration: 1.5,
                            ease: 'power2.inOut'
                        }, index * 1.2);
                    }
                }
            });

            // Agregar pausa/espacio al final de las imágenes
            tl.to({}, { duration: 0.5 });

            // FASES 2, 3 y 4: Se ejecutan en el 30% final del scroll
            const finalPhaseStart = tl.duration();

            // FASE 2: Background (rápido)
            if (backgroundRef.current) {
                gsap.set(backgroundRef.current, { xPercent: 100 });
                tl.to(backgroundRef.current, {
                    xPercent: 0,
                    duration: 0.8,
                    ease: 'power2.inOut'
                }, finalPhaseStart);
            }

            // FASE 3: Contenido aparece (justo después del background)
            if (contentRef.current) {
                tl.to(contentRef.current, {
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                }, finalPhaseStart + 0.4);
            }

            // FASE 4: Elementos internos (escalonados rápidamente)
            contentItemsRef.current.forEach((item, index) => {
                if (item) {
                    gsap.set(item, { x: 100, opacity: 0 });
                    tl.to(item, {
                        x: 0,
                        opacity: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    }, finalPhaseStart + 0.6 + (index * 0.1));
                }
            });
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, [isMobile, isTablet]);

    // Auto-rotate images for mobile
    useEffect(() => {
        if (!isMobile && !isTablet) return;
        
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isMobile, isTablet, images.length]);

    return (
        <section
            ref={sectionRef}
            className="relative bg-black overflow-hidden"
            style={{ minHeight: '100vh' }}
        >
            {/* VERSIÓN MÓVIL/TABLET - Sin GSAP, layout estático */}
            {(isMobile || isTablet) ? (
                <div className="min-h-screen py-12 px-4 bg-linear-to-br from-indigo-950 via-purple-950 to-black">
                    {/* Galería de imágenes como carousel */}
                    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Location ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        ))}
                        {/* Indicadores */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="space-y-6">
                        {/* Tarjeta de Información de Contacto */}
                        <div className="p-6 rounded-2xl bg-linear-to-br from-purple-900/60 to-black/60 backdrop-blur-xl border-2 border-purple-500/30 shadow-2xl">
                            <h3 className="text-2xl font-bold mb-6 bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                ¡Es un Bosque Madrileño!
                            </h3>

                            <div className="space-y-4">
                                {/* Dirección */}
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0 p-2.5 rounded-xl bg-linear-to-br from-pink-500 to-rose-600 shadow-lg">
                                        <MapPin className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-purple-200 mb-1">Dirección</h4>
                                        <p className="text-sm text-purple-300">
                                            A una hora de Madrid capital<br />
                                            San Martín de Valdeiglesias, Madrid
                                        </p>
                                    </div>
                                </div>

                                {/* Teléfono */}
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0 p-2.5 rounded-xl bg-linear-to-br from-purple-500 to-indigo-600 shadow-lg">
                                        <Phone className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-purple-200 mb-1">Teléfono</h4>
                                        <p className="text-sm text-purple-300">+34 684 332 575</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0 p-2.5 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-lg">
                                        <Mail className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-purple-200 mb-1">Email</h4>
                                        <p className="text-sm text-purple-300">elboskestudio@gmail.com</p>
                                    </div>
                                </div>

                                {/* Horario */}
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0 p-2.5 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 shadow-lg">
                                        <Clock className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-purple-200 mb-1">Horario</h4>
                                        <p className="text-sm text-purple-300">
                                            Cuando puedas y el estudio esté disponible
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botón de direcciones */}
                        <button
                            className="w-full p-4 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold text-base hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                            onClick={() => window.open('https://maps.google.com', '_blank')}
                        >
                            <Navigation className="w-5 h-5" />
                            Cómo Llegar
                        </button>
                    </div>
                </div>
            ) : (
                /* VERSIÓN DESKTOP - Con GSAP */
                <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Capa de imágenes - Ocupa todo el ancho */}
                <div className="absolute inset-0">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            ref={el => { imagesRef.current[index] = el; }}
                            className="absolute inset-0 w-full h-full"
                            style={{ zIndex: index }}
                        >
                            <img
                                src={img}
                                alt={`Location ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay sutil para mejor legibilidad */}
                            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40"></div>
                        </div>
                    ))}
                </div>

                {/* Background gradient después de las imágenes - Ocupa todo el ancho */}
                <div
                    ref={backgroundRef}
                    className="flex justify-center items-center absolute inset-0 bg-linear-to-br from-indigo-950 via-purple-950 to-black"
                    style={{ zIndex: images.length }}
                >
                    {/* Efectos decorativos en el background */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Contenido principal - Con max-w-7xl */}
                <div
                    ref={contentRef}
                    className="absolute inset-0 overflow-hidden"
                    style={{ zIndex: images.length + 1 }}
                >
                    <div className="h-full overflow-y-hidden">
                        <div className="min-h-screen flex flex-col justify-center py-12 md:py-20">
                            <div className="max-w-7xl mx-auto px-4 w-full">

                                {/* <div
                                    ref={el => { contentItemsRef.current[0] = el; }}
                                    className="text-center mb-12 md:mb-16"
                                >
                                    <div className="inline-block mb-6">
                                        <img src={locationIcon} alt="Location Icon" className="w-16 h-16 md:w-20 md:h-20 mx-auto drop-shadow-2xl animate-bounce" />
                                    </div>
                                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                        Encuéntranos
                                    </h2>
                                    <p className="text-lg md:text-xl text-purple-300 max-w-2xl mx-auto">
                                        Ven a visitar nuestro bosque encantado
                                    </p>
                                    <div className="w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full"></div>
                                </div> */}

                                {/* Contenido principal en grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

                                    {/* Tarjeta de Información de Contacto */}
                                    <div
                                        ref={el => { contentItemsRef.current[1] = el; }}
                                        className="space-y-6"
                                    >
                                        <div className="p-6 md:p-8 rounded-3xl bg-linear-to-br from-purple-900/60 to-black/60 backdrop-blur-xl border-2 border-purple-500/30 shadow-2xl">
                                            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-linear-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                                ¡Es un Bosque Madrileño!
                                            </h3>

                                            <div className="space-y-5">
                                                {/* Dirección */}
                                                <div className="flex items-start gap-4 group">
                                                    <div className="shrink-0 p-3 rounded-xl bg-linear-to-br from-pink-500 to-rose-600 shadow-lg group-hover:scale-110 transition-transform">
                                                        <MapPin className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base md:text-lg font-semibold text-purple-200 mb-1">Dirección</h4>
                                                        <p className="text-sm md:text-base text-purple-300">
                                                            A una hora de Madrid capital, coche o transporte público bus 551<br />
                                                            San Martín de Valdeiglesias, Madrid, España
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Teléfono */}
                                                <div className="flex items-start gap-4 group">
                                                    <div className="shrink-0 p-3 rounded-xl bg-linear-to-br from-purple-500 to-indigo-600 shadow-lg group-hover:scale-110 transition-transform">
                                                        <Phone className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base md:text-lg font-semibold text-purple-200 mb-1">Teléfono</h4>
                                                        <p className="text-sm md:text-base text-purple-300">+34 684 332 575</p>
                                                    </div>
                                                </div>

                                                {/* Email */}
                                                <div className="flex items-start gap-4 group">
                                                    <div className="shrink-0 p-3 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform">
                                                        <Mail className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base md:text-lg font-semibold text-purple-200 mb-1">Email</h4>
                                                        <p className="text-sm md:text-base text-purple-300">elboskestudio@gmail.com</p>
                                                    </div>
                                                </div>

                                                {/* Horario */}
                                                <div className="flex items-start gap-4 group">
                                                    <div className="shrink-0 p-3 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 shadow-lg group-hover:scale-110 transition-transform">
                                                        <Clock className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base md:text-lg font-semibold text-purple-200 mb-1">Horario</h4>
                                                        <p className="text-sm md:text-base text-purple-300">
                                                            Cuando puedas y el estudio esté disponible ¡te esperamos!<br />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Botón de direcciones */}
                                        <button
                                            className="w-full p-5 md:p-6 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold text-base md:text-lg hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-3"
                                            onClick={() => window.open('https://maps.google.com', '_blank')}
                                        >
                                            <Navigation className="w-5 h-5 md:w-6 md:h-6" />
                                            Cómo Llegar
                                        </button>
                                    </div>

                                    {/* Mapa */}
                                    <div
                                        ref={el => { contentItemsRef.current[2] = el; }}
                                        className="relative rounded-3xl overflow-hidden border-2 border-purple-500/30 shadow-2xl min-h-[400px] lg:min-h-0"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-br from-purple-900/60 to-black/60 backdrop-blur-xl flex items-center justify-center">
                                            <div className="text-center p-8">
                                                <div className="relative inline-block mb-6">
                                                    <MapPin className="w-20 h-20 md:w-24 md:h-24 text-purple-400 animate-bounce" />
                                                    <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full animate-pulse"></div>
                                                </div>
                                                <p className="text-purple-300 text-base md:text-lg font-medium">
                                                    Mapa Interactivo<br />
                                                    <span className="text-sm text-purple-400">(Integra aquí Google Maps)</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Nota informativa */}
                                {/* <div
                                    ref={el => { contentItemsRef.current[3] = el; }}
                                    className="mt-12 md:mt-16"
                                >
                                    <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl border-2 border-pink-500/30 text-center shadow-2xl">
                                        <p className="text-sm md:text-lg text-purple-200 leading-relaxed">
                                            <span className="text-pink-400 font-bold text-base md:text-xl">✨ Nota:</span> Para garantizar la mejor experiencia
                                            y disponibilidad de nuestros espacios, recomendamos reservar con antelación. También ofrecemos
                                            visitas guiadas al estudio previa solicitud. ¡Ven a conocer nuestro bosque mágico!
                                        </p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </section>
    );
}