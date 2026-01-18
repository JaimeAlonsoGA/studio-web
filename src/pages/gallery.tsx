import { Camera, Image as ImageIcon } from 'lucide-react';

export default function Gallery() {
    const galleryItems = [
        { id: 1, title: 'Sala de Grabación Principal', category: 'Espacios' },
        { id: 2, title: 'Control Room', category: 'Espacios' },
        { id: 3, title: 'Sesión de Mezcla', category: 'Sesiones' },
        { id: 4, title: 'Producción en Vivo', category: 'Sesiones' },
        { id: 5, title: 'Setup de Masterización', category: 'Equipamiento' },
        { id: 6, title: 'Micrófonos Vintage', category: 'Equipamiento' },
        { id: 7, title: 'Clase de DJ', category: 'Talleres' },
        { id: 8, title: 'Workshop de Producción', category: 'Talleres' },
        { id: 9, title: 'Sesión Nocturna', category: 'Atmósfera' },
        { id: 10, title: 'El Boske Exterior', category: 'Atmósfera' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-indigo-900 pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <Camera className="w-16 h-16 text-pink-400 animate-bounce-slow" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                        Galería del Boske
                    </h1>
                    <p className="text-xl text-purple-300 max-w-2xl mx-auto">
                        Explora nuestro espacio mágico a través de imágenes
                    </p>
                    <div className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full"></div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {galleryItems.map((item, i) => (
                        <div
                            key={item.id}
                            className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
                                <ImageIcon className="w-16 h-16 text-purple-400 opacity-50" />
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <p className="text-xs text-pink-400 mb-1">{item.category}</p>
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                </div>
                            </div>

                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-12 h-12">
                                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-pink-500/30 group-hover:border-pink-500/70 transition-colors"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Note */}
                <div className="mt-16 text-center">
                    <p className="text-purple-300">
                        <span className="text-pink-400">✨</span> Más imágenes próximamente <span className="text-pink-400">✨</span>
                    </p>
                </div>
            </div>
        </div>
    );
}