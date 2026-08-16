// src/js/data.js
// Todos los datos dinámicos de la aplicación Karla Godoy, listos para producción local o GitHub Pages.

export const EBOOKS_DATA = [
  {
    id: 'food-is-medicine',
    title: 'Food is Medicine',
    subtitle: 'Guía Integral de Nutrición Antiinflamatoria & Salud Hormonal',
    price: 19.99,
    currency: 'USD',
    badge: 'MÁS VENDIDO',
    pages: 124,
    format: 'PDF Interactivo High Quality',
    coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    description: 'Aprende a sanar tu relación con la comida, equilibrar tu sistema endocrino y reducir la inflamación crónica a través de alimentos densos en nutrientes y hábitos conscientes.',
    benefits: [
      'Protocolo antiinflamatorio de 4 semanas con menú guiado.',
      'Estrategias para regulación del cortisol y tiroides.',
      'Guía de suplementación clínica basada en evidencia.',
      'Lista de compras inteligente para el supermercado.'
    ],
    tableOfContents: [
      'Capítulo 1: La inflamación silenciosa y su impacto metabólico',
      'Capítulo 2: Microbioma intestinal y eje cerebro-intestino',
      'Capítulo 3: Hormonas en equilibrio: Estrógenos, Progesterona e Insulina',
      'Capítulo 4: Recetario Antiinflamatorio (Desayunos, Comidas y Cenas)',
      'Capítulo 5: Planificación de hábitos y compras eficientes'
    ],
    targetAudience: 'Ideal para personas con fatiga crónica, inflamación abdominal, desbalances hormonales o que buscan rejuvenecer su metabolismo.'
  },
  {
    id: 'habitos-conscientes',
    title: 'Hábitos Conscientes',
    subtitle: 'Recetario Nutritivo & Menú Semanal de 28 Días',
    price: 14.99,
    currency: 'USD',
    badge: 'POPULAR',
    pages: 88,
    format: 'PDF Interactivo High Quality',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    description: 'Más de 50 recetas fáciles, deliciosas y diseñadas con la proporción perfecta de macronutrientes para mantener tu energía óptima durante todo el día sin pasar hambre.',
    benefits: [
      '50+ Recetas explicadas paso a paso con macronutrientes.',
      'Plantilla interactiva para meal prep semanal.',
      'Opciones vegetarianas, sin gluten y sin lácteos.',
      'Snacks saludables y postres funcionales sin azúcar refinada.'
    ],
    tableOfContents: [
      'Capítulo 1: Los pilares del Meal Prep eficiente',
      'Capítulo 2: Desayunos de alta energía y rápida preparación',
      'Capítulo 3: Almuerzos completos y balanceados',
      'Capítulo 4: Cenas ligeras para mejorar la calidad del sueño',
      'Capítulo 5: Postres sin culpa y snacks proteicos'
    ],
    targetAudience: 'Para quienes tienen poco tiempo y desean comer delicioso, nutritivo y organizado cada semana.'
  },
  {
    id: 'genetica-y-metabolismo',
    title: 'Genética & Metabolismo',
    subtitle: 'Estrategias de Nutrición de Vanguardia & Recomposición Corporal',
    price: 24.99,
    currency: 'USD',
    badge: 'NUEVO',
    pages: 140,
    format: 'PDF Interactivo High Quality',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    description: 'Descubre cómo tu genética influye en el procesamiento de carbohidratos, grasas y respuesta al ejercicio. Una lectura clave para optimizar la masa muscular y reducir porcentaje de grasa.',
    benefits: [
      'Explicación clara de nutrigenómica y nutrigenética.',
      'Estrategias de ciclado de carbohidratos según tu entrenamiento.',
      'Optimizadores de flexibilidad metabólica.',
      'Guía de sincronización del entrenamiento con tu alimentación.'
    ],
    tableOfContents: [
      'Capítulo 1: Tu código genético y la nutrición individualizada',
      'Capítulo 2: Flexibilidad metabólica: Aprende a quemar grasa como energía',
      'Capítulo 3: Crononutrición y ritmos circadianos',
      'Capítulo 4: Estrategias avanzadas de recomposición corporal',
      'Capítulo 5: Casos prácticos de éxito y guía de implementación'
    ],
    targetAudience: 'Deportistas, personas activas o pacientes que han alcanzado un estancamiento en sus resultados físicos.'
  },
  {
    id: 'beauty-from-within',
    title: 'Beauty from Within',
    subtitle: 'Nutrición para la Piel, Cabello, Uñas y Antienvejecimiento',
    price: 16.99,
    currency: 'USD',
    badge: 'EXCLUSIVO',
    pages: 96,
    format: 'PDF Interactivo High Quality',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    description: 'La belleza exterior es la manifestación directa de la salud interior. Descubre los nutrientes clave para estimular la síntesis natural de colágeno, hidratación celular y brillo cutáneo.',
    benefits: [
      'Alimentos ricos en antioxidantes y precursores de colágeno.',
      'Rutina de batidos y shots funcionales matutinos.',
      'Protocolos contra la glicación y el envejecimiento celular.',
      'Mitos y realidades de la cosmética nutricional.'
    ],
    tableOfContents: [
      'Capítulo 1: El eje Piel-Intestino: La clave del brillo natural',
      'Capítulo 2: Antioxidantes estrella y estimulantes de colágeno',
      'Capítulo 3: Hidratación celular profunda y electrolitos',
      'Capítulo 4: Batidos, infusiones y elixir de la belleza',
      'Capítulo 5: Hábitos nocturnos de regeneración celular'
    ],
    targetAudience: 'Mujeres y hombres que buscan potenciar su salud estética desde un enfoque clínico integral.'
  }
];

