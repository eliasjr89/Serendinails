"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { BlogPost, getStorageUrl } from "@/lib/supabase";
import { itemVariants } from "@/components/animations/StaggerContainer";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = getStorageUrl(post.cover_image_url || post.image_url);

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border h-full">
          {(post.cover_image_url || post.image_url) && (
            <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-verde-pastel/20 to-dorado/20">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-6">
            {formattedDate && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            )}

            <h3 className="font-display text-2xl font-bold mb-3">
              {post.title}
            </h3>

            {post.excerpt && (
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center space-x-2 text-verde-pastel font-semibold">
              <span>Leer más</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
