"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Euro, Download, Award } from "lucide-react";
import { Course, getStorageUrl } from "@/lib/supabase";
import { itemVariants } from "@/components/animations/StaggerContainer";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const imageUrl = getStorageUrl(course.image_url || course.flyer_url);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}>
      <Link href={`/cursos/${course.slug}`} className="block">
        <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border h-full">
          {(course.image_url || course.flyer_url) && (
            <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-dorado/20 to-verde-pastel/20">
              <Image
                src={imageUrl}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              {course.level && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-dorado/20 text-dorado">
                  {course.level === "beginner" && "Principiante"}
                  {course.level === "intermediate" && "Intermedio"}
                  {course.level === "advanced" && "Avanzado"}
                </span>
              )}
              {course.pdf_url && (
                <Download className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <h3 className="font-display text-2xl font-bold mb-3">
              {course.title}
            </h3>

            {course.description && (
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {course.description}
              </p>
            )}

            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              {course.duration_hours && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration_hours}h</span>
                </div>
              )}
              {course.price && (
                <div className="flex items-center space-x-1">
                  <Euro className="h-4 w-4" />
                  <span className="font-semibold text-foreground">
                    {course.price}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 text-dorado font-semibold">
              <Award className="h-4 w-4" />
              <span>Ver curso</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