export const SERVICE_PLANS = [
  {
    id: 'consulta-inicial',
    title: 'Consulta Nutricional Inicial',
    subtitle: 'Evaluación Clínica & Diagnóstico Personalizado',
    modality: 'hibrido',
    duration: '60 Minutos',
    price: 65,
    currency: 'USD',
    recommendedFor: 'Ideal para iniciar con una valoración premium y una estrategia nutricional diseñada exclusivamente para ti.',
    features: [
      'Evaluación del historial clínico, metabólico y hábitos de vida.',
      'Análisis de composición corporal (InBody / Pliegues en presencial o mediciones guiadas en online).',
      'Plan de alimentación 100% personalizado adaptado a tus gustos y rutina.',
      'Guía de lectura de etiquetas nutricionales y lista de supermercado.',
      'Recomendación de suplementación clínica personalizada.'
    ]
  },
  {
    id: 'plan-transformacion-3m',
    title: 'Programa Transformación (3 Meses)',
    subtitle: 'Acompañamiento Continuo & Reeducación Alimentaria',
    modality: 'hibrido',
    duration: '3 Meses (6 Citas)',
    price: 160,
    currency: 'USD',
    popular: true,
    recommendedFor: 'El programa premium preferido para lograr cambios sostenibles en composición corporal, metabolismo y salud hormonal.',
    features: [
      'Consulta Inicial Completa de 60 minutos.',
      '5 Consultas de seguimiento quincenales para evaluación de avances.',
      'Ajustes continuos al menú según progresos y cambios de rutina.',
      'Soporte directo y personalizado vía WhatsApp de Lunes a Viernes.',
      'Guías adicionales de recetas, snacks, comer fuera de casa y manejo del estrés.',
      'Descuentos exclusivos en talleres presenciales o nuevos e-books.'
    ]
  },
  {
    id: 'nutricion-genetica',
    title: 'Nutrición de Precisión Premium + Genética',
    subtitle: 'El Plan más Avanzado, Personalizado y Científico',
    modality: 'hibrido',
    duration: '6 Citas + Reporte de ADN',
    price: 290,
    currency: 'USD',
    recommendedFor: 'Para personas que quieren optimizar su salud con máxima precisión científica a partir de genética, laboratorios e historia clínica completa.',
    features: [
      'Análisis e interpretación de tu examen nutrigenético o bioquímico de laboratorio.',
      'Plan nutricional ajustado a tus variantes genéticas de absorción y metabolismo.',
      'Ciclado de carbohidratos y crononutrición avanzada.',
      'Suplementación ortomolecular basada en necesidades de tus genes.',
      '6 sesiones de seguimiento (presencial u online) para perfeccionar hábitos.'
    ]
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 'test-1',
    name: 'Mariana S.',
    age: 32,
    goal: 'Regulación Hormonal & Pérdida de Grasa',
    duration: '4 Meses de Programa',
    quote: 'Llevaba años luchando con inflamación crónica y síndrome de ovario poliquístico. Karla no solo diseñó un plan riquísimo, sino que me enseñó a entender mi cuerpo. Recuperé mi energía y mi digestión mejoró desde la segunda semana.',
    metrics: [
      { label: 'Inflamación', value: '-80%' },
      { label: 'Energía Diaria', value: '10/10' },
      { label: 'Masa Grasa', value: '-7.5 kg' }
    ],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Carlos M.',
    age: 38,
    goal: 'Recomposición Corporal & Salud Cardiovascular',
    duration: '3 Meses de Programa',
    quote: 'Mi ritmo de trabajo me hacía comer muy mal y tenía niveles altos de colesterol. Con las consultas online de Karla aprendí a programar mi meal prep de forma sencillísima. Bajé grasa abdominal, subí masa muscular y mis laboratorios salieron perfectos.',
    metrics: [
      { label: 'Colesterol LDL', value: '-35%' },
      { label: 'Grasa Visceral', value: '-3 niveles' },
      { label: 'Masa Muscular', value: '+2.4 kg' }
    ],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Valeria G.',
    age: 27,
    goal: 'Nutrición Antiinflamatoria & Rendimiento Deportivo',
    duration: '6 Meses de Programa',
    quote: 'Karla revolucionó mi forma de entrenar. Su enfoque en la salud intestinal eliminó por completo los dolores de colon que sufría después de correr. Me siento más ligera, fuerte y con una recuperación post-entrenamiento increíble.',
    metrics: [
      { label: 'Rendimiento', value: '+40%' },
      { label: 'Salud Intestinal', value: 'Excelente' },
      { label: 'Tiempo Recuperación', value: '-50%' }
    ],
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    rating: 5
  }
];

