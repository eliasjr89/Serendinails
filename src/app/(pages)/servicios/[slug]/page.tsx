import { getServiceBySlug, getStorageUrl } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Euro, ArrowLeft, Calendar, message-circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeInUp } from '@/components/animations/FadeInUp';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: 'Servicio no encontrado' };

  return {
    title: `${service.title || service.name} - Serendinails`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const imageUrl = getStorageUrl(service.image_url);

  return (
    <article className="min-h-screen py-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full mb-12">
        <Image
          src={imageUrl}
          alt={service.title || service.name || 'Servicio'}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl w-full px-6 text-center text-white">
            <FadeInUp>
              <Link 
                href="/servicios" 
                className="inline-flex items-center text-sm font-medium hover:text-verde-pastel transition-colors mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Servicios
              </Link>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
                {service.title || service.name}
              </h1>
              {service.category && (
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-verde-pastel text-black mb-6">
                  {service.category}
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
              <h2 className="text-3xl font-display font-bold mb-4">Descripción</h2>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                {service.content && (
                  <div className="mt-8" dangerouslySetInnerHTML={{ __html: service.content }} />
                )}
              </div>
            </FadeInUp>

            {/* Gallery placeholder if we had images linked */}
          </div>

          {/* Sidebar / Info Card */}
          <div className="space-y-6">
            <FadeInUp delay={0.3}>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-lg sticky top-24">
                <h3 className="font-display text-xl font-bold mb-6">Detalles del Servicio</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-5 w-5 mr-3" />
                      <span>Duración</span>
                    </div>
                    <span className="font-semibold">{service.duration} min</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                    <div className="flex items-center text-muted-foreground">
                      <Euro className="h-5 w-5 mr-3" />
                      <span>Precio</span>
                    </div>
                    <span className="font-semibold text-xl">{service.price}€</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full h-12 text-lg bg-verde-pastel hover:bg-verde-pastel/90 text-black font-semibold" asChild>
                    <a href="https://www.fresha.com" target="_blank" rel="noopener noreferrer">
                      <Calendar className="mr-2 h-5 w-5" />
                      Reservar Cita
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full h-12" asChild>
                    <a 
                      href={`https://wa.me/34623068610?text=Hola, quiero información sobre el servicio: ${service.title || service.name}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Consulta por WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </FadeInUp>
          </div>

        </div>
      </div>
    </article>
  );
}
