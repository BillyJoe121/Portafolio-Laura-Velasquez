// ═══════════════════════════════════════════
// CONSTANTES CENTRALIZADAS
// ═══════════════════════════════════════════

/**
 * Colores de overlay por sección.
 * `null` = sin overlay (hero usa spotlight/linterna).
 */
export const SECTION_COLORS = {
  hero: null,
  'hero-alt': null,
  home: null,
  proyectos: '#ffffff',
  'sobre-mi': null,
  contacto: '#ffffff',
};

/**
 * URLs de escenas de Spline.
 */
export const SPLINE_SCENES = {
  heroLogo: 'https://prod.spline.design/bbbTUxdDN-46-Ct3/scene.splinecode',
  heroBg: 'https://prod.spline.design/YsBvMrNPZnzDi2P9/scene.splinecode',
  homeBg: 'https://prod.spline.design/thZdNUA04nli-RPE/scene.splinecode',
  robotArm: 'https://prod.spline.design/BublVOjV4om14zBK/scene.splinecode',
  aboutMeBg: 'https://prod.spline.design/W4P2DSx4K6JfrAK6/scene.splinecode',
};

/**
 * Datos de proyectos — ESCALABLE.
 * Agregar un objeto aquí genera automáticamente una nueva página de proyecto.
 * También se registra su color en SECTION_COLORS.
 */
export const PROJECTS = [
  {
    id: 'blulelula',
    title: 'Blulelula',
    subtitle: 'Diseño Industrial',
    description:
      'Descripción del proyecto. Reemplazar con datos reales cuando estén disponibles.',
    thumbnail: new URL('../assets/proyectos/Blulelula/blulelula.png', import.meta.url).href,
    titleImage: new URL('../assets/proyectos/Blulelula/titulo.png', import.meta.url).href,
    splineUrl: 'https://prod.spline.design/6sqf1Ff1MJ0Y8QfK/scene.splinecode',
    images: [],
    tags: ['Diseño', 'Prototipado'],
    year: '2025',
    color: '#ffffff',
  },
  {
    id: 'luminy',
    title: 'Luminy',
    subtitle: 'Diseño de Producto',
    description:
      'Luminy es un sistema interactivo que fusiona el cuidado botánico con la iluminación ambiental, creando una conexión emocional profunda entre el usuario y su entorno natural.',
    concept: [
      'En la vida urbana actual, muchas personas desean conectar emocionalmente con las plantas, pero su ritmo de vida les impide cuidarlas correctamente.',
      'Esto genera una desconexión que afecta tanto el bienestar del usuario como el de la planta. Se necesita un sistema que facilite la comunicación emocional y haga el cuidado más intuitivo, accesible y significativo.'
    ],
    teamMember: "Carolina Mendoza",
    conceptImage: new URL('../assets/proyectos/Luminy/fondo letras.png', import.meta.url).href,
    userImage: new URL('../assets/proyectos/Luminy/luminy-usuaria.webp', import.meta.url).href,
    splineUrl: 'https://prod.spline.design/wdxBjBSaDRG5wWLo/scene.splinecode',
    thumbnail: new URL('../assets/proyectos/Luminy/luminy.png', import.meta.url).href,
    titleImage: new URL('../assets/proyectos/Luminy/titulo.png', import.meta.url).href,
    images: [],
    tags: ['Producto', 'UX'],
    year: '2025',
    color: '#ffffff',
  },
  {
    id: 'milo',
    title: 'Milo',
    subtitle: 'Estrategia de Diseño',
    description:
      'Descripción del proyecto. Reemplazar con datos reales cuando estén disponibles.',
    thumbnail: new URL('../assets/proyectos/Milo/milo.png', import.meta.url).href,
    titleImage: new URL('../assets/proyectos/Milo/titulo.png', import.meta.url).href,
    splineUrl: 'https://prod.spline.design/DvX3ktNrsZZ7rbu7/scene.splinecode',
    images: [],
    tags: ['Estrategia', 'Innovación'],
    year: '2024',
    color: '#ffffff',
  },
  {
    id: 'peair',
    title: 'Peair',
    subtitle: 'Diseño Sostenible',
    description:
      'Descripción del proyecto. Reemplazar con datos reales cuando estén disponibles.',
    thumbnail: new URL('../assets/proyectos/peair/peair.png', import.meta.url).href,
    titleImage: new URL('../assets/proyectos/peair/titulo.png', import.meta.url).href,
    splineUrl: 'https://prod.spline.design/xQ4CEqEepGQNe7x8/scene.splinecode',
    images: [],
    tags: ['Sostenibilidad', 'Diseño Industrial'],
    year: '2024',
    color: '#ffffff',
  },
];

// Registrar dinámicamente colores de proyecto en SECTION_COLORS
PROJECTS.forEach((p) => {
  SECTION_COLORS[p.id] = p.color;
});
