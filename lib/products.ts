export type Product = {
  id: number
  name: string
  category: string
  price: number
  image: string
  alt: string
  detail?: string
}

export const products: Product[] = [
  { id: 1, name: 'No. 01 — Obsidian Tote', category: 'Leather Goods', price: 420, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85', alt: 'Black leather tote bag on a stone surface' },
  { id: 2, name: 'No. 02 — Form Candle', category: 'Objects', price: 84, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85', alt: 'Sculptural cream candle in a dark setting' },
  { id: 3, name: 'No. 03 — Column Vessel', category: 'Objects', price: 190, image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=85', alt: 'Minimal ceramic vessel with a curved silhouette' },
  { id: 4, name: 'No. 04 — Atelier Coat', category: 'Apparel', price: 680, image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=1000&q=85', alt: 'Black wool coat hanging in a quiet studio' },
  { id: 5, name: 'No. 05 — Mineral Glass', category: 'Objects', price: 110, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=85', alt: 'Clear glass tumbler catching warm light' },
  { id: 6, name: 'No. 06 — Field Notebook', category: 'Paper', price: 38, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85', alt: 'Open black notebook with cream pages' },
]