export const FAQ_ITEMS = [
  {
    q: '¿Cómo funciona la consulta online a diferencia de la presencial?',
    a: 'La consulta online se realiza mediante una videollamada segura. Recibes exactamente la misma asesoría detallada, diagnóstico clínico y plan de alimentación personalizado. El seguimiento antropométrico se realiza explicándote de manera amigable cómo tomar tus mediciones y peso en casa con accesorios sencillos.'
  },
  {
    q: '¿Tengo que comer alimentos raros o caros para seguir sus menús?',
    a: 'En absoluto. Todos mis planes se basan en comida real, accesible y local. Diseñamos tu menú con alimentos de supermercado habituales que se adapten a tu presupuesto, gustos culinarios y cultura familiar.'
  },
  {
    q: '¿Los e-books se descargan automáticamente tras adquirirlos?',
    a: 'Sí, al hacer clic en "Adquirir", la landing te redirige a mi WhatsApp para enviarte tu código personalizado y el enlace de descarga directa en formato PDF interactivo de alta calidad para que puedas consultarlo en tu celular, tablet o computadora.'
  },
  {
    q: '¿Cómo puedo pagar las citas o los e-books?',
    a: 'Aceptamos transferencias bancarias locales, tarjetas de débito/crédito, PayPal y depósitos en comercios autorizados. Recibirás todos los detalles de pago de manera automatizada al confirmar tu solicitud.'
  },
  {
    q: '¿Tengo soporte de dudas durante la semana si adquiero un programa?',
    a: 'Sí. Los programas mensuales de seguimiento y transformación (de 3 meses) incluyen soporte continuo y prioritario vía WhatsApp de lunes a viernes para responder dudas, hacer pequeños ajustes o darte motivación extra.'
  }
];

export const WHATSAPP_NUMBER = '5215551234567';
