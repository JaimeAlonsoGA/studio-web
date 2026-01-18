import React, { useState, useEffect } from 'react';
import { Trees, Sparkles, Moon, Star } from 'lucide-react';
import { useResponsive } from '@/hooks/is-responsive';
import harp from '@/assets/icons/instruments/harp.png';
import maracas from '@/assets/icons/instruments/maracas.png';
import guitar from '@/assets/icons/instruments/guitar.png';
import cello from '@/assets/icons/instruments/cello.png';
import clarinet from '@/assets/icons/instruments/clarinet.png';
import gaita from '@/assets/icons/instruments/gaita.png';
import keyboard from '@/assets/icons/instruments/keyboard.png';
import digde from '@/assets/icons/instruments/digde.png';
import bansuri from '@/assets/icons/instruments/bansuri.png';
import trumpet from '@/assets/icons/instruments/trumpet.png';
import acordeon from '@/assets/icons/instruments/acordeon.png';
import congas from '@/assets/icons/instruments/congas.png';
import sitar from '@/assets/icons/instruments/sitar.png';
import lotus from '@/assets/icons/lotus.png';

import { shuffle } from '@/lib/utils';

const instruments = [
    { src: harp, name: 'Harp' },
    { src: maracas, name: 'Maracas' },
    { src: guitar, name: 'Guitar' },
    { src: cello, name: 'Cello' },
    { src: clarinet, name: 'Clarinet' },
    { src: gaita, name: 'Gaita' },
    { src: keyboard, name: 'Keyboard' },
    // { src: digde, name: 'Didgeridoo' },
    { src: bansuri, name: 'Bansuri' },
    { src: trumpet, name: 'Trumpet' },
    { src: acordeon, name: 'Acordeon' },
    { src: congas, name: 'Congas' },
    { src: sitar, name: 'Sitar' },
];

type Side = 'left' | 'right';

interface Bubble {
    id: number;
    instrument: typeof instruments[number];
    side: Side;
    offset: number;
    duration: number;
    delay: number;
}

const CASCADE_SIZE = 6;
const DURATION = 8;

export default function IntroSection() {
    const [bubbles, setBubbles] = React.useState<Bubble[]>([]);
    const initializedRef = React.useRef(false);
    const nextIdRef = React.useRef(0);
    const { isMobile, isTablet } = useResponsive();

    const decksRef = React.useRef<Record<Side, typeof instruments>>({
        left: shuffle(instruments),
        right: shuffle(instruments),
    });

    const randomJitter = (max = 0.35) => Math.random() * max;
    const sideOffset = () => Math.random() * 0.8;

    const getNextInstrument = (side: Side) => {
        if (decksRef.current[side].length === 0) {
            decksRef.current[side] = shuffle(instruments);
        }
        return decksRef.current[side].shift()!;
    };

    const createBubble = (side: Side, delay = 0) => {
        const bubble: Bubble = {
            id: nextIdRef.current++,
            instrument: getNextInstrument(side),
            side,
            offset: Math.random() * 10,
            duration: DURATION,
            delay,
        };

        setBubbles(prev => [...prev, bubble]);

        // ⬆️ ESTA burbuja se elimina SOLO cuando termina su animación
        setTimeout(() => {
            setBubbles(prev => prev.filter(b => b.id !== bubble.id));
        }, (DURATION + delay) * 1000);
    };

    const startCascadeForSide = (side: Side, baseDelay: number) => {
        const STAGGER = DURATION / CASCADE_SIZE;

        const tick = () => {
            createBubble(side, randomJitter());

            setTimeout(
                tick,
                (STAGGER + randomJitter()) * 1000
            );
        };

        setTimeout(tick, baseDelay * 1000);
    };

    React.useEffect(() => {
        // En móvil, no iniciar las burbujas flotantes para mejor rendimiento
        if (isMobile) return;

        if (initializedRef.current) return;
        initializedRef.current = true;

        const STAGGER = DURATION / CASCADE_SIZE;

        startCascadeForSide('left', randomJitter());
        startCascadeForSide('right', STAGGER / 2 + sideOffset());
    }, [isMobile]);

    return (
        <section className="relative py-12 md:py-16 bg-linear-to-b from-purple-800 via-indigo-900 to-purple-900 overflow-hidden px-4 md:px-10">
            {/* Floating instrument bubbles - solo en desktop/tablet */}
            {!isMobile && bubbles.map(bubble => (
                <div
                    key={bubble.id}
                    className="absolute pointer-events-none"
                    style={{
                        [bubble.side]: `${bubble.offset}%`,
                        bottom: '-80px',
                        animation: `floatUp ${bubble.duration}s linear ${bubble.delay}s forwards`,
                    }}
                >
                    <img
                        src={bubble.instrument.src}
                        alt={bubble.instrument.name}
                        className="w-12 h-12 md:w-20 md:h-20 opacity-0"
                        style={{
                            animation: `fadeInOut ${bubble.duration}s linear ${bubble.delay}s forwards`,
                        }}
                    />
                </div>
            ))}

            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 md:mb-10">
                        <div className="inline-block">
                            {/* <img src={currentInstrument.src} alt={currentInstrument.name} className="w-16 h-16 animate-bounce-slow" /> */}
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-linear-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                            A la Refinería Musical
                        </h2>
                        <div className="w-20 md:w-24 h-1 mx-auto bg-linear-to-r from-pink-500 to-cyan-500 rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 md:space-y-8 text-base md:text-lg lg:text-xl text-purple-200 leading-relaxed">
                        <p className="animate-fade-in">
                            En el corazón de un bosque de coníferas, donde la roca se fusiona con el musgo,
                            existe un lugar: un <span className="text-pink-400 font-bold">estudio de grabación,
                                mezcla y mastering</span> que trasciende lo convencional.
                        </p>

                        <p className="animate-fade-in delay-200">
                            Aquí, tus ideas se materializan como el vapor de agua que se condensa y cae de la nube en forma de lluvia !Lluvia musical! El espacio sugiere creatividad y conexión con el momento.
                            Cada sesión es un viaje único hacia territorios inexplorados de la vibración.
                        </p>

                        <p className="animate-fade-in delay-400">
                            {/* <Sparkles className="inline w-6 h-6 text-yellow-400 mr-2" /> */}
                            Ya sea porque quieres transformar en canción un viejo audio del móvil, o explorar tu universo interior con el didgeridoo, el espacio está diseñado para liberar tu imaginación y darle cabida a todo tipo de música.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-10">
                        {[
                            { number: '∞', label: 'Creatividad Ilimitada', gradient: 'from-pink-500 to-purple-600' },
                            { number: '100%', label: 'Música Garantizada', gradient: 'from-purple-500 to-cyan-600' },
                            { number: '24/7', label: 'Exploración Constante', gradient: 'from-cyan-500 to-green-500' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="text-center p-5 md:p-8 rounded-2xl bg-purple-900/30 backdrop-blur border border-pink-500/20 hover:border-pink-500/50 transition-all hover:scale-105 animate-fade-in"
                                style={{ animationDelay: `${i * 150}ms` }}
                            >
                                <div className={`text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                    {stat.number}
                                </div>
                                <div className="text-purple-300 text-sm md:text-base">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}