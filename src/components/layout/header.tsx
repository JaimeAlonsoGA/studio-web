import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trees, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/icons/puppet/puppet-1.png';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/home', label: 'Inicio' },
        // { path: '/galeria', label: 'Galería' },
        { path: '/discografia', label: 'Discografía ' },
        { path: '/contacto', label: 'Contacto' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-amber-950/95 backdrop-blur-md shadow-xl border-b-2 border-pink-500/30'
                : 'bg-transparent border-b-0 border-pink-500/0'
                }`}
        >
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link
                        to="/home"
                        className="flex flex-row items-start gap-2 text-2xl font-bold tracking-wider group"
                    >
                        {/* <img src={logo} alt="El Boske Logo" className="w-7 h-7 rounded-full bg-white border-2 border-blue-700" /> */}
                        <span className="font-[fantasie] safe-gradient-text bg-clip-text text-transparent">
                            El Boske
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-[caprice] font-bold text-xl transition-all duration-300 hover:text-amber-500 hover:scale-110 ${location.pathname === link.path
                                    ? 'text-amber-500 border-b-3 border-amber-600'
                                    : 'text-primary/70 border-b-3 border-transparent'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-purple-200 hover:text-pink-400"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block text-lg font-medium transition-colors hover:text-pink-400 ${location.pathname === link.path ? 'text-pink-400' : 'text-purple-200'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}