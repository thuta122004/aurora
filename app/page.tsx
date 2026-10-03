'use client'

import { useMemo, useState } from 'react'
import { ArrowDownRight, Leaf, Menu, Minus, Plus, ShoppingBag, Sparkles, Star, X } from 'lucide-react'

const scents = [
  { id: 'vanilla', name: 'Midnight Vanilla', short: 'Vanilla', mood: 'Unwind', family: 'Warm / Gourmand', color: '#c99b72', glow: 'rgba(207, 139, 75, .34)', description: 'A velvet hush of smoked vanilla, tonka bean and slow-burning amber.', notes: ['Black vanilla', 'Tonka bean', 'Sandalwood'], accent: '01' },
  { id: 'amber', name: 'Smokey Amber & Cedar', short: 'Amber', mood: 'Ground', family: 'Woody / Resinous', color: '#b86635', glow: 'rgba(181, 73, 32, .34)', description: 'A warm, ember-lit room wrapped in cedarwood, clove and golden resin.', notes: ['Cedarwood', 'Clove leaf', 'Amber resin'], accent: '02' },
  { id: 'eucalyptus', name: 'Eucalyptus Mist', short: 'Mist', mood: 'Refresh', family: 'Fresh / Botanical', color: '#7ba49b', glow: 'rgba(91, 161, 148, .32)', description: 'A cool exhale of eucalyptus, rain-washed stone and wild mint.', notes: ['Eucalyptus', 'Wild mint', 'Wet stone'], accent: '03' },
  { id: 'lavender', name: 'Wild Lavender & Sage', short: 'Lavender', mood: 'Soften', family: 'Herbal / Floral', color: '#9d8bb2', glow: 'rgba(145, 117, 180, .32)', description: 'An evening garden in bloom, softened by clary sage and cedar smoke.', notes: ['Lavender', 'Clary sage', 'Cedar smoke'], accent: '04' },
]

