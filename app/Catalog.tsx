"use client";

import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const products = [
  { id: "GL–01", name: "The Regent", type: "Agbada", tone: "Ivory", image: `${basePath}/trads/gl-001-1.svg`, alt: `${basePath}/trads/gl-001-2.svg` },
  { id: "GL–05", name: "Noir", type: "Agbada", tone: "Obsidian", image: `${basePath}/trads/gl-005-1.svg`, alt: `${basePath}/trads/gl-005-2.svg` },
  { id: "GL–08", name: "River Pearl", type: "South-South", tone: "Pearl", image: `${basePath}/trads/gl-008-1.svg`, alt: `${basePath}/trads/gl-008-2.svg` },
  { id: "GL–07", name: "The Passage", type: "Danshiki", tone: "Indigo", image: `${basePath}/trads/gl-007-1.svg`, alt: `${basePath}/trads/gl-007-2.svg` },
  { id: "GL–03", name: "Sage Leisure", type: "Casual", tone: "Sage", image: `${basePath}/trads/gl-003-1.svg`, alt: `${basePath}/trads/gl-003-2.svg` },
  { id: "GL–04", name: "Bronze Crest", type: "Danshiki", tone: "Bronze", image: `${basePath}/trads/gl-004-1.svg`, alt: `${basePath}/trads/gl-004-2.svg` },
];

const filters = ["All", "Agbada", "South-South", "Danshiki", "Casual"];
const phone = "2348000000000";

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<(typeof products)[number] | null>(null);
  const [picks, setPicks] = useState<string[]>([]);
  const [picksOpen, setPicksOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("glideline-luxury-picks");
    if (saved) setPicks(JSON.parse(saved));
  }, []);

  function togglePick(id: string) {
    const next = picks.includes(id) ? picks.filter((item) => item !== id) : [...picks, id];
    setPicks(next);
    localStorage.setItem("glideline-luxury-picks", JSON.stringify(next));
  }

  function whatsapp(text: string) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  const visible = filter === "All" ? products : products.filter((product) => product.type === filter);

  return (
    <main>
      <header className="header">
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}>
          <span /> <span />
        </button>
        <a className="logo" href="#top">GLIDELINE <small>ATELIER</small></a>
        <a className="header-link" href="#collection">Collection</a>
        <a className="header-link" href="#craft">Our craft</a>
        <button className="bag" onClick={() => picks.length > 0 && setPicksOpen(!picksOpen)} aria-expanded={picksOpen}>Picks <b>{String(picks.length).padStart(2, "0")}</b></button>
        {menu && <nav className="mobile-menu"><a href="#collection" onClick={() => setMenu(false)}>Collection</a><a href="#craft" onClick={() => setMenu(false)}>Our craft</a><a href="#contact" onClick={() => setMenu(false)}>Contact</a></nav>}
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">Lagos · Since 2019</p>
          <h1>Quiet power.<br/><em>Made to measure.</em></h1>
          <p className="hero-note">Modern Nigerian tailoring for men.</p>
          <a className="line-link light" href="#collection">View the collection <span>↘</span></a>
        </div>
        <div className="hero-art">
          <div className="frame"><img src="/trads/gl-001-1.svg" alt="Ivory Regent Agbada" /></div>
          <span className="edition">Private Edition · 01</span>
        </div>
        <span className="vertical-mark">GLIDELINE / LAGOS</span>
      </section>

      <section className="manifesto" id="craft">
        <p className="section-no">01 / Philosophy</p>
        <p className="manifesto-copy">Cut with purpose.<br/>Finished by hand.<br/><em>Worn with ease.</em></p>
        <div className="manifesto-note"><span>Our approach</span><p>Clean lines. Fine cloth. A precise fit.</p></div>
      </section>

      <section className="collection" id="collection">
        <div className="section-heading">
          <div><p className="section-no">02 / The collection</p><h2>Signature pieces</h2></div>
          <p>Each piece is made for you.</p>
        </div>
        <div className="filters" role="group" aria-label="Filter collection">
          {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="product-grid">
          {visible.map((product, index) => (
            <article className="product" key={product.id}>
              <button className="product-image" onClick={() => setSelected(product)} aria-label={`View ${product.name}`}>
                <span className="index">{String(index + 1).padStart(2, "0")}</span>
                <img src={product.image} alt={product.name} />
                <img className="alternate" src={product.alt} alt="" />
                <span className="view">View piece</span>
              </button>
              <div className="product-meta"><div><h3>{product.name}</h3><p>{product.type} · {product.tone}</p></div><button onClick={() => togglePick(product.id)} aria-label={`${picks.includes(product.id) ? "Remove" : "Add"} ${product.name} ${picks.includes(product.id) ? "from" : "to"} picks`}>{picks.includes(product.id) ? "×" : "+"}</button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="service" id="contact">
        <p className="section-no">03 / Private service</p>
        <h2>Let us make<br/><em>yours.</em></h2>
        <p>Share your picks. We will guide the rest.</p>
        <a className="gold-button" href={whatsapp("Hello Glideline, I would like to discuss a piece.")} target="_blank" rel="noreferrer">Talk on WhatsApp <span>↗</span></a>
      </section>

      {picks.length > 0 && <aside className="picks-wrap" id="picks">
        {picksOpen && <div className="picks-panel">
          <div className="picks-title"><span>Your picks</span><button onClick={() => setPicksOpen(false)} aria-label="Close picks">×</button></div>
          {picks.map((id) => {
            const product = products.find((item) => item.id === id)!;
            return <div className="picked-item" key={id}>
              <button className="picked-product" onClick={() => setSelected(product)}><img src={product.image} alt=""/><span><strong>{product.name}</strong><small>{product.id} · {product.type}</small></span></button>
              <button className="picked-remove" onClick={() => togglePick(id)} aria-label={`Remove ${product.name}`}>Remove</button>
            </div>;
          })}
        </div>}
        <div className="picks-bar"><button onClick={() => setPicksOpen(!picksOpen)} aria-expanded={picksOpen}>{picks.length} {picks.length === 1 ? "pick" : "picks"} — {picksOpen ? "Hide" : "View picks"}</button><a href={whatsapp(`Hello Glideline, I am interested in: ${picks.join(", ")}.`)} target="_blank" rel="noreferrer">Send my picks ↗</a></div>
      </aside>}

      <footer><a className="logo" href="#top">GLIDELINE <small>ATELIER</small></a><p>Modern traditional wear.<br/>Lagos, Nigeria.</p><div><a href="#collection">Collection</a><a href={whatsapp("Hello Glideline.")} target="_blank" rel="noreferrer">WhatsApp</a><a href="#top">Back to top ↑</a></div></footer>

      {selected && <div className="modal" role="dialog" aria-modal="true" aria-label={selected.name} onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
        <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
        <div className="modal-image"><img src={selected.image} alt={selected.name}/></div>
        <div className="modal-copy"><p className="section-no">{selected.id} · {selected.type}</p><h2>{selected.name}</h2><p>Made to your measurements. Cloth and finish chosen with you.</p><a className="gold-button" href={whatsapp(`Hello Glideline, I am interested in ${selected.name} (${selected.id}).`)} target="_blank" rel="noreferrer">Enquire on WhatsApp ↗</a><button className="text-button" onClick={() => togglePick(selected.id)}>{picks.includes(selected.id) ? "Remove from picks" : "Add to picks"}</button></div>
      </div>}
    </main>
  );
}
