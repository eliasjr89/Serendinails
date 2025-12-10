import { getServices, Service } from "@/lib/supabase";
import { FadeInUp } from "@/components/animations/FadeInUp";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { ServiceCard } from "@/components/ServiceCard";
import { Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Servicios",
  description:
    "Descubre nuestra amplia gama de servicios profesionales de uñas y tratamientos corporales",
};

// Configuration for service sections matching Navbar links
const sections = [
  {
    id: "manicura",
    title: "Manicura",
    description: "Cuidado profesional de manos",
    // Filter: Check category 'Manicura' but exclude 'Semipermanente' which has its own section
    filter: (s: Service) =>
      s.category === "Manicura" && !s.slug.includes("semipermanente"),
  },
  {
    id: "pedicura",
    title: "Pedicura",
    description: "Tratamiento completo de pies",
    filter: (s: Service) => s.category === "Pedicura",
  },
  {
    id: "semipermanente",
    title: "Uñas Semipermanentes",
    description: "Larga duración y brillo",
    filter: (s: Service) =>
      s.slug.includes("semipermanente") ||
      s.title?.toLowerCase().includes("semipermanente"),
  },
  {
    id: "esculpidas",
    title: "Uñas Esculpidas",
    description: "Extensiones profesionales (Gel y Acrílico)",
    filter: (s: Service) => s.category === "Uñas Artificiales",
  },
  {
    id: "masajes",
    title: "Masajes",
    description: "Relajación y bienestar",
    filter: (s: Service) => s.category === "Masajes" || s.category === "Body",
  },
  {
    id: "depilacion",
    title: "Depilación",
    description: "Técnicas profesionales",
    filter: (s: Service) =>
      s.category === "Depilacion" || s.category === "Depilación",
  },
  {
    id: "faciales",
    title: "Tratamientos Faciales",
    description: "Cuidado de la piel",
    filter: (s: Service) =>
      s.category === "Faciales" || s.category === "Facial",
  },
  {
    id: "novias",
    title: "Packs Novias",
    description: "Tu día perfecto",
    filter: (s: Service) => s.category === "Novias" || s.slug.includes("novia"),
  },
  {
    id: "gift-cards",
    title: "Gift Cards",
    description: "El regalo ideal",
    filter: (s: Service) =>
      s.category === "Gift Cards" || s.slug.includes("gift"),
  },
  // Catch-all for other items (Nail Art, Mantenimiento) displaying at bottom if needed
  {
    id: "otros",
    title: "Otros Servicios",
    description: "Mantenimiento y Nail Art",
    filter: (s: Service) =>
      ["Nail Art", "Mantenimiento"].includes(s.category as string),
  },
];

export default async function ServiciosPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-verde-pastel" />
              <span className="text-sm font-semibold text-verde-pastel uppercase tracking-wider">
                Nuestros Servicios
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Tratamientos Profesionales
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cada servicio está diseñado para ofrecerte la mejor experiencia y
              resultados excepcionales
            </p>
          </div>
        </FadeInUp>

        <div className="space-y-24">
          {sections.map((section) => {
            const sectionServices = services.filter(section.filter);

            if (sectionServices.length === 0) return null;

            return (
              <div key={section.id} id={section.id} className="scroll-mt-32">
                <FadeInUp>
                  <div className="mb-8 border-b border-border pb-4">
                    <h2 className="font-display text-3xl font-bold mb-2">
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </FadeInUp>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sectionServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </StaggerContainer>
              </div>
            );
          })}
        </div>

        {services.length === 0 && (
          <FadeInUp>
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Próximamente añadiremos nuestros servicios. Mientras tanto,
                puedes{" "}
                <a
                  href="https://www.fresha.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-verde-pastel hover:underline">
                  reservar una cita
                </a>
                .
              </p>
            </div>
          </FadeInUp>
        )}
      </div>
    </div>
  );
}