export default function Page() {
  const [active, setActive] = useState('vanilla')
  const [lit, setLit] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [bagItems, setBagItems] = useState<Array<{ id: string; name: string; quantity: number; price: number; kind: 'single' | 'bundle' }>>([])
  const [bagMessage, setBagMessage] = useState('')
  const [bagOpen, setBagOpen] = useState(false)
  const scent = useMemo(() => scents.find((item) => item.id === active) ?? scents[0], [active])
  const bagCount = bagItems.reduce((total, item) => total + item.quantity, 0)
  const bagTotal = bagItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const addToBag = (type: 'single' | 'bundle') => {
    const itemQuantity = type === 'bundle' ? quantity : quantity
    const itemId = type === 'bundle' ? `bundle-${scent.id}` : `single-${scent.id}`
    const itemName = type === 'bundle' ? `Aurora trio · ${scent.mood} mood` : scent.name
    const itemPrice = type === 'bundle' ? 114 : 38
    setBagItems((items) => {
      const existing = items.find((item) => item.id === itemId)
      if (existing) return items.map((item) => item.id === itemId ? { ...item, quantity: item.quantity + itemQuantity } : item)
      return [...items, { id: itemId, name: itemName, quantity: itemQuantity, price: itemPrice, kind: type }]
    })
    setBagMessage(`${itemName} added to your bag`)
    setBagOpen(true)
    window.setTimeout(() => setBagMessage(''), 2600)
  }

  const updateBagItem = (id: string, delta: number) => {
    setBagItems((items) => items.flatMap((item) => item.id === id ? (item.quantity + delta > 0 ? [{ ...item, quantity: item.quantity + delta }] : []) : [item]))
  }

  return (
    <main className="aurora-site" style={{ '--accent': scent.color, '--glow': scent.glow } as React.CSSProperties}>
      <div className="grain" aria-hidden="true" />
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="Aurora home"><span className="brand-mark" aria-hidden="true"><span /><i /></span><span className="brand-name">AURORA<small>STUDIO</small></span></a>
        <div className="nav-links"><a href="#scent">The collection</a><a href="#ritual">Our ritual</a><a href="#reviews">Stories</a></div>
        <div className="nav-actions"><button className="bag-button" onClick={() => setBagOpen(true)} aria-label={`Shopping bag, ${bagCount} items`}><ShoppingBag /><span>{bagCount}</span></button><button className="menu-button" aria-label="Open menu"><Menu /></button></div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Scent, made luminous</p>
          <h1>Illuminate<br /><em>your mood.</em></h1>
          <p className="hero-lede">Hand-poured soy candles designed to turn ordinary rooms into somewhere worth staying.</p>
          <div className="hero-actions"><a className="primary-button" href="#scent">Explore the collection <ArrowDownRight /></a><button className="text-button" onClick={() => setLit(!lit)}><span className={`status-dot ${lit ? 'is-lit' : ''}`} /> {lit ? 'Candle is glowing' : 'Light the candle'}</button></div>
          <div className="hero-footnote"><span>01</span><span className="foot-line" /><span>Find your frequency</span></div>
        </div>
        <div className={`candle-stage ${lit ? 'is-lit' : 'is-dim'}`}>
          <div className="halo" /><div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="float-note note-one">still</div><div className="float-note note-two">100% soy wax</div>
          <div className="candle-wrap"><div className="flame"><span /></div><div className="wick" /><div className="wax" style={{ background: `linear-gradient(135deg, ${scent.color}, #e9d2b3)` }} /><div className="jar" style={{ borderColor: scent.color }}><div className="jar-shine" /><div className="label"><span>AURORA</span><strong>{scent.name}</strong><small>hand-poured / 220g</small></div></div><div className="candle-shadow" /></div>
          <div className="stage-caption"><span>Selected scent</span><strong>{scent.name}</strong></div>
        </div>
      </section>

      <section className="scent-section shell" id="scent">
        <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> The scent palette</p><h2>A feeling,<br /><em>in four acts.</em></h2></div><p className="section-intro">Each Aurora scent is composed like a small world — a bright opening, a generous heart, and a lasting trace.</p></div>
        <div className="scent-grid">{scents.map((item) => <button key={item.id} className={`scent-card ${active === item.id ? 'active' : ''}`} onClick={() => setActive(item.id)} style={{ '--card-accent': item.color } as React.CSSProperties}><span className="card-number">{item.accent}</span><span className="scent-swatch" /><span className="scent-name">{item.name}</span><span className="scent-family">{item.family}</span><ArrowDownRight className="card-arrow" /></button>)}</div>
        <div className="scent-detail"><div className="detail-copy"><p className="detail-kicker">Now exploring / {scent.accent}</p><h3>{scent.name}</h3><p>{scent.description}</p><button className="primary-button detail-buy" onClick={() => addToBag('single')}>Add this candle <ShoppingBag /></button><div className="note-list">{scent.notes.map((note, index) => <div className="note" key={note}><span>0{index + 1}</span><strong>{note}</strong><small>{index === 0 ? 'top note' : index === 1 ? 'heart note' : 'base note'}</small></div>)}</div></div><div className="detail-stat"><div className="stat-orb"><Sparkles /><strong>60+</strong><span>hours of<br />soft light</span></div><p>Every detail is considered. From the crackle of our wood wick to the last breath of fragrance.</p></div></div>
      </section>

      <section className="ritual-section shell" id="ritual"><div className="ritual-image"><div className="image-glow" /><span className="vertical-label">THE AURORA RITUAL</span><div className="ritual-center"><Leaf /><span>light slowly<br />stay awhile</span></div></div><div className="ritual-copy"><p className="eyebrow"><span className="eyebrow-line" /> Made for the in-between</p><h2>There is a<br /><em>pause here.</em></h2><p>We believe a candle should be more than a beautiful object. It should mark the moment the day softens — a small, sensorial permission to come back to yourself.</p><div className="ritual-points"><span><b>01</b> Pure soy wax</span><span><b>02</b> Cotton + wood wicks</span><span><b>03</b> No synthetic dyes</span></div><a className="text-button" href="#reviews">Read our story <ArrowDownRight /></a></div></section>

      <section className="bundle-section shell"><div className="bundle-copy"><p className="eyebrow"><span className="eyebrow-line" /> The ritual, together</p><h2>Build your<br /><em>little universe.</em></h2><p>Choose your mood, then make room for more of it. Curate a trio and save 15%.</p><div className="mood-picker"><span className="mood-label">Select your mood</span><div className="mood-options">{scents.map((item) => <button key={item.id} className={active === item.id ? 'selected' : ''} onClick={() => setActive(item.id)} aria-pressed={active === item.id}>{item.mood}</button>)}</div></div><div className="bundle-price"><span>3 candles</span><strong>${(quantity * 114).toFixed(2)}</strong><small>or 4 payments of $28.50</small></div><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus /></button></div><button className="primary-button" onClick={() => addToBag('bundle')}>Add {quantity * 3} candle bundle <ShoppingBag /></button></div><div className="bundle-art" aria-hidden="true"><div className="bundle-ring" /><div className="mini-candle mini-a" /><div className="mini-candle mini-b" /><div className="mini-candle mini-c" /></div></section>

      <section className="reviews shell" id="reviews"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> In their own words</p><h2>Light that<br /><em>stays with you.</em></h2></div><div className="review-rating"><span><Star /><Star /><Star /><Star /><Star /></span><strong>4.9</strong><small>from 280+ rituals</small></div></div><div className="review-grid"><article><div className="quote-mark">“</div><p>My apartment feels like a different place. Midnight Vanilla is the most beautiful scent — warm, but never sweet.</p><footer><span className="avatar avatar-a">S</span><span><b>Sofia R.</b><small>New York, NY</small></span></footer></article><article><div className="quote-mark">“</div><p>The first thing I light when I get home. It has become a tiny ritual I genuinely look forward to.</p><footer><span className="avatar avatar-b">J</span><span><b>James K.</b><small>London, UK</small></span></footer></article><article className="review-dark"><div className="quote-mark">“</div><p>Beautiful enough to leave out, calming enough to change the entire energy of a room.</p><footer><span className="avatar avatar-c">M</span><span><b>Mina T.</b><small>Los Angeles, CA</small></span></footer></article></div></section>

      <footer className="site-footer shell"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark"><span /></span>AURORA</a><p>A little more light<br />for every day.</p></div><div className="footer-links"><a href="#scent">Shop candles</a><a href="#ritual">Our story</a><a href="#reviews">Journal</a><a href="#top">Contact</a></div><p className="copyright">© 2026 Aurora Studio</p></footer>
      <div className="sticky-cart"><div><span className="status-dot is-lit" /> {scent.name}</div><strong>${(quantity * 38).toFixed(2)}</strong><button className="primary-button" onClick={() => addToBag('single')}>Add to bag <ShoppingBag /></button></div>{bagMessage && <div className="bag-toast" role="status">{bagMessage}</div>}{bagOpen && <><button className="bag-backdrop" aria-label="Close shopping bag" onClick={() => setBagOpen(false)} /><aside className="bag-panel" role="dialog" aria-modal="true" aria-label="Your shopping bag"><div className="bag-panel-head"><div><span className="eyebrow">YOUR BAG</span><h3>{bagItems.filter((item) => item.kind === 'single').reduce((total, item) => total + item.quantity, 0)} candles{bagItems.some((item) => item.kind === 'bundle') ? ` · ${bagItems.filter((item) => item.kind === 'bundle').reduce((total, item) => total + item.quantity, 0)} bundle${bagItems.filter((item) => item.kind === 'bundle').reduce((total, item) => total + item.quantity, 0) === 1 ? '' : 's'}` : ''}</h3><p className="bag-subtitle">A softer atmosphere is one step away.</p></div><button className="icon-button" onClick={() => setBagOpen(false)} aria-label="Close shopping bag"><X /></button></div>{bagItems.length === 0 ? <div className="bag-empty"><div className="bag-empty-orb"><ShoppingBag /></div><strong>Your bag is waiting.</strong><p>Choose a scent or build a trio to begin your ritual.</p><button className="bag-shop-link" onClick={() => { setBagOpen(false); document.getElementById('scent')?.scrollIntoView({ behavior: 'smooth' }) }}>Explore scents <ArrowDownRight /></button></div> : <div className="bag-items">{bagItems.map((item) => <div className="bag-item" key={item.id}><div className="bag-item-info"><strong>{item.name}</strong><span>{item.kind === 'bundle' ? '3-scent bundle · 3x single candle price' : '220g hand-poured candle'}</span><div className="bag-item-actions"><button onClick={() => updateBagItem(item.id, -1)} aria-label={`Remove one ${item.name}`}><Minus /></button><b>{item.quantity}</b><button onClick={() => updateBagItem(item.id, 1)} aria-label={`Add one ${item.name}`}><Plus /></button></div></div><strong className="bag-item-price">${(item.price * item.quantity).toFixed(2)}</strong></div>)}</div>}<div className="bag-summary"><div><span>Subtotal</span><strong>${bagTotal.toFixed(2)}</strong></div><small>Shipping calculated at checkout</small></div><button className="primary-button bag-checkout" disabled={!bagItems.length} onClick={() => setBagOpen(false)}>Continue to checkout <ArrowDownRight /></button></aside></>}
    </main>
  )
}
