import { getBlogPostBySlug, getStorageUrl } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, User } from "lucide-react";
import { FadeInUp } from "@/components/animations/FadeInUp";

export const dynamic = "force-dynamic";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: `${post.title} - Blog Serendinails`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const imageUrl = getStorageUrl(post.cover_image_url || post.image_url);
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="min-h-screen py-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full mb-12">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl w-full px-6 text-center text-white">
            <FadeInUp>
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium hover:text-verde-pastel transition-colors mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Blog
              </Link>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {post.title}
              </h1>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-200">
                {formattedDate && (
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formattedDate}
                  </div>
                )}
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Serendinails
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <FadeInUp delay={0.2}>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            {/* Si el contenido es HTML puro (de un editor visual) */}
            {typeof post.content === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              /* Si es texto plano o estructura JSON básica, fallback */
              <p>{String(post.content)}</p>
            )}
          </div>
        </FadeInUp>

        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/contacto"
            className="block bg-card p-8 rounded-2xl border border-border hover:border-verde-pastel transition-colors text-center">
            <h3 className="text-2xl font-display font-bold mb-2">
              ¿Te ha gustado este artículo?
            </h3>
            <p className="text-muted-foreground mb-4">
              Síguenos en redes sociales para no perderte nada o ven a
              visitarnos.
            </p>
            <span className="text-verde-pastel font-semibold">
              Contactar con nosotros &rarr;
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
