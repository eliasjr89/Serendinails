import { MenuItem } from '@/types/navbar';

export const menuItems: MenuItem[] = [
  {
    label: 'Servicios',
    href: '/servicios',
    hasDropdown: true,
    dropdownItems: [
      {
        category: 'UÑAS',
        items: [
          { 
            label: 'Manicura', 
            href: '/servicios#manicura', 
            description: 'Cuidado profesional de manos' 
          },
          { 
            label: 'Pedicura', 
            href: '/servicios#pedicura', 
            description: 'Tratamiento completo de pies' 
          },
          { 
            label: 'Uñas Semipermanentes', 
            href: '/servicios#semipermanente', 
            description: 'Larga duración y brillo' 
          },
          { 
            label: 'Uñas Esculpidas', 
            href: '/servicios#esculpidas', 
            description: 'Extensiones profesionales' 
          },
        ]
      },
      {
        category: 'TRATAMIENTOS',
        items: [
          { 
            label: 'Masajes', 
            href: '/servicios#masajes', 
            description: 'Relajación y bienestar' 
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
        category: 'ESPECIALES',
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
        ]
      }
    ]
  },
  {
    label: 'Recursos',
    href: '/blog',
    hasDropdown: true,
    dropdownItems: [
      {
        category: 'APRENDE',
        items: [
          { 
            label: 'Blog', 
            href: '/blog', 
            description: 'Consejos y tendencias' 
          },
          { 
            label: 'Cursos', 
            href: '/cursos', 
            description: 'Formación profesional' 
          },
          { 
            label: 'Tutoriales', 
            href: '/blog#tutoriales', 
            description: 'Guías paso a paso' 
          },
        ]
      },
      {
        category: 'GALERÍA',
        items: [
          { 
            label: 'Trabajos Realizados', 
            href: '/galeria', 
            description: 'Nuestro portfolio' 
          },
          { 
            label: 'Antes y Después', 
            href: '/galeria#antes-despues', 
            description: 'Transformaciones' 
          },
        ]
      }
    ]
  },
  {
    label: 'Contacto',
    href: '/contacto'
  }
];
