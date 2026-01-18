import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trees } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import video from '@/assets/videos/gate.webm';

export default function EntranceGate() {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleEnter = async () => {
        setIsPlaying(true);
        setIsFadingOut(true);
        setTimeout(async () => {
            if (videoRef.current) {
                try {
                    videoRef.current.playbackRate = 5;
                    await videoRef.current.play();
                } catch (error) {
                    console.error('Error playing video:', error);
                }
            }
        }, 100);
    };

    const handleVideoEnd = () => {
        setTimeout(() => {
            navigate('/hogar');
        }, 1000); // Match the fade-out duration
    };

    return (
        <div className="relative min-h-screen overflow-hidden main-gradient-bg">
            <motion.div
                className="absolute inset-0 z-10"
                animate={{ opacity: isFadingOut ? 0 : 1 }}
                transition={{ duration: 3 }}
            >
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover opacity-50"
                    onEnded={handleVideoEnd}
                    playsInline
                    preload="metadata"
                    muted
                    poster=""
                >
                    <source src={video} type="video/webm" />
                </video>
            </motion.div>

            <div className={`absolute inset-0 opacity-30 z-5 transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : ''}`}>
                <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-yellow-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500 ${isPlaying ? 'opacity-0' : ''}`}>
                {[...Array(20)].map((_, i) => {
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

            <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : ''}`}>
                <div className="mb-8 animate-bounce-slow">
                    <Trees className="hidden w-32 h-32 text-green-400 drop-shadow-glow" />
                </div>

                <h1 className="font-[fantasie] mb-4 text-7xl md:text-9xl font-bold tracking-wider main-gradient-text">
                    El Boske
                </h1>
{/* 
                <p className="font-[caprice] mb-12 text-xl md:text-2xl text-cyan-100 tracking-wide animate-fade-in">
                    Un portal hacia la creatividad infinita
                </p> */}

                <Button
                    onClick={handleEnter}
                    size="lg"
                    className="group relative overflow-hidden cta-button hover:scale-102 transition-all duration-300 animate-pulse-glow"
                >
                    <span className="font-[fantasie] relative z-10 flex items-center gap-3">
                        {/* <Sparkles className="w-6 h-6" /> */}
                        Adentrarse
                        {/* <Trees className="w-6 h-6" /> */}
                    </span>
                    {/* <div className="absolute inset-0 bg-linear-to-r from-indigo-700 via-cyan-200 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                </Button>

                <p className="tracking-wide font-bold mt-4 text-5xl text-cyan-100 animate-fade-in-delay">
                    ESTUDIO DE MÚSICA Y SONIDO PROFESIONAL
                </p>
            </div>

            {/* <div className={`absolute bottom-8 left-0 right-0 text-center z-10 transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : ''}`}>
                <p className="text-purple-300 text-sm tracking-widest animate-pulse">
                    ✨ Donde el sonido trasciende a música ✨
                </p>
            </div> */}
        </div>
    );
}