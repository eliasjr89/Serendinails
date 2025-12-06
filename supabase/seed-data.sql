-- Seed Data for Serendinails Database
-- Run this in your Supabase SQL Editor after uploading images

-- ============================================
-- SERVICES
-- ============================================

INSERT INTO services (name, description, price, duration, category, image_url, is_featured) VALUES
('Manicura Clásica', 'Manicura completa con limado, cutículas, hidratación y esmaltado tradicional. Perfecta para mantener tus uñas saludables y bonitas.', 25.00, 45, 'Manicura', 'services/manicura-clasica.jpg', true),

('Manicura con Semipermanente', 'Manicura completa con esmaltado semipermanente de larga duración. Hasta 3 semanas de uñas perfectas sin retoques.', 35.00, 60, 'Manicura', 'services/manicura-semipermanente.jpg', true),

('Pedicura Spa', 'Pedicura completa con exfoliación, masaje relajante, hidratación profunda y esmaltado. Tus pies merecen lo mejor.', 40.00, 75, 'Pedicura', 'services/pedicura-spa.jpg', true),

('Uñas Acrílicas', 'Extensión de uñas con acrílico de alta calidad. Diseño personalizado según tus preferencias. Duración aproximada de 3-4 semanas.', 50.00, 120, 'Uñas Artificiales', 'services/unas-acrilicas.jpg', true),

('Uñas de Gel', 'Extensión de uñas con gel, más natural y flexible que el acrílico. Perfectas para quienes buscan elegancia y durabilidad.', 55.00, 120, 'Uñas Artificiales', 'services/unas-gel.jpg', true),

('Diseño de Uñas Personalizado', 'Nail art único y personalizado. Desde diseños minimalistas hasta obras de arte en tus uñas. El límite es tu imaginación.', 15.00, 30, 'Nail Art', 'services/nail-art.jpg', false),

('Relleno de Uñas', 'Mantenimiento de uñas acrílicas o de gel. Recomendado cada 2-3 semanas para mantener tus uñas perfectas.', 35.00, 90, 'Mantenimiento', 'services/relleno.jpg', false),

('Retirada de Semipermanente', 'Retirada profesional y cuidadosa de esmaltado semipermanente sin dañar la uña natural.', 10.00, 20, 'Mantenimiento', 'services/retirada.jpg', false);

-- ============================================
-- COURSES
-- ============================================

INSERT INTO courses (title, description, price, duration, level, requirements, what_you_learn, image_url, is_featured) VALUES
('Curso de Manicura Profesional', 
'Aprende las técnicas fundamentales de manicura profesional. Desde preparación de uñas hasta esmaltado perfecto. Incluye certificado oficial.', 
350.00, 
'20 horas (5 sesiones de 4 horas)', 
'Principiante', 
'Ninguno. Curso apto para personas sin experiencia previa.', 
'["Preparación correcta de la uña natural", "Técnicas de limado profesional", "Cuidado de cutículas", "Esmaltado tradicional perfecto", "Higiene y seguridad", "Atención al cliente"]', 
'courses/curso-manicura.jpg', 
true),

('Curso de Uñas Acrílicas', 
'Domina la técnica de extensión de uñas con acrílico. Aprende a crear estructuras perfectas y duraderas. Certificado incluido.', 
450.00, 
'30 horas (6 sesiones de 5 horas)', 
'Intermedio', 
'Conocimientos básicos de manicura recomendados.', 
'["Preparación de la uña para acrílico", "Aplicación de tips y moldes", "Técnica de aplicación de acrílico", "Creación de estructuras", "Limado y pulido profesional", "Resolución de problemas comunes"]', 
'courses/curso-acrilicas.jpg', 
true),

('Curso de Uñas de Gel', 
'Especialízate en la técnica de gel, la más demandada actualmente. Aprende a trabajar con gel constructor y crear extensiones naturales.', 
480.00, 
'30 horas (6 sesiones de 5 horas)', 
'Intermedio', 
'Conocimientos básicos de manicura recomendados.', 
'["Diferencias entre gel y acrílico", "Preparación de la uña", "Aplicación de gel constructor", "Técnicas de extensión", "Acabado profesional", "Mantenimiento y rellenos"]', 
'courses/curso-gel.jpg', 
true),

