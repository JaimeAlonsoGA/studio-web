import { useState, useCallback } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormErrors {
    name?: string;
    email?: string;
    service?: string;
    message?: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Validación del formulario
    const validateForm = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        // Validar nombre
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        }

        // Validar email
        if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Por favor, introduce un email válido';
            }
        }

        // Validar servicio
        if (!formData.service) {
            newErrors.service = 'Por favor, selecciona un servicio';
        }

        // Validar mensaje
        if (!formData.message.trim()) {
            newErrors.message = 'El mensaje es obligatorio';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Limpiar errores previos
        setErrors({});
        setErrorMessage('');

        // Validar
        if (!validateForm()) {
            return;
        }

        // Cambiar a estado enviando
        setStatus('sending');

        try {
            const response = await fetch('/api/send-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar el mensaje');
            }

            // Éxito
            setStatus('success');
            
            // Resetear formulario después de 5 segundos
            setTimeout(() => {
                setStatus('idle');
                setFormData({ name: '', email: '', phone: '', service: '', message: '' });
            }, 5000);

        } catch (error) {
            console.error('Error enviando formulario:', error);
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Ha ocurrido un error. Por favor, inténtalo de nuevo.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        
        // Limpiar error del campo cuando el usuario empieza a escribir
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    return (
        <section id="contacto" className="relative py-12 md:py-20 bg-linear-to-b from-black via-indigo-900 to-blue-900 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 md:left-20 w-48 md:w-96 h-48 md:h-96 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 md:right-20 w-40 md:w-80 h-40 md:h-80 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-10 md:mb-20">
                    <h2 className="font-[fantasie] text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
                        <svg viewBox="0 0 500 150" className="w-full max-w-xs md:max-w-3xl mx-auto">
                            <defs>
                                <path
                                    id="curve"
                                    d="M 50,120 Q 250,60 450,120"
                                    fill="transparent"
                                />
                                <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                                    <stop offset="50%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            <text fontSize="48" fontWeight="bold" fill="url(#textGradient)" fontFamily="fantasie, serif">
                                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                                    Habla Amigo y Entra
                                </textPath>
                            </text>
                        </svg>
                    </h2>
                    <p className="text-base md:text-xl font-bold text-purple-300 max-w-2xl mx-auto px-4">
                        Todo empieza con un mensaje. Cuéntanos sobre tus ideas y proyectos
                    </p>
                </div>

                {/* Form Container */}
                <div className="max-w-3xl mx-auto">
                    <div className="relative p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl bg-linear-to-br from-amber-900/50 to-black/50 backdrop-blur border border-amber-500/30 md:border-2 animate-fade-in">
                        {status === 'success' ? (
                            <div className="text-center py-8 md:py-12 animate-fade-in">
                                <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-green-400 mx-auto mb-4 md:mb-6" />
                                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-purple-100">
                                    ¡Mensaje Enviado!
                                </h3>
                                <p className="text-base md:text-xl text-purple-300 mb-2">
                                    Gracias por contactarnos, {formData.name}.
                                </p>
                                <p className="text-sm md:text-base text-purple-400">
                                    Te hemos enviado un email de confirmación. Responderemos pronto a tu solicitud.
                                </p>
                            </div>
                        ) : status === 'error' ? (
                            <div className="text-center py-8 md:py-12 animate-fade-in">
                                <AlertCircle className="w-16 h-16 md:w-20 md:h-20 text-red-400 mx-auto mb-4 md:mb-6" />
                                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-purple-100">
                                    Error al enviar
                                </h3>
                                <p className="text-base md:text-xl text-red-300 mb-4">
                                    {errorMessage}
                                </p>
                                <Button
                                    onClick={() => setStatus('idle')}
                                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl"
                                >
                                    Intentar de nuevo
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-amber-200 mb-1.5 md:mb-2 font-medium text-sm md:text-base">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={status === 'sending'}
                                        className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-amber-900/50 border ${errors.name ? 'border-red-500' : 'border-amber-500/30'} md:border-2 focus:border-amber-500/50 text-purple-100 placeholder-amber-400 outline-none transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                                        placeholder="Tu nombre"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-amber-200 mb-1.5 md:mb-2 font-medium text-sm md:text-base">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={status === 'sending'}
                                        className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-amber-900/50 border ${errors.email ? 'border-red-500' : 'border-amber-500/30'} md:border-2 focus:border-amber-500/50 text-amber-100 placeholder-amber-400 outline-none transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                                        placeholder="tu@email.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-amber-200 mb-1.5 md:mb-2 font-medium text-sm md:text-base">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={status === 'sending'}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-amber-900/50 border border-amber-500/30 md:border-2 focus:border-amber-500/50 text-amber-100 placeholder-amber-400 outline-none transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="+34 XXX XXX XXX"
                                    />
                                </div>

                                {/* Service */}
                                <div>
                                    <label htmlFor="service" className="block text-amber-200 mb-1.5 md:mb-2 font-medium text-sm md:text-base">
                                        Servicio de Interés *
                                    </label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        disabled={status === 'sending'}
                                        className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-amber-900/50 border ${errors.service ? 'border-red-500' : 'border-amber-500/30'} md:border-2 focus:border-amber-500/50 text-amber-100 outline-none transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        <option value="">Selecciona un servicio</option>
                                        <option value="grabacion">Grabación</option>
                                        <option value="edicion">Edición</option>
                                        <option value="produccion">Producción</option>
                                        <option value="mezcla">Mezcla</option>
                                        <option value="mastering">Mastering</option>
                                        <option value="clases-dj">Clases de DJ</option>
                                        <option value="clases-produccion">Clases de Producción</option>
                                        <option value="diseno-sonoro">Proyecto de Cortometraje</option>
                                        <option value="musica-cortometraje">Proyecto de Videojuego</option>
                                        <option value="podcast">Podcast</option>
                                        <option value="varios">Varios Servicios</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                    {errors.service && (
                                        <p className="mt-1 text-sm text-red-400">{errors.service}</p>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-amber-200 mb-1.5 md:mb-2 font-medium text-sm md:text-base">
                                        Cuéntanos sobre tu proyecto *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        disabled={status === 'sending'}
                                        rows={4}
                                        className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-amber-900/50 border ${errors.message ? 'border-red-500' : 'border-amber-500/30'} md:border-2 focus:border-amber-500/50 text-amber-100 placeholder-amber-400 outline-none transition-colors resize-none text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
                                        placeholder="Describe tu proyecto, tus objetivos y cualquier detalle que consideres importante..."
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full py-4 md:py-6 text-base md:text-lg bg-linear-to-r from-amber-600 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-600 text-white font-semibold rounded-lg md:rounded-xl shadow-2xl hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                                            Enviar Mensaje
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>

                    {/* Info Text */}
                    <div className="mt-6 md:mt-8 text-center">
                        <p className="text-purple-300 text-sm md:text-base">¡Gracias por contactarnos! Te responderemos enseguida.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}