'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, GraduationCap, Star } from 'lucide-react';
import { FadeInUp } from '@/components/animations/FadeInUp';
import { StaggerContainer, itemVariants } from '@/components/animations/StaggerContainer';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-verde-pastel/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <FadeInUp delay={0.2}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              Belleza que{' '}
              <span className="bg-gradient-to-r from-verde-pastel to-dorado bg-clip-text text-transparent">
                Inspira
              </span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Tu centro de confianza para uñas y tratamientos corporales. 
              Profesionalidad, calidad y pasión en cada servicio.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="https://www.fresha.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 rounded-lg border-2 border-border hover:border-verde-pastel font-semibold transition-all duration-400 inline-flex items-center space-x-2 overflow-hidden"
                whileHover="hover"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-verde-pastel to-dorado origin-left"
                  initial={{ scaleX: 0 }}
                  variants={{
                    hover: { scaleX: 1 }
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
                <span className="relative z-10 group-hover:text-black transition-colors duration-400">Reservar Cita</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 group-hover:text-black transition-all duration-300 relative z-10" />
              </motion.a>
              <Link
                href="/servicios"
                className="px-8 py-4 rounded-lg border-2 border-border hover:border-verde-pastel font-semibold transition-all inline-flex items-center space-x-2"
              >
                <span>Ver Servicios</span>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-verde-pastel" />
                <span className="text-sm font-semibold text-verde-pastel uppercase tracking-wider">
                  Nuestros Servicios
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Tratamientos Profesionales
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubre nuestra amplia gama de servicios diseñados para realzar tu belleza natural
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Manicura',
                description: 'Cuidado completo de tus manos con técnicas profesionales',
                icon: '💅',
              },
              {
                title: 'Pedicura',
                description: 'Tratamiento relajante para el cuidado de tus pies',
                icon: '🦶',
              },
              {
                title: 'Tratamientos Corporales',
                description: 'Experiencias de bienestar para cuerpo y mente',
                icon: '✨',
              },
            ].map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-border"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Link
                  href="/servicios"
                  className="inline-flex items-center space-x-2 text-verde-pastel font-semibold hover:gap-3 transition-all"
                >
                  <span>Ver más</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </StaggerContainer>

          <FadeInUp delay={0.3} className="text-center mt-12">
            <motion.div whileHover="hover" className="inline-block">
              <Link
                href="/servicios"
                className="group relative inline-flex items-center space-x-2 px-6 py-3 rounded-lg border-2 border-verde-pastel text-verde-pastel font-semibold transition-all duration-400 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-verde-pastel origin-left"
                  initial={{ scaleX: 0 }}
                  variants={{
                    hover: { scaleX: 1 }
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
                <span className="relative z-10 group-hover:text-black transition-colors duration-400">Ver Todos los Servicios</span>
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:text-black transition-colors duration-400" />
              </Link>
            </motion.div>
          </FadeInUp>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6 text-dorado" />
                <span className="text-sm font-semibold text-dorado uppercase tracking-wider">
                  Formación
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Cursos Profesionales
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Aprende de los mejores y conviértete en una profesional del sector
              </p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeInUp delay={0.2}>
              <div className="bg-gradient-to-br from-verde-pastel/20 to-dorado/20 rounded-2xl p-8 border border-border">
                <h3 className="font-display text-3xl font-bold mb-4">
                  Formación Especializada
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Cursos diseñados para todos los niveles, desde principiantes hasta profesionales que buscan perfeccionar sus técnicas.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-verde-pastel" />
                    <span>Certificación oficial</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-verde-pastel" />
                    <span>Material didáctico incluido</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-verde-pastel" />
                    <span>Grupos reducidos</span>
                  </li>
                </ul>
                <Link
                  href="/cursos"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-verde-pastel to-dorado text-black font-semibold hover:shadow-lg transition-shadow"
                >
                  <span>Ver Cursos</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <div className="bg-card rounded-2xl p-8 border border-border h-full flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-verde-pastel/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Teoría y Práctica</h4>
                      <p className="text-muted-foreground">
                        Equilibrio perfecto entre conocimientos teóricos y práctica real
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-dorado/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">👩‍🏫</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Profesionales Expertos</h4>
                      <p className="text-muted-foreground">
                        Aprende de profesionales con años de experiencia en el sector
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-verde-pastel/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Certificación</h4>
                      <p className="text-muted-foreground">
                        Obtén tu certificado oficial al completar el curso
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Star className="h-6 w-6 text-dorado fill-dorado" />
                <span className="text-sm font-semibold text-dorado uppercase tracking-wider">
                  Testimonios
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Lo Que Dicen Nuestras Clientas
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'María García',
                comment: 'Increíble experiencia. El trato es excepcional y los resultados superan mis expectativas cada vez.',
                rating: 5,
              },
              {
                name: 'Laura Martínez',
                comment: 'Profesionales de verdad. He probado muchos sitios y este es sin duda el mejor. Totalmente recomendable.',
                rating: 5,
              },
              {
                name: 'Ana Rodríguez',
                comment: 'El curso que hice cambió mi carrera. Ahora trabajo con confianza gracias a todo lo que aprendí.',
                rating: 5,
              },
            ].map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-dorado fill-dorado" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <p className="font-semibold">{testimonial.name}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="bg-gradient-to-r from-verde-pastel to-dorado rounded-3xl p-12 text-center text-black">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                ¿Lista para Transformar tu Belleza?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Reserva tu cita ahora y descubre la diferencia de un servicio profesional
              </p>
              <a
                href="https://www.fresha.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg bg-black text-white font-semibold hover:bg-black/90 transition-all"
              >
                <span>Reservar Ahora</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
