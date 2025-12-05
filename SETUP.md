# 🛠️ Setup Guide - Serendinails

Guía paso a paso para configurar el proyecto desde cero.

---

## ✅ Prerequisitos

- Node.js 18+ instalado
- npm o pnpm
- Cuenta de GitHub
- Cuenta de Supabase (gratuita)
- Cuenta de Google Cloud (para Maps API)
- Cuenta de Vercel (gratuita)

---

## 📦 1. Instalación Inicial

```bash
# Clonar el repositorio
git clone <your-repo-url>
cd Serendinails

# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.local.example .env.local
```

---

## 🗄️ 2. Configurar Supabase

### 2.1 Crear Proyecto

1. Ve a [supabase.com](https://supabase.com)
2. Click en "New Project"
3. Nombre: `serendinails`
4. Región: Elige la más cercana a tus usuarios
5. Contraseña de base de datos: Guárdala de forma segura

### 2.2 Obtener Credenciales

1. En tu proyecto de Supabase, ve a **Settings** → **API**
2. Copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Pégalas en tu archivo `.env.local`

### 2.3 Ejecutar Schema SQL

1. En Supabase, ve a **SQL Editor**
2. Click en "New Query"
3. Copia y pega el contenido de `docs/supabase-schema.sql`
4. Click en "Run" para ejecutar

### 2.4 Configurar Storage Buckets

Los buckets ya se crean con el SQL schema, pero verifica en **Storage**:
- `service-images` (público)
- `course-materials` (público)
- `blog-images` (público)
- `gallery` (público)

### 2.5 Configurar Autenticación (Admin)

1. Ve a **Authentication** → **Providers**
2. Habilita **Email** provider
3. Ve a **Users** → **Add User**
4. Crea tu usuario admin con email y contraseña

---

## 🗺️ 3. Configurar Google Maps

### 3.1 Crear Proyecto en Google Cloud

1. Ve a [console.cloud.google.com](https://console.cloud.google.com)
2. Crea un nuevo proyecto: `Serendinails`

### 3.2 Habilitar Maps JavaScript API

1. En el menú, ve a **APIs & Services** → **Library**
2. Busca "Maps JavaScript API"
3. Click en "Enable"

### 3.3 Crear API Key

1. Ve a **APIs & Services** → **Credentials**
2. Click en "Create Credentials" → "API Key"
3. Copia la API key
4. Click en "Restrict Key":
   - **Application restrictions**: HTTP referrers
   - Añade: `localhost:3000/*` y tu dominio de producción
   - **API restrictions**: Selecciona "Maps JavaScript API"
5. Pega la key en `.env.local` como `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

---

## 🎨 4. Instalar shadcn/ui Components

Instala los componentes básicos que necesitarás:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add toast
npx shadcn@latest add dropdown-menu
npx shadcn@latest add separator
npx shadcn@latest add switch
npx shadcn@latest add tabs
```

---

## 🚀 5. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📝 6. Configurar Git y GitHub

```bash
# Inicializar Git (si no está inicializado)
git init

# Añadir remote
git remote add origin <your-github-repo-url>

# Primer commit
git add .
git commit -m "Initial setup: Next.js 14 + TailwindCSS + Supabase"

# Push a GitHub
git push -u origin main
```

---

## 🚢 7. Deploy en Vercel

### 7.1 Conectar Repositorio

1. Ve a [vercel.com](https://vercel.com)
2. Click en "New Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente Next.js

### 7.2 Configurar Variables de Entorno

En la configuración del proyecto en Vercel, añade:

```
NEXT_PUBLIC_SUPABASE_URL=<tu-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu-supabase-anon-key>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<tu-google-maps-key>
NEXT_PUBLIC_SITE_URL=<tu-dominio-vercel>
```

### 7.3 Deploy

1. Click en "Deploy"
2. Espera a que termine el build
3. ¡Tu sitio está live!

### 7.4 Configurar Dominio Personalizado (Opcional)

1. En tu proyecto de Vercel, ve a **Settings** → **Domains**
2. Añade tu dominio personalizado
3. Configura los DNS según las instrucciones

---

## 🔧 8. Extensiones de VS Code Recomendadas

Instala estas extensiones para mejor experiencia de desarrollo:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "dsznajder.es7-react-js-snippets",
    "ms-vscode.vscode-typescript-next",
    "supabase.supabase-vscode"
  ]
}
```

Crea el archivo `.vscode/extensions.json` con este contenido.

---

## ✅ 9. Verificación

Verifica que todo funciona:

- [ ] `npm run dev` ejecuta sin errores
- [ ] La página de inicio carga en localhost:3000
- [ ] TailwindCSS funciona (los estilos se aplican)
- [ ] Las fuentes Inter y Playfair Display se cargan
- [ ] Puedes conectarte a Supabase (prueba con una query simple)
- [ ] El proyecto está en GitHub
- [ ] El deploy en Vercel funciona

---

## 🎯 10. Próximos Pasos

Ahora estás listo para desarrollar. Consulta [ARCHITECTURE.md](./ARCHITECTURE.md) para:

- Arquitectura de carpetas detallada
- Guía de componentes a crear
- Patrones de código recomendados
- Orden de desarrollo sugerido

---

## 🆘 Troubleshooting

### Error: Cannot find module 'X'
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error de TypeScript
```bash
npm run build
```
Revisa los errores y corrígelos uno por uno.

### Supabase no conecta
- Verifica que las variables de entorno estén correctas
- Asegúrate de que las RLS policies permitan acceso público a lectura

### Google Maps no carga
- Verifica que la API key sea correcta
- Asegúrate de que Maps JavaScript API esté habilitada
- Revisa las restricciones de la API key

---

¿Necesitas ayuda? Revisa la documentación o contacta al equipo de desarrollo.
