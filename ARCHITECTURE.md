# 🏗️ Guía de Arquitectura y Desarrollo - Serendinails

## 📋 Resumen del Proyecto

**Serendinails** es una web profesional para un centro de uñas y tratamientos corporales que incluye:
- Información de servicios
- Cursos y formaciones (con PDFs descargables)
- Blog con editor rico (TipTap)
- Galería de trabajos
- Panel de administración completo
- Integración con Fresha, WhatsApp, Instagram, Google Maps

---

## 🎨 Estilo Visual (Inspirado en Squarespace)

### Animaciones Clave
1. **Navbar Inteligente**
   - Sticky con transición de transparente a sólido al hacer scroll
   - Usar `useScroll()` de Framer Motion
   - Backdrop blur inicial que desaparece

2. **Scroll Animations**
   - Patrón: `fade in + slide up` (translateY: 20 → 0)
   - Duración: 0.4-0.6s
   - Easing: `ease-out` o `easeInOut`
   - Viewport trigger: `margin: "-100px"`

3. **Stagger Effects**
   - Para listas de servicios, cursos, blog posts
   - Delay entre elementos: 0.1-0.15s

4. **Hover States**
   - Scale: 1.02-1.05
   - TranslateY: -2 a -4px
   - Transición rápida: 0.2-0.3s

---

## 📁 Arquitectura de Carpetas

```
/src
  /app
    /layout.tsx                 # Root layout con fonts y providers
    /page.tsx                   # Home page
    /(pages)                    # Grupo de rutas públicas
      /servicios
        /page.tsx               # Lista de servicios
        /[slug]/page.tsx        # Detalle de servicio
      /cursos
        /page.tsx               # Lista de cursos
        /[slug]/page.tsx        # Detalle de curso + descarga PDF
      /blog
        /page.tsx               # Lista de posts
        /[slug]/page.tsx        # Post individual
      /galeria/page.tsx         # Galería de imágenes
      /contacto/page.tsx        # Formulario + mapa
    /admin
      /layout.tsx               # Layout protegido con auth
      /dashboard/page.tsx       # Dashboard principal
      /servicios/page.tsx       # CRUD servicios
      /cursos/page.tsx          # CRUD cursos
      /blog/page.tsx            # CRUD blog con TipTap
      /galeria/page.tsx         # CRUD galería
    /api
      /auth/[...nextauth]       # Si usas NextAuth (opcional)
  
  /components
    /ui                         # shadcn/ui components
      /button.tsx
      /card.tsx
      /dialog.tsx
      /form.tsx
      /input.tsx
      /select.tsx
      /textarea.tsx
      /toast.tsx
      /...
    /layout                     # Componentes de layout
      /Navbar.tsx               # Navbar con scroll effect
      /Footer.tsx
      /MobileMenu.tsx
      /ThemeToggle.tsx          # Dark mode toggle
    /animations                 # Wrappers de animación
      /FadeInUp.tsx             # Componente reutilizable
      /StaggerContainer.tsx
      /ParallaxSection.tsx
    /admin                      # Componentes del admin
      /ServiceForm.tsx
      /CourseForm.tsx
      /BlogForm.tsx
      /GalleryUpload.tsx
    /forms                      # Formularios públicos
      /ContactForm.tsx
    /editor                     # Editor TipTap
      /TipTapEditor.tsx
      /Toolbar.tsx
  
  /lib
    /supabase.ts                # Cliente Supabase
    /utils.ts                   # Utilidades (cn, etc)
    /validations.ts             # Schemas Zod
    /seo.ts                     # Helpers SEO
    /hooks                      # Custom hooks
      /useScrollPosition.ts
      /useInView.ts
  
  /types
    /database.ts                # Tipos de Supabase
    /index.ts                   # Tipos generales
```

---

## 🗄️ Esquema de Base de Datos (Supabase)

### Tablas Principales

#### `services`
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,  -- Rich text content
  price DECIMAL(10,2),
  duration INTEGER,  -- minutos
  image_url TEXT,
  category TEXT,  -- 'nails', 'body', 'facial', etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `courses`
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,  -- Rich text content
  price DECIMAL(10,2),
  duration_hours INTEGER,
  pdf_url TEXT,  -- URL del PDF en Supabase Storage
  flyer_url TEXT,  -- URL del flyer
  level TEXT,  -- 'beginner', 'intermediate', 'advanced'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `blog_posts`
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content JSONB,  -- TipTap JSON content
  cover_image_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `gallery_items`
```sql
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,  -- 'nails', 'body', 'before_after', etc.
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `comments` (opcional para testimonios)
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Storage Buckets
- `service-images`: Imágenes de servicios
- `course-materials`: PDFs y flyers de cursos
- `blog-images`: Imágenes del blog
- `gallery`: Fotos de la galería

---

## 🔧 Tecnologías y Cuándo Usarlas

### 1. **Framer Motion** - Animaciones
```tsx
// Ejemplo: FadeInUp component
import { motion } from 'framer-motion';

export const FadeInUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    viewport={{ once: true, margin: "-100px" }}
  >
    {children}
  </motion.div>
);

// Uso:
<FadeInUp delay={0.2}>
  <ServiceCard {...service} />
</FadeInUp>
```

### 2. **shadcn/ui** - Componentes UI
```bash
# Instalar componentes según necesites:
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
npx shadcn@latest add dialog
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add toast
```

### 3. **React Hook Form + Zod** - Formularios
```tsx
// Ejemplo: Validation schema
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Nombre muy corto'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Mensaje muy corto'),
});

