import { Disc3, ExternalLink, Play } from 'lucide-react';
import cd from '@/assets/icons/cd.png';
import { albums } from '@/assets/data/albums';

export default function DiscographySection() {
    return (
        <section className="relative py-12 md:py-20 bg-linear-to-b from-black via-purple-900 to-indigo-900 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/3 left-1/4 w-40 md:w-80 h-40 md:h-80 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-40 md:w-80 h-40 md:h-80 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-10 md:mb-20">
                    <div className="inline-block mb-4">
                        <img src={cd} alt="CD Icon" className="w-12 h-12 md:w-16 md:h-16 animate-spin-slow" />
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-linear-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                        Únete a la Discografía
                    </h2>
                    <p className="text-base md:text-xl text-purple-300 max-w-2xl mx-auto px-4">
                        Proyectos en los que El Boske ha contribuido a dar vida
                    </p>
                    <div className="w-24 md:w-32 h-1 mx-auto mt-4 md:mt-6 bg-linear-to-r from-pink-500 to-cyan-500 rounded-full"></div>
                </div>

                {/* Albums Grid */}
                <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto">
                    {albums.slice(0, 6).map((album, i) => (
                        <div
                            key={i}
                            className="group relative rounded-xl md:rounded-2xl bg-linear-to-br from-purple-900/50 to-black/50 backdrop-blur border border-purple-500/30 md:border-2 hover:border-purple-500/60 transition-all duration-500 md:hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden animate-fade-in"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            {/* Album Art Placeholder */}
                            <div className="relative aspect-square bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 p-1">
                                <div className="w-full h-full bg-purple-900 flex items-center justify-center relative overflow-hidden rounded-t-xl">
                                    {/* Pattern overlay */}
                                    <div className="absolute inset-0 opacity-80 rounded-xl"
                                        style={{
                                            backgroundImage: `radial-gradient(circle at 50% 50%, transparent 10%, rgba(255, 255, 255, 0.1) 10%, rgba(255, 255, 255, 0.1) 20%, transparent 20%)`,
                                            backgroundSize: '30px 30px'
                                        }}
                                    >
                                        <img src={album.cover} alt={album.title} className="rounded-t-xl w-full h-full object-cover" />
                                    </div>
                                    <Disc3 className="w-24 h-24 text-purple-400 group-hover:rotate-180 transition-transform duration-1000" />

                                    {/* Play button overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                            <Play className="w-8 h-8 text-white ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Album Info */}
                            <div className="p-4 md:p-6">
                                <h3 className="text-lg md:text-xl font-bold mb-1 text-purple-100 group-hover:text-pink-400 transition-colors">
                                    {album.title}
                                </h3>
                                <p className="text-purple-400 mb-2 md:mb-3 text-sm md:text-base">{album.artist}</p>

                                <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-purple-300">
                                    <p><span className="text-purple-500">Año:</span> {album.year}</p>
                                    <p><span className="text-purple-500">Género:</span> {album.genre}</p>
                                    <p><span className="text-purple-500">Servicios:</span> {album.services.join(", ")}</p>
                                </div>

                                <button onClick={() => window.open(album.to, '_blank')} className="cursor-pointer mt-3 md:mt-4 w-full py-2 px-4 rounded-lg bg-purple-800/50 hover:bg-purple-700/50 border border-purple-500/30 hover:border-purple-500/60 text-purple-200 text-xs md:text-sm transition-all flex items-center justify-center gap-2">
                                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                                    Escuchar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-10 md:mt-16">
                    <p className="text-base md:text-lg text-purple-300 mb-4 md:mb-6">
                        ¿Quieres ver más trabajos del estudio?
                    </p>
                    <button
                        onClick={() => window.location.href = '/discografia'}
                        className="cta-button-secondary animate-pulse-glow text-sm md:text-base"
                    >
                        Ver Discografía Completa
                    </button>
                </div>
            </div>
        </section>
    );
}