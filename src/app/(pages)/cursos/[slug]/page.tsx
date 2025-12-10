import { getCourseBySlug, getStorageUrl } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Euro,
  ArrowLeft,
  Calendar,
  Award,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { FadeInUp } from "@/components/animations/FadeInUp";

export const dynamic = "force-dynamic";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const course = await getCourseBySlug(params.slug);
  if (!course) return { title: "Curso no encontrado" };

  return {
    title: `${course.title} - Formación Nails Couture`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const imageUrl = getStorageUrl(course.image_url || course.flyer_url);

  // Parse what_you_learn if it's a JSON string
  let learningPoints: string[] = [];
  try {
    if (typeof course.content === "string" && course.content.startsWith("[")) {
      // Fallback if content is used for learning points in some legacy data
      learningPoints = JSON.parse(course.content);
    }
    // If the interface has what_you_learn (it wasn't in the last view of supabase.ts but might come from DB), handle distinct fields
    // Assuming for now standard description/content.
    // In seed data we had 'what_you_learn' column. We need to check if supabase.ts retrieves it.
    // Checking previous file read of supabase.ts...
    // Course interface does NOT have what_you_learn.
    // Need to update interface to get this rich data.
  } catch (e) {
    learningPoints = [];
  }

  return (
    <article className="min-h-screen py-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full mb-12">
        <Image
          src={imageUrl}
          alt={course.title}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl w-full px-6 text-center text-white">
            <FadeInUp>
              <Link
                href="/cursos"
                className="inline-flex items-center text-sm font-medium hover:text-dorado transition-colors mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Cursos
              </Link>
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                {course.title}
              </h1>
              {course.level && (
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-dorado text-black mb-6">
                  Nivel:{" "}
                  {course.level === "beginner"
                    ? "Principiante"
                    : course.level === "intermediate"
                    ? "Intermedio"
                    : course.level}
                </span>
              )}
            </FadeInUp>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
          {/* Main Content */}
          <div className="space-y-8">
            <FadeInUp delay={0.2}>
              <h2 className="text-3xl font-display font-bold mb-4">
                Sobre este Curso
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
                {course.content && (
                  <div
                    className="mt-8"
                    dangerouslySetInnerHTML={{ __html: course.content }}
                  />
                )}
              </div>
            </FadeInUp>
          </div>

          {/* Sidebar / Info Card */}
          <div className="space-y-6">
            <FadeInUp delay={0.3}>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-lg sticky top-24">
                <h3 className="font-display text-xl font-bold mb-6">
                  Información del Curso
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-5 w-5 mr-3" />
                      <span>Duración</span>
                    </div>
                    <span className="font-semibold">
                      {course.duration || `${course.duration_hours}h`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center text-muted-foreground">
                      <Euro className="h-5 w-5 mr-3" />
                      <span>Precio</span>
                    </div>
                    <span className="font-semibold text-xl">
                      {course.price}€
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center text-muted-foreground">
                      <Award className="h-5 w-5 mr-3" />
                      <span>Certificado</span>
                    </div>
                    <span className="font-semibold text-verde-pastel">Sí</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/34612534789?text=Hola, quiero inscribirme en el curso: ${course.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-dorado hover:bg-dorado/90 text-black font-semibold transition-all hover:shadow-lg">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Inscribirme Ahora
                  </a>

                  <a
                    href={`https://wa.me/34612534789?text=Hola, necesito más información sobre el curso: ${course.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-4 py-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-all">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Más Información
                  </a>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </article>
  );
}
