import React from "react";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  href: string;
}

export default function CategoryCard({ title, imageSrc, href }: CategoryCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-full h-40">
          <img
            src={imageSrc}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
