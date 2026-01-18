import { Link } from "react-router-dom";

export default function OnlineSection() {
    return (
        <section className="w-full bg-linear-to-r from-blue-700 via-black to-blue-700 text-white py-8 md:py-12">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-3 md:mb-4">¡POSIBILIDAD 100% ONLINE!</h2>
                <p className="text-xs md:text-sm mt-3 md:mt-4 max-w-2xl mx-auto leading-relaxed"><span className="text-cyan-500">*</span> Editar, producir, mezclar, masterizar, entrega de podcasts, diseño de sonido y música para cortometrajes, diseño de sonido y música para videojuegos.</p>
            </div>
            <div className="flex px-4">
                <Link to="/contacto" className="mx-auto mt-6 md:mt-8 cta-button text-base md:text-xl">
                    ¡Mándanos tu proyecto!
                </Link>
            </div>
        </section>
    );
}