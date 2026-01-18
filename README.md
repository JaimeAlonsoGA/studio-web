# El Boske - Landing Page

Landing page mágica y psicodélica para El Boske, un estudio de grabación, mezcla y mastering con una estética de bosque encantado.

## 🎨 Características

- **Diseño Psicodélico**: Colores vibrantes, gradientes animados y efectos visuales únicos
- **Experiencia Inmersiva**: Página de entrada con botón "Entrar al Boske"
- **Secciones Completas**:
  - Hero con llamada a la acción
  - Introducción al estudio
  - Servicios (Grabación, Producción, Mezcla, Mastering)
  - Equipo del estudio
  - Discografía de trabajos
  - Actividades y talleres (Druidas de la Juerga, ECO - Alquimia Sónica)
  - Ubicación y contacto
  - Formulario de contacto funcional

- **Navegación**:
  - Inicio (Landing)
  - Galería
  - Discografía
  - Contacto

## 🚀 Tecnologías

- **React 19** con TypeScript
- **Vite** para desarrollo rápido
- **Tailwind CSS 4** para estilos
- **React Router** para navegación
- **Lucide React** para iconos
- **shadcn/ui** para componentes base
- **Framer Motion** (opcional para animaciones adicionales)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🗂️ Estructura del Proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── header.tsx           # Navegación principal
│   │   ├── page-layout.tsx      # Layout con header
│   │   └── page-content.tsx     # Contenedor de páginas
│   ├── sections/
│   │   ├── hero-section.tsx     # Sección hero
│   │   ├── intro-section.tsx    # Introducción
│   │   ├── services-section.tsx # Servicios
│   │   ├── team-section.tsx     # Equipo
│   │   ├── discography-section.tsx # Discografía
│   │   ├── activities-section.tsx  # Actividades
│   │   ├── location-section.tsx    # Ubicación
│   │   └── contact-section.tsx     # Contacto
│   └── ui/
│       └── button.tsx           # Componente Button de shadcn
├── pages/
│   ├── entrance-gate.tsx        # Página de entrada
│   ├── landing.tsx              # Landing principal
│   ├── gallery.tsx              # Galería
│   ├── discography.tsx          # Discografía completa
│   └── contact.tsx              # Contacto
├── routes/
│   └── routes.tsx               # Configuración de rutas
├── lib/
│   └── utils.ts                 # Utilidades
├── providers/
│   └── providers.tsx            # Providers de la app
├── index.css                    # Estilos globales y animaciones
└── App.tsx                      # Componente principal
```

## 🎨 Personalización

### Colores

Los colores principales se definen en `src/index.css`:

```css
:root {
  --purple-900: #4c1d95;
  --purple-800: #5b21b6;
  --pink-500: #ec4899;
  --cyan-500: #06b6d4;
}
```

### Animaciones

Las animaciones personalizadas están en `src/index.css`:
- `animate-float`: Elementos flotantes
- `animate-bounce-slow`: Rebote suave
- `animate-spin-slow`: Rotación lenta
- `animate-pulse-glow`: Brillo pulsante
- `animate-gradient-text`: Texto con gradiente animado
- `animate-fade-in`: Aparición suave

### Contenido

Para actualizar el contenido:

1. **Discografía**: Editar el array `albums` en `src/components/sections/discography-section.tsx` y `src/pages/discography.tsx`
2. **Equipo**: Editar el array `team` en `src/components/sections/team-section.tsx`
3. **Servicios**: Editar el array `services` en `src/components/sections/services-section.tsx`
4. **Actividades**: Editar el array `activities` en `src/components/sections/activities-section.tsx`

## 📝 TODO / Mejoras Futuras

- [ ] Integrar un backend real para el formulario de contacto (EmailJS, Formspree, etc.)
- [ ] Añadir imágenes reales del estudio en la galería
- [ ] Integrar Google Maps en la sección de ubicación
- [ ] Añadir reproductores de audio para la discografía
- [ ] Implementar sistema de reservas
- [ ] Añadir modo oscuro/claro (opcional)
- [ ] Optimizar imágenes y assets
- [ ] Añadir meta tags para SEO
- [ ] Implementar analytics (Google Analytics, etc.)

## 🌟 Características Destacadas

- **Responsive**: Funciona perfectamente en móviles, tablets y desktop
- **Animaciones Fluidas**: Transiciones y efectos suaves
- **Performance**: Optimizado con Vite y React 19
- **Accesibilidad**: Estructura semántica y navegación por teclado
- **Estética Única**: Diseño psicodélico que refleja la identidad del estudio

## 📄 Licencia

Este proyecto está creado para El Boske. Todos los derechos reservados.

## 🤝 Contribuciones

Para contribuir al proyecto, por favor contacta con el equipo de desarrollo.

---

**Desarrollado con ✨ y 🎵 para El Boske**