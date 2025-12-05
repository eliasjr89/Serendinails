import { MenuItem } from '@/types/navbar';

export const menuItems: MenuItem[] = [
  {
    label: 'Servicios',
    href: '/servicios',
    hasDropdown: true,
    dropdownItems: [
      {
        category: 'Uñas',
        items: [
          { 
            label: 'Manicura Clásica', 
            href: '/servicios#manicura-clasica', 
            description: 'Cuidado tradicional de uñas' 
          },
          { 
            label: 'Manicura Semipermanente', 
            href: '/servicios#manicura-semi', 
            description: 'Larga duración y brillo' 
          },
          { 
            label: 'Pedicura Spa', 
            href: '/servicios#pedicura-spa', 
            description: 'Relajación total para tus pies' 
          },
          { 
            label: 'Uñas Esculpidas', 
            href: '/servicios#unas-esculpidas', 
            description: 'Extensiones profesionales' 
          },
        ]
      },
      {
        category: 'Tratamientos Corporales',
        items: [
          { 
            label: 'Masajes Relajantes', 
            href: '/servicios#masajes', 
            description: 'Terapias de bienestar' 
          },
          { 
            label: 'Depilación', 
            href: '/servicios#depilacion', 
            description: 'Técnicas profesionales' 
          },
          { 
            label: 'Tratamientos Faciales', 
            href: '/servicios#faciales', 
            description: 'Cuidado de la piel' 
          },
        ]
      },
      {
        category: 'Especiales',
        items: [
          { 
            label: 'Packs Novias', 
            href: '/servicios#novias', 
            description: 'Tu día perfecto' 
          },
          { 
            label: 'Gift Cards', 
            href: '/servicios#gift-cards', 
            description: 'El regalo ideal' 
          },
          { 
            label: 'Eventos Grupales', 
            href: '/servicios#eventos', 
            description: 'Celebraciones especiales' 
          },
        ]
      }
    ]
  },
  {
    label: 'Cursos',
    href: '/cursos',
    hasDropdown: true,
    dropdownItems: [
      {
        category: 'Nivel Básico',
        items: [
          { 
            label: 'Iniciación a Uñas', 
            href: '/cursos#basico-unas', 
            description: 'Fundamentos esenciales' 
          },
          { 
            label: 'Manicura Profesional', 
            href: '/cursos#manicura-pro', 
            description: 'Técnicas avanzadas' 
          },
          { 
            label: 'Pedicura Básica', 
            href: '/cursos#pedicura-basica', 
            description: 'Cuidado de pies' 
          },
        ]
      },
      {
        category: 'Nivel Avanzado',
        items: [
          { 
            label: 'Nail Art', 
            href: '/cursos#nail-art', 
            description: 'Diseños creativos' 
          },
          { 
            label: 'Extensiones de Uñas', 
            href: '/cursos#extensiones', 
            description: 'Técnicas de alargamiento' 
          },
          { 
            label: 'Uñas Acrílicas', 
            href: '/cursos#acrilicas', 
            description: 'Esculpido profesional' 
          },
        ]
      },
      {
        category: 'Información',
        items: [
          { 
            label: 'Calendario de Cursos', 
            href: '/cursos#calendario', 
            description: 'Próximas fechas' 
          },
          { 
            label: 'Certificación', 
            href: '/cursos#certificacion', 
            description: 'Títulos oficiales' 
          },
          { 
            label: 'Preguntas Frecuentes', 
            href: '/cursos#faq', 
            description: 'Resuelve tus dudas' 
          },
        ]
      }
    ]
  },
  {
    label: 'Blog',
    href: '/blog'
  },
  {
    label: 'Galería',
    href: '/galeria'
  },
  {
    label: 'Contacto',
    href: '/contacto'
  }
];
