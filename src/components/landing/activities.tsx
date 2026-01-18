import { Music2, Radio, BookOpen } from 'lucide-react';
import corcho from '@/assets/icons/corcho.jpg';

export default function ActivitiesSection() {
    const activities = [
        {
            icon: Radio,
            title: 'Druidas de la Juerga',
            subtitle: 'Escuela de DJ',
            description: 'Conviértete en un maestro de la pista. Aprende a mezclar, crear transiciones mágicas y dominar el arte del DJ.',
            features: [
                'Técnicas de mezcla profesional',
                'Uso de controladoras y CDJs',
                'Lectura de público y programación',
                'Producción de sets épicos',
            ],
            duration: '16 horas',
            level: 'Principiante',
            gradient: 'from-pink-500 to-rose-600',
        },
        {
            icon: Music2,
            title: 'Clases De Producción Musical',
            subtitle: 'Escuela de Producción Musical',
            description: 'Transforma tus ideas en obras maestras. Domina el arte de la producción musical desde cero hasta nivel profesional.',
            features: [
                'Fundamentos de producción',
                'DAWs y software profesional',
                'Síntesis y diseño de sonido',
                'Mezcla y mastering',
            ],
            duration: 'Ilimitado',
            level: 'Principiante',
            gradient: 'from-purple-500 to-indigo-600',
        },
    ];

    return (
        <section className="relative py-12 md:py-20 bg-linear-to-b from-amber-50 via-orange-100 to-stone-200 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-amber-900 drop-shadow-md">
                        Cursos & Actividades
                    </h2>
                    <p className="text-base md:text-xl text-amber-900 max-w-2xl mx-auto font-medium px-4">
                        Descubre nuestras actividades disponibles
                    </p>
                </div>

                {/* Cork Board with Pinned Papers */}
                <div
                    className="relative max-w-6xl mx-auto shadow-2xl overflow-hidden rounded-xl md:rounded-2xl"
                    style={{
                        backgroundImage: `url(${corcho})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '400px',
                    }}
                >
                    {/* Cork Board Overlay */}
                    <div className="absolute inset-0 bg-amber-900/10"></div>

                    {/* Pinned Papers Grid */}
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8 lg:p-12">
                        {activities.map((activity, i) => (
                            <div
                                key={i}
                                className="group relative animate-fade-in"
                                style={{
                                    animationDelay: `${i * 200}ms`,
                                    transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
                                }}
                            >
                                {/* Push Pin */}
                                <div
                                    className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-6 h-6 rounded-full bg-linear-to-br from-red-500 to-red-700 shadow-lg"
                                    style={{
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)',
                                    }}
                                >
                                    <div className="absolute inset-1 rounded-full bg-linear-to-br from-red-400 to-red-600"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-red-900"></div>
                                </div>

                                {/* Paper Card */}
                                <div
                                    className="relative p-4 md:p-6 lg:p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group-hover:rotate-0"
                                    style={{
                                        backgroundImage: 'linear-gradient(to bottom, #fffef7 0%, #fffdf5 100%)',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    {/* Tape effect at top corners - hidden on mobile */}
                                    <div className="hidden md:block absolute -top-3 left-8 w-16 h-6 bg-yellow-100/60 rotate-[-5deg] shadow-sm border-l border-r border-yellow-200/50"></div>
                                    <div className="hidden md:block absolute -top-3 right-8 w-16 h-6 bg-yellow-100/60 rotate-[5deg] shadow-sm border-l border-r border-yellow-200/50"></div>

                                    {/* Icon */}
                                    <div className={`inline-block p-3 md:p-4 rounded-xl bg-linear-to-br ${activity.gradient} mb-3 md:mb-4 shadow-md`}>
                                        <activity.icon className="w-6 h-6 md:w-10 md:h-10 text-white" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-gray-900">
                                        {activity.title}
                                    </h3>
                                    <p className="text-sm md:text-lg text-gray-700 mb-2 md:mb-3 font-medium border-b border-gray-300 pb-2">
                                        {activity.subtitle}
                                    </p>

                                    {/* Description */}
                                    <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                                        {activity.description}
                                    </p>

                                    {/* Features */}
                                    <div className="mb-4 space-y-2">
                                        {activity.features.map((feature, j) => (
                                            <div key={j} className="flex items-start gap-2">
                                                <span className="inline-block w-1.5 h-1.5 mt-1.5 rounded-full bg-gray-800 shrink-0"></span>
                                                <span className="text-gray-700 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Info badges */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <div className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-medium">
                                            ⏱️ {activity.duration}
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-medium">
                                            📊 {activity.level}
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                        className={`w-full py-2.5 px-4 rounded-lg bg-linear-to-r ${activity.gradient} text-white font-semibold hover:scale-105 transition-transform shadow-md text-sm`}
                                    >
                                        Más Información
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Info Card - Pinned Note Style */}
            <div className="max-w-4xl mx-auto mt-12 relative" style={{ transform: 'rotate(0.5deg)' }}>
                {/* Push Pin for info card */}
                <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-blue-700 shadow-lg"
                    style={{
                        boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)',
                    }}
                >
                    <div className="absolute inset-1 rounded-full bg-linear-to-br from-blue-400 to-blue-600"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-900"></div>
                </div>

                {/* Paper card */}
                <div
                    className="p-8 md:p-10 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    style={{
                        backgroundImage: 'linear-gradient(to bottom, #fffef7 0%, #fffdf5 100%)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)',
                    }}
                >
                    {/* Tape effect */}
                    <div className="absolute -top-3 left-16 w-20 h-6 bg-yellow-100/60 rotate-3 shadow-sm border-l border-r border-yellow-200/50"></div>
                    <div className="absolute -top-3 right-16 w-20 h-6 bg-yellow-100/60 rotate-3 shadow-sm border-l border-r border-yellow-200/50"></div>

                    <div className="flex items-start gap-6">
                        <div className="shrink-0">
                            <div className="p-4 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-md">
                                <BookOpen className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                Talleres Personalizados
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                También ofrecemos talleres y sesiones personalizadas adaptadas a tus necesidades específicas.
                                Ya sea que quieras profundizar en un aspecto particular de la producción musical o necesites
                                orientación para tu proyecto, nuestros guardianes están aquí para ayudarte.
                            </p>
                            <button
                                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
                            >
                                Consulta disponibilidad →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto text-center mt-8 md:mt-12 px-4'>
                <h1 className='font-bold font-[fantasie] text-lg md:text-2xl lg:text-3xl text-amber-900 leading-relaxed'>PASEOS POR EL BOSQUE • CONTEMPLACIÓN DE LA NATURALEZA • SUMERGIRSE EN EL LAGO • RESPIRAR AIRE LIMPIO • BUSCAR SETAS • IDENTIFICAR PÁJAROS • DISFRUTAR DEL ENTORNO</h1>
            </div>
        </section>
    );
}