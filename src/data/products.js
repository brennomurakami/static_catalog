export const products = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    category: 'tênis',
    price: 899.99,
    description: 'Tênis Nike Air Max 270 com tecnologia de amortecimento Air Max para máximo conforto.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    ],
    featured: true,
  },
  {
    id: 2,
    name: 'Agasalho Adidas Essentials',
    category: 'agasalho',
    price: 299.99,
    description: 'Agasalho Adidas em tecido leve e confortável, perfeito para todas as estações.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    ],
    featured: false,
  },
  {
    id: 3,
    name: 'Relógio Casio G-Shock',
    category: 'relógios',
    price: 599.99,
    description: 'Relógio G-Shock resistente a impactos e água, com múltiplas funções.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314',
    ],
    featured: true,
  },
  {
    id: 4,
    name: 'Perfume One Million',
    category: 'perfumes',
    price: 399.99,
    description: 'Fragrância masculina intensa e marcante, perfeita para ocasiões especiais.',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f',
      'https://images.unsplash.com/photo-1541643600914-78b084683601',
    ],
    featured: true,
  },
  {
    id: 5,
    name: 'Camiseta Essential Basic',
    category: 'camisetas',
    price: 79.99,
    description: 'Camiseta básica de algodão premium, confortável e versátil.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1',
    ],
    featured: false,
  },
  {
    id: 6,
    name: 'Camisa Brasil 2024',
    category: 'camisetas de time',
    price: 299.99,
    description: 'Camisa oficial da Seleção Brasileira, temporada 2024.',
    images: [
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974',
      'https://images.unsplash.com/photo-1519415943484-9fa1873496d4',
    ],
    featured: true,
  },
];

export const featuredProducts = products.filter(product => product.featured);

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getProductById = (id) => {
  return products.find(product => product.id === Number(id));
}; 