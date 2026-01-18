import { Button } from '@/components/ui/button';
import studioImage from '@/assets/images/backgrounds/studio.webp';

export default function HeroSection() {
    const scrollToContact = () => {
        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0 z-0 flex flex-row">
                <img
                    src={studioImage}
                    alt="Studio Background"
                    className="w-full h-full object-cover opacity-40"
                />
            </div>

            <div className="absolute inset-0 z-1 bg-linear-to-br from-blue-800/40 via-amber-600/20 to-blue-900/50"></div>

            {/* Animated blobs - reduced on mobile */}
            <div className="absolute inset-0 z-2 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-pink-500/80 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 left-3/4 w-40 md:w-80 h-40 md:h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="hidden md:block absolute top-1/2 left-1/3 w-72 h-72 bg-amber-400/80 rounded-full blur-3xl animate-pulse delay-6000"></div>
            </div>

            {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[
                    { Icon: Music, delay: '0s', left: '10%', top: '20%' },
                    { Icon: Headphones, delay: '2s', left: '80%', top: '30%' },
                    { Icon: Wand2, delay: '4s', left: '15%', top: '70%' },
                    { Icon: Sparkles, delay: '1s', left: '85%', top: '60%' },
                ].map(({ Icon, delay, left, top }, i) => (
                    <div
                        key={i}
                        className="absolute animate-float"
                        style={{
                            left,
                            top,
                            animationDelay: delay,
                            animationDuration: '6s',
                        }}
                    >
                        <Icon className="w-12 h-12 text-purple-300 opacity-40" />
                    </div>
                ))}
            </div> */}

            <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-[fantasie] font-bold">
                    <span className='safe-gradient-text'>Bienvenido,</span> <span className='main-gradient-text'>amigo</span>
                </h1>

                <p className="font-[caprice] text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-200 mb-6 md:mb-8 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in mt-4">
                    Por aquí, por allá, creatividad sin parar,
                    <br />
                    en este estudio hay música... ¡y mucho más!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12 animate-fade-in-delay">
                    <Button
                        onClick={scrollToContact}
                        size="lg"
                        className="cta-button text-white text-base md:text-lg rounded-full shadow-xl hover:scale-102 transition-all w-full sm:w-auto"
                    >
                        Reserva tu Sesión
                    </Button>
                    <Button
                        onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                        size="lg"
                        variant="outline"
                        className="bg-transparent border-2 border-secondary hover:bg-primary/10 hover:text-amber-400 text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-full w-full sm:w-auto"
                    >
                        Descubre Nuestros Servicios
                    </Button>
                </div>

                {/* Features badges */}
                {/* <div className="flex flex-wrap justify-center gap-4 mt-16">
                    {[
                        { icon: Music, text: 'Grabación & Producción' },
                        { icon: Wand2, text: 'Enseñanza' },
                        { icon: Headphones, text: 'Mezcla & Mastering' },
                    ].map(({ icon: Icon, text }, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-950 backdrop-blur border border-amber-600 animate-fade-in"
                            style={{ animationDelay: `${i * 200}ms` }}
                        >
                            <Icon className="w-5 h-5 text-secondary" />
                            <span className="text-purple-200">{text}</span>
                        </div>
                    ))}
                </div> */}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-primary rounded-full p-1">
                    <div className="w-1.5 h-3 bg-secondary rounded-full mx-auto animate-scroll-down"></div>
                </div>
            </div>
        </section>
    );
}