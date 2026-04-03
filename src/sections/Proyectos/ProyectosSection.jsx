import React, { useRef } from 'react';
import { HeroParallax } from '../../components/HeroParallax';
import { PROJECTS } from '../../constants';
import './ProyectosSection.css';

// DEPRECATED: ThreeDMarquee import kept for easy reconnection
// import { ThreeDMarquee } from '../../components/ThreeDMarquee';

/**
 * ProyectosSection — Hero parallax scroll grid with project thumbnails.
 * Each card navigates to the project detail page on click.
 *
 * @param {{ onSelectProject: (projectId: string) => void }} props
 */
export function ProyectosSection({ onSelectProject }) {
  const scrollContainerRef = useRef(null);

  // Map PROJECTS to the HeroParallax product format.
  // Duplicate to fill 15 slots (3 rows × 5) for a full visual grid.
  const baseProducts = PROJECTS.map((p) => ({
    id: p.id,
    title: p.title,
    link: '#',
    thumbnail: p.thumbnail,
  }));

  const products = [];
  while (products.length < 15) {
    products.push(...baseProducts);
  }
  const finalProducts = products.slice(0, 15);

  return (
    <div ref={scrollContainerRef} className="section-proyectos-scroll">
      <HeroParallax
        products={finalProducts}
        onSelect={onSelectProject}
        containerRef={scrollContainerRef}
      />
    </div>
  );
}
