import { useState } from 'react';
import { Disc3, Play, ExternalLink, Filter } from 'lucide-react';
import { albums } from '../assets/data/albums';
import cd from '@/assets/icons/cd.png';

export default function Discography() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const categories = ['Todos', 'Rock/Metal', 'Comercial', 'Soundtrack', 'Hip Hop', 'Video Game'];

    const filteredAlbums = selectedCategory === 'Todos'
        ? albums
        : albums.filter(album => album.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-indigo-900 pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <img src={cd} alt="CD Icon" className="w-16 h-16 animate-spin-slow" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                        Discografía Completa
                    </h1>
                    <p className="text-xl text-purple-300 max-w-2xl mx-auto">
                        Proyectos en los que El Boske ha contribuido a dar vida
                    </p>
                    {/* <div className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full"></div> */}
                </div>

                {/* Filter */}
                <div className="mb-12 flex flex-wrap justify-center gap-3">
                    <div className="flex items-center gap-2 text-purple-300 mr-4">
                        <Filter className="w-5 h-5" />
                        <span className="font-medium">Filtrar:</span>
                    </div>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`cursor-pointer px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-105'
                                : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 border border-purple-500/30'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Albums Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredAlbums.map((album, i) => (
                        <div
                            key={i}
                            className="group relative rounded-2xl bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden animate-fade-in"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            {/* Album Art */}
                            <div className="relative aspect-square bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-1">
                                <div className="rounded-t-xl w-full h-full bg-purple-900 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-80"
                                        style={{
                                            backgroundImage: `radial-gradient(circle at 50% 50%, transparent 10%, rgba(255, 255, 255, 0.1) 10%, rgba(255, 255, 255, 0.1) 20%, transparent 20%)`,
                                            backgroundSize: '30px 30px'
                                        }}
                                    >
                                        <img src={album.cover} alt={`${album.title} cover`} className="w-full h-full object-cover rounded-t-xl" />
                                    </div>
                                    <Disc3 className="w-24 h-24 text-purple-400 group-hover:rotate-180 transition-transform duration-1000" />

                                    {/* Play overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                            <Play className="w-8 h-8 text-white ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-1 text-purple-100 group-hover:text-pink-400 transition-colors">
                                    {album.title}
                                </h3>
                                <p className="text-purple-400 mb-3">{album.artist}</p>

                                <div className="space-y-2 text-sm text-purple-300">
                                    <p><span className="text-purple-500">Año:</span> {album.year}</p>
                                    <p><span className="text-purple-500">Género:</span> {album.genre}</p>
                                    <p><span className="text-purple-500">Servicios:</span> {album.services.join(', ')}</p>
                                </div>

                                <button onClick={() => window.open(album.to, '_blank')} className="cursor-pointer mt-4 w-full py-2 px-4 rounded-lg bg-purple-800/50 hover:bg-purple-700/50 border border-purple-500/30 hover:border-purple-500/60 text-purple-200 text-sm transition-all flex items-center justify-center gap-2">
                                    <ExternalLink className="w-4 h-4" />
                                    Escuchar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {[
                        { number: filteredAlbums.length, label: 'Proyectos' },
                        { number: '1', label: 'Banda Sonora Original' },
                        { number: '5', label: 'Música y Sonido para Audiovisuales' },
                        { number: '600K+', label: 'Streams' },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="text-center p-8 rounded-2xl bg-purple-900/30 backdrop-blur border border-pink-500/20"
                        >
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
                                {stat.number}
                            </div>
                            <div className="text-purple-300">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}