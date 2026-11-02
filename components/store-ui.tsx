'use client'

import Link from 'next/link'
import { ArrowRight, Check, ChevronDown, Menu, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import { products, type Product } from '@/lib/products'

export function Header({ minimal = false }: { minimal?: boolean }) {
  const { count } = useStore()
  return <header className="site-header">
    <Link href="/" className="wordmark">ATELIER<span>·</span>NOIR</Link>
    {!minimal && <nav className="desktop-nav" aria-label="Main navigation"><Link href="/">Journal</Link><Link href="/products">Collection</Link><Link href="#philosophy">Philosophy</Link></nav>}
    {minimal ? <Link href="/" className="return-link">Return to store <ArrowRight size={14} /></Link> : <Link href="/checkout" className="cart-link" aria-label={`Shopping bag with ${count} items`}><ShoppingBag size={18} strokeWidth={1.5} /><span>Bag</span><b>{String(count).padStart(2, '0')}</b></Link>}
    {!minimal && <button className="mobile-menu" aria-label="Open navigation"><Menu size={20} /></button>}
  </header>
}

export function ProductCard({ product, feature = false }: { product: Product; feature?: boolean }) {
  const { add } = useStore()
  return <article className={`product-card ${feature ? 'feature-card' : ''}`}>
    <Link href="/products" className="product-image"><img src={product.image} alt={product.alt} loading="lazy" /><span className="quick-add">View piece <ArrowRight size={14} /></span></Link>
    <div className="product-meta"><div><p className="eyebrow">{product.category}</p><h3>{product.name}</h3></div><span className="price">${product.price}</span></div>
    <button className="add-link" onClick={() => add(product)}>Add to bag <Plus size={14} /></button>
  </article>
}

export function CartSummary() {
  const { items, subtotal, remove } = useStore()
  const shipping = subtotal >= 300 || subtotal === 0 ? 0 : 18
  return <aside className="summary-panel"><div className="summary-title"><h2>Your selection</h2><span>{items.length} {items.length === 1 ? 'piece' : 'pieces'}</span></div>{items.length === 0 ? <div className="empty-cart"><p>Your bag is currently empty.</p><Link href="/products">Explore the collection <ArrowRight size={14} /></Link></div> : <>{items.map(({ product, quantity }) => <div className="summary-item" key={product.id}><img src={product.image} alt="" /><div><strong>{product.name}</strong><span>Qty {quantity}</span><button onClick={() => remove(product.id)}>Remove</button></div><b>${product.price * quantity}</b></div>)}<div className="totals"><div><span>Subtotal</span><b>${subtotal}</b></div><div><span>Shipping</span><b>{shipping ? `$${shipping}` : 'Complimentary'}</b></div><div className="total"><span>Total</span><b>${subtotal + shipping}</b></div></div></>}</aside>
}

export function CheckoutForm() {
  const [complete, setComplete] = useState(false)
  if (complete) return <div className="confirmation"><div className="confirm-icon"><Check size={20} /></div><p className="eyebrow">Order received</p><h1>Thank you for choosing<br />the considered object.</h1><p>Your order has been recorded as a demonstration. No payment has been processed.</p><Link href="/products" className="button button-dark">Continue browsing <ArrowRight size={15} /></Link></div>
  return <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setComplete(true) }}><p className="eyebrow">01 — Details</p><h1>Complete your order</h1><fieldset><legend>Contact information</legend><label>Email address<input required type="email" placeholder="you@example.com" /></label></fieldset><fieldset><legend>Shipping address</legend><div className="form-grid"><label>First name<input required /></label><label>Last name<input required /></label></div><label>Address<input required /></label><div className="form-grid"><label>City<input required /></label><label>Postal code<input required /></label></div><label>Country<select defaultValue="United States"><option>United States</option><option>Canada</option><option>United Kingdom</option></select></label></fieldset><fieldset><legend>Payment</legend><label>Card number<input required inputMode="numeric" placeholder="0000 0000 0000 0000" /></label><div className="form-grid"><label>Expiry<input required placeholder="MM / YY" /></label><label>CVC<input required placeholder="000" /></label></div></fieldset><button className="button button-gold" type="submit">Place demonstration order <ArrowRight size={16} /></button><p className="form-note">This is a simulated checkout. Your card will not be charged.</p></form>
}

export function ProductFilters() {
  const [category, setCategory] = useState('All pieces')
  const filtered = category === 'All pieces' ? products : products.filter((product) => product.category === category)
  return <div className="catalog-wrap"><div className="filter-bar"><div className="filter-label"><Search size={15} /><input aria-label="Search collection" placeholder="Search collection" /></div><div className="filters"><button className={category === 'All pieces' ? 'active' : ''} onClick={() => setCategory('All pieces')}>All pieces</button><button className={category === 'Objects' ? 'active' : ''} onClick={() => setCategory('Objects')}>Objects</button><button className={category === 'Leather Goods' ? 'active' : ''} onClick={() => setCategory('Leather Goods')}>Leather goods</button><button className="sort">Sort <ChevronDown size={14} /></button></div></div><div className="catalog-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div></div>
}