// En el componente:
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm({
  resolver: zodResolver(contactSchema),
  defaultValues: { name: '', email: '', message: '' }
});
```

### 4. **TipTap** - Editor Rico
```tsx
// Configuración básica
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

const editor = useEditor({
  extensions: [StarterKit, Image, Link],
  content: initialContent,
  onUpdate: ({ editor }) => {
    const json = editor.getJSON();
    onChange(json);  // Guardar en Supabase como JSONB
  }
});
```

### 5. **Supabase** - Backend
```tsx
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Ejemplo: Fetch services
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}
```

### 6. **next-seo** - SEO
```tsx
// En cada página:
import { NextSeo } from 'next-seo';

export default function ServiciosPage() {
  return (
    <>
      <NextSeo
        title="Servicios de Uñas | Serendinails"
        description="Descubre nuestros servicios profesionales de manicura, pedicura y tratamientos corporales"
        openGraph={{
          title: 'Servicios de Uñas | Serendinails',
          description: '...',
          images: [{ url: '/og-image.jpg' }],
        }}
      />
      {/* Contenido */}
    </>
  );
}
```

---

## 🎯 Orden de Desarrollo Recomendado

### Fase 1: Layout y Navegación ✅ (COMPLETADO)
- [x] Configuración inicial
- [x] Instalación de dependencias
- [ ] **TU TURNO**: Crear componente Navbar con scroll effect
- [ ] **TU TURNO**: Crear Footer
- [ ] **TU TURNO**: Implementar ThemeToggle (dark mode)

### Fase 2: Home Page
- [ ] **TU TURNO**: Hero section con animación
- [ ] **TU TURNO**: Sección de servicios destacados (con stagger)
- [ ] **TU TURNO**: Sección de cursos
- [ ] **TU TURNO**: Testimonios
- [ ] **TU TURNO**: CTA para reservas (link a Fresha)

### Fase 3: Páginas de Contenido
- [ ] **TU TURNO**: `/servicios` - Grid de servicios con filtros
- [ ] **TU TURNO**: `/servicios/[slug]` - Detalle de servicio
- [ ] **TU TURNO**: `/cursos` - Lista de cursos
- [ ] **TU TURNO**: `/cursos/[slug]` - Detalle + descarga PDF
- [ ] **TU TURNO**: `/blog` - Lista de posts
- [ ] **TU TURNO**: `/blog/[slug]` - Post individual
- [ ] **TU TURNO**: `/galeria` - Galería con lightbox
- [ ] **TU TURNO**: `/contacto` - Formulario + Google Maps

### Fase 4: Panel Admin
- [ ] **TU TURNO**: Configurar Supabase Auth
- [ ] **TU TURNO**: Layout protegido
- [ ] **TU TURNO**: Dashboard con estadísticas
- [ ] **TU TURNO**: CRUD Servicios
- [ ] **TU TURNO**: CRUD Cursos (con upload de PDFs)
- [ ] **TU TURNO**: CRUD Blog (con TipTap)
- [ ] **TU TURNO**: CRUD Galería (con upload de imágenes)

### Fase 5: Integraciones
- [ ] **TU TURNO**: Google Maps en página de contacto
- [ ] **TU TURNO**: Botón flotante de WhatsApp
- [ ] **TU TURNO**: Links a Instagram
- [ ] **TU TURNO**: Botón de reserva (Fresha)

### Fase 6: SEO y Optimización
- [ ] **TU TURNO**: Meta tags en todas las páginas
- [ ] **TU TURNO**: JSON-LD para local business
- [ ] **TU TURNO**: Sitemap
- [ ] **TU TURNO**: robots.txt
- [ ] **TU TURNO**: Optimización de imágenes

---

## 💡 Recomendaciones de Desarrollo

### Componentes Reutilizables a Crear

1. **`<FadeInUp>`** - Animación de entrada
2. **`<StaggerContainer>`** - Para listas animadas
3. **`<SectionHeading>`** - Títulos consistentes
4. **`<ServiceCard>`** - Card de servicio
5. **`<CourseCard>`** - Card de curso
6. **`<BlogCard>`** - Card de post
7. **`<GalleryImage>`** - Imagen de galería con lightbox
8. **`<ContactButton>`** - Botón de contacto reutilizable

### Hooks Personalizados a Crear

1. **`useScrollPosition()`** - Para navbar scroll effect
2. **`useInView()`** - Para animaciones al hacer scroll
3. **`useSupabase()`** - Wrapper para queries de Supabase
4. **`useAuth()`** - Para autenticación admin

### Patrones de Código

#### Server Components (por defecto en App Router)
```tsx
// app/(pages)/servicios/page.tsx
import { getServices } from '@/lib/supabase';

export default async function ServiciosPage() {
  const services = await getServices();
  
  return (
    <div>
      {services.map(service => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  );
}
```

#### Client Components (cuando necesites interactividad)
```tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function InteractiveComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      {/* ... */}
    </motion.div>
  );
}
```

---

## 🚀 Próximos Pasos Inmediatos

1. **Instalar shadcn/ui components básicos**:
   ```bash
   npx shadcn@latest add button card dialog form input select textarea toast
   ```

2. **Crear Navbar con scroll effect**:
   - Usa `useScroll()` de Framer Motion
   - Transición de transparente a sólido
   - Menú móvil responsive

3. **Configurar Supabase**:
   - Crear proyecto en supabase.com
   - Copiar URL y anon key a `.env.local`
   - Ejecutar SQL schema

4. **Desarrollar Home Page**:
   - Hero con animación
   - Secciones con FadeInUp
   - Integrar primeros datos de Supabase

---

¿Por dónde quieres empezar? Te puedo ayudar con pseudocódigo y recomendaciones para cualquier componente.
