# Serendinails

> Centro profesional de uñas y tratamientos corporales con formaciones y cursos

## 🚀 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS + shadcn/ui
- **Animaciones**: Framer Motion
- **Backend**: Supabase (Postgres + Auth + Storage)
- **Editor**: TipTap (rich text)
- **Formularios**: React Hook Form + Zod
- **SEO**: next-seo
- **Mapas**: Google Maps API
- **Deploy**: Vercel

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd Serendinails

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Configuración

### 1. Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Copiar URL y anon key a `.env.local`
3. Ejecutar el schema SQL en el editor SQL de Supabase (ver `docs/supabase-schema.sql`)
4. Configurar Storage buckets:
   - `service-images`
   - `course-materials`
   - `blog-images`
   - `gallery`

### 2. Google Maps

1. Crear proyecto en [Google Cloud Console](https://console.cloud.google.com)
2. Habilitar Maps JavaScript API
3. Crear API key y añadirla a `.env.local`

### 3. shadcn/ui Components

Instalar componentes según necesites:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
npx shadcn@latest add dialog
# ... etc
```

## 📁 Estructura del Proyecto

```
/src
  /app              # Next.js App Router
    /(pages)        # Rutas públicas
    /admin          # Panel de administración
    /api            # API routes
  /components
    /ui             # shadcn/ui components
    /layout         # Layout components (Navbar, Footer)
    /animations     # Framer Motion wrappers
    /admin          # Admin components
    /forms          # Form components
    /editor         # TipTap editor
  /lib              # Utilities y configuración
  /types            # TypeScript types
```

## 🎨 Colores de Marca

- **Verde Pastel**: `#A9E6C9`
- **Dorado**: `#D4AF37`
- **Blanco/Negro**: Base con modo claro/oscuro

## 🏃‍♂️ Scripts Disponibles

```bash
npm run dev      # Desarrollo (localhost:3000)
npm run build    # Build para producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## 📚 Documentación

- [Guía de Arquitectura](./ARCHITECTURE.md) - Arquitectura completa y guía de desarrollo
- [Setup Guide](./SETUP.md) - Guía paso a paso de configuración

## 🚢 Deploy

El proyecto está configurado para deploy automático en Vercel:

1. Conectar repositorio a Vercel
2. Configurar variables de entorno en Vercel
3. Deploy automático en cada push a `main`

## 📄 Licencia

Privado - Serendinails © 2024