('Curso de Nail Art Avanzado', 
'Lleva tus diseños al siguiente nivel. Aprende técnicas avanzadas de decoración y conviértete en un artista de las uñas.', 
380.00, 
'25 horas (5 sesiones de 5 horas)', 
'Avanzado', 
'Experiencia previa en manicura y esmaltado.', 
'["Técnicas de degradado", "Diseños con pincel", "Aplicación de cristales y accesorios", "Estampado y transfer", "Diseños 3D", "Tendencias actuales"]', 
'courses/curso-nail-art.jpg', 
false),

('Curso Intensivo de Pedicura Spa', 
'Aprende a ofrecer un servicio de pedicura completo y profesional. Incluye técnicas de spa y tratamientos especiales.', 
320.00, 
'16 horas (4 sesiones de 4 horas)', 
'Principiante', 
'Ninguno. Curso apto para principiantes.', 
'["Preparación del pie", "Técnicas de exfoliación", "Masaje relajante de pies", "Tratamiento de callosidades", "Esmaltado perfecto en pies", "Protocolos de higiene"]', 
'courses/curso-pedicura.jpg', 
false);

-- ============================================
-- BLOG POSTS (Ejemplos)
-- ============================================

INSERT INTO blog_posts (title, excerpt, content, author, category, image_url, is_featured) VALUES
('Tendencias en Uñas para 2024', 
'Descubre las tendencias más populares en nail art y diseños de uñas para este año.', 
'<h2>Las Tendencias que Marcarán 2024</h2><p>Este año viene cargado de novedades en el mundo de las uñas...</p>', 
'Equipo Serendinails', 
'Tendencias', 
'blog/tendencias-2024.jpg', 
true),

('Cómo Cuidar tus Uñas en Casa', 
'Consejos profesionales para mantener tus uñas saludables entre visitas al salón.', 
'<h2>Rutina de Cuidado Diario</h2><p>Mantener uñas saludables es más fácil de lo que piensas...</p>', 
'Equipo Serendinails', 
'Cuidados', 
'blog/cuidados-casa.jpg', 
false),

('Diferencias entre Gel y Acrílico', 
'¿No sabes cuál elegir? Te explicamos las diferencias y ventajas de cada técnica.', 
'<h2>Gel vs Acrílico: ¿Cuál es Mejor?</h2><p>Ambas técnicas tienen sus ventajas...</p>', 
'Equipo Serendinails', 
'Educación', 
'blog/gel-vs-acrilico.jpg', 
true);

-- ============================================
-- GALLERY ITEMS (Ejemplos)
-- ============================================

INSERT INTO gallery_items (title, description, image_url, category, is_featured) VALUES
('Diseño Floral Primavera', 'Nail art con flores delicadas en tonos pastel', 'gallery/floral-1.jpg', 'Nail Art', true),
('Uñas Francesas Modernas', 'French manicure con twist moderno', 'gallery/french-1.jpg', 'Manicura', true),
('Diseño Geométrico', 'Líneas y formas geométricas en blanco y negro', 'gallery/geometrico-1.jpg', 'Nail Art', false),
('Pedicura Spa Luxury', 'Resultado de nuestro tratamiento spa premium', 'gallery/pedicura-1.jpg', 'Pedicura', false),
('Uñas Acrílicas Stiletto', 'Extensión acrílica en forma stiletto con diseño elegante', 'gallery/acrilicas-1.jpg', 'Uñas Artificiales', true),
('Degradado Sunset', 'Diseño degradado en tonos cálidos', 'gallery/degradado-1.jpg', 'Nail Art', false);

-- ============================================
-- COMMENTS (Ejemplos - ya tienes algunos en el código)
-- ============================================

-- Los testimonios ya están en el código del slider
-- Estos son adicionales para la base de datos

INSERT INTO comments (name, email, comment, rating, is_approved) VALUES
('María García', 'maria@example.com', 'Increíble experiencia. El trato es excepcional y los resultados superan mis expectativas cada vez.', 5, true),
('Laura Martínez', 'laura@example.com', 'Profesionales de verdad. He probado muchos sitios y este es sin duda el mejor. Totalmente recomendable.', 5, true),
('Ana Rodríguez', 'ana@example.com', 'El curso que hice cambió mi carrera. Ahora trabajo con confianza gracias a todo lo que aprendí.', 5, true),
('Carmen López', 'carmen@example.com', 'Las uñas me duraron más de 3 semanas perfectas. Volveré seguro.', 5, true),
('Isabel Fernández', 'isabel@example.com', 'Ambiente acogedor y profesional. Me encanta venir aquí.', 5, true);
